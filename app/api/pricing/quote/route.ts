import { NextRequest,  NextResponse } from "next/server";
import { priceLoan } from "@/services/pricing-engine";
import { prisma } from "@/lib/prisma";
import { ScoringDAL } from "@/lib/dal/scoring";

export async function POST(request: NextRequest, { params }: { params: Promise<Record<string, string>> }) {
  const body = await request.json();

  // Run pricing engine
  const quote = await priceLoan(body);

  // Pull latest scoring (works for borrower, lead, investor)
  const latest = await ScoringDAL.getLatestScores(
    body.userId ?? body.investorId ?? body.leadId ?? null
  );

  const impulsivenessScore =
    latest?.impulsivenessScore ?? body.impulsivenessScore ?? 0;

  // Log behavior event
  await prisma.behaviorEvent.create({
    data: {
      userId: body.userId ?? null,
      leadId: body.leadId ?? null,
      investorId: body.investorId ?? null,
      pillar: "PRICING",
      page: "/pricing/quote",
      startedAt: new Date(),
      endedAt: new Date(),
      impulsivenessScore,
    },
  });

  // Log investor behavior if applicable
  if (body.investorId) {
    await prisma.investorBehavior.create({
      data: {
        investorId: body.investorId,
        action: "QUOTE_REQUEST",
        metadata: quote,
      },
    });
  }

  return NextResponse.json(quote);
}
