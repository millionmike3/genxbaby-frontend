import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { ScoringDAL } from "@/lib/dal/scoring";
import { FraudDAL } from "@/lib/dal/fraud";
import { PolygonAuditService } from "@/lib/services/polygonAudit";
import { keccak256 } from "js-sha3";
import {
  scoreStockSanitizer,
  scoreCustomer,
  scoreInvestor,
  scoreRisk,
  normalizeInput,
} from "@/lib/scoring";

export async function POST(request: NextRequest, { params }: { params: Record<string, string> }) {
  try {
    // Authenticate user
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const {
      leadId,
      investorId,
      pillar,
      page,
      startedAt,
      endedAt,
      metrics,
    } = body;

    // Normalize input for risk scoring
    const normalized = normalizeInput(metrics);

    // Compute pillar-specific impulsiveness score
    let impulsivenessScore = 0;
    if (pillar === "STOCK_SANITIZER") {
      impulsivenessScore = scoreStockSanitizer(metrics);
    } else if (pillar === "CUSTOMER") {
      impulsivenessScore = scoreCustomer(metrics);
    } else if (pillar === "INVESTOR") {
      impulsivenessScore = scoreInvestor(metrics);
    }

    // Compute risk score
    const riskScore = scoreRisk(normalized);

    // Fraud score (same engine as stock sanitizer)
    const fraudScore = scoreStockSanitizer(metrics);

    // Classification
    const impulsivenessLevel = classify(impulsivenessScore, pillar);

    // Save scores locally
    await ScoringDAL.saveScores(
      session.user.id,
      {
        fraud: fraudScore,
        risk: riskScore,
        impulsiveness: impulsivenessScore,
      },
      metrics
    );

    // ---------------------------------------------------------
    // FRAUD + RISK THRESHOLD → POLYGON ANCHORING
    // ---------------------------------------------------------
    const eventId = crypto.randomUUID();
    const timestamp = new Date();

    if (riskScore >= 70 || fraudScore >= 80) {
      const payload = {
        userId: session.user.id,
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

      await FraudDAL.logFraudEvent(session.user.id, payload, txHash);
    }

    // ---------------------------------------------------------
    // PROXY TO BACKEND (authoritative ingestion)
    // ---------------------------------------------------------
    const backendUrl = process.env.BACKEND_URL;

    const response = await fetch(`${backendUrl}/api/behavior`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId: session.user.id,
        leadId,
        investorId,
        pillar,
        page,
        startedAt,
        endedAt,
        metrics,
        impulsivenessScore,
        impulsivenessLevel,
        riskScore,
        fraudScore,
      }),
    });

    const data = await response.json();

    return NextResponse.json(data, { status: response.status });
  } catch (err) {
    console.error("BEHAVIOR ERROR:", err);

    return NextResponse.json(
      { error: "Failed to record behavior" },
      { status: 500 }
    );
  }
}

// ---------------------------------------------------------
// CLASSIFICATION
// ---------------------------------------------------------
function classify(score: number, pillar: string) {
  if (pillar === "STOCK_SANITIZER") {
    if (score <= 25) return "stable";
    if (score <= 50) return "reactive";
    if (score <= 75) return "impulsive";
    return "volatile";
  }

  if (pillar === "CUSTOMER") {
    if (score <= 30) return "stable";
    if (score <= 60) return "reactive";
    if (score <= 80) return "impulsive";
    return "volatile";
  }

  if (pillar === "INVESTOR") {
    if (score <= 25) return "stable";
    if (score <= 50) return "reactive";
    if (score <= 75) return "impulsive";
    return "volatile";
  }

  return "stable";
}
