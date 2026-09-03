import { NextResponse } from "next/server";
import { priceLoan } from "@/services/pricing-engine";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  const body = await req.json();

  // Run pricing engine
  const quote = priceLoan(body);

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
      impulsivenessScore: body.impulsivenessScore ?? 0,
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
