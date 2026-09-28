import { NextRequest, NextResponse } from "next/server";
import { ScoringDAL } from "@/lib/dal/scoring";
import { FraudDAL } from "@/lib/dal/fraud";
import { PolygonAuditService } from "@/lib/services/polygonAudit";
import { keccak256 } from "js-sha3";
import { randomUUID } from "crypto";

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<Record<string, string>> }
) {
  try {
    // Load Prisma at runtime (server-only)
    const { prisma } = await import("@/lib/prisma");

    const body = await request.json();

    const {
      applicationId,
      fullName,
      email,
      phone,
      employer,
      income,
      checking,
      savings,
      propertyAddress,
      purchasePrice,
    } = body;

    // 1. Fetch application with borrower
    const app = await prisma.application.findUnique({
      where: { id: applicationId },
      include: { borrower: true },
    });

    if (!app || !app.borrower) {
      return NextResponse.json(
        { error: "Application or borrower not found" },
        { status: 404 }
      );
    }

    // 2. Update borrower
    await prisma.borrower.update({
      where: { id: app.borrowerId },
      data: { fullName, email, phone, employer },
    });

    // 3. Update application
    const updatedApp = await prisma.application.update({
      where: { id: applicationId },
      data: {
        incomeAnnual: Number(income),
        assetsLiquid: Number(checking) + Number(savings),
        propertyAddress,
        purchasePrice: Number(purchasePrice),
        status: "submitted",
      },
    });

    // 4. Pull latest behavior scores
    const latestScores = await ScoringDAL.getLatestScores(app.borrower.userId);

    const fraudScore = latestScores?.fraudScore ?? 0;
    const riskScore = latestScores?.riskScore ?? 0;
    const impulsivenessScore = latestScores?.impulsivenessScore ?? 0;

    // 5. Call underwriting backend
    const backendUrl = process.env.BACKEND_URL;

    const uwRes = await fetch(`${backendUrl}/api/underwriting/decision`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        applicationId,
        borrowerId: app.borrowerId,
        userId: app.borrower.userId,
        scores: {
          fraud: fraudScore,
          risk: riskScore,
          impulsiveness: impulsivenessScore,
        },
        financials: {
          incomeAnnual: Number(income),
          assetsLiquid: Number(checking) + Number(savings),
          purchasePrice: Number(purchasePrice),
        },
      }),
    });

    const uwData = await uwRes.json();

    // 6. Update application with underwriting result
    const finalApp = await prisma.application.update({
      where: { id: applicationId },
      data: {
        underwritingStatus: uwData.status,
        underwritingScore: uwData.score ?? null,
        routingScore: uwData.routingScore ?? null,
        fraudScore,
        behaviorScore: impulsivenessScore,
        loanType: uwData.loanType ?? "conventional",
        status: "underwriting",
      },
    });

    // 7. Create or update underwriting case
    await prisma.underwritingCase.upsert({
      where: { applicationId },
      update: {
        status: uwData.status,
        riskScore: uwData.score ?? 0,
        notes: "Updated from 1003 submission.",
      },
      create: {
        applicationId,
        status: uwData.status,
        riskScore: uwData.score ?? 0,
        notes: "Auto-created from 1003 submission.",
      },
    });

    // 8. Fraud + risk threshold → Polygon anchoring
    if (riskScore >= 70 || fraudScore >= 80) {
      const eventId = randomUUID();
      const timestamp = new Date();

      const payload = {
        userId: app.borrower.userId,
        applicationId,
        scores: {
          fraud: fraudScore,
          risk: riskScore,
          impulsiveness: impulsivenessScore,
        },
        timestamp: timestamp.toISOString(),
        eventId,
      };

      const hash = keccak256(JSON.stringify(payload));

      const txHash = await PolygonAuditService.anchorEvent(
        hash,
        eventId,
        timestamp
      );

      await FraudDAL.logFraudEvent(app.borrower.userId, payload, txHash);
    }

    return NextResponse.json({ ok: true, application: finalApp });
  } catch (err) {
    console.error("1003 Submission Error:", err);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
