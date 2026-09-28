"use server";

import { NextResponse } from "next/server";

export async function GET(
  _req: Request,
  { params }: { params: { loanId: string } }
) {
  try {
    // Load Prisma at runtime (server-only)
    const { prisma } = await import("@/lib/prisma");

    const loanId = Number(params.loanId);

    const decision = await prisma.underwritingDecision.findFirst({
      where: { loanId },
    });

    const risk = await prisma.riskSnapshot.findFirst({
      where: { loanId },
    });

    const pricing = await prisma.pricingScenario.findFirst({
      where: { loanId },
    });

    return NextResponse.json({
      loanId,
      decision,
      risk,
      pricing,
    });
  } catch (err) {
    console.error("UNDERWRITING SNAPSHOT ERROR:", err);

    return NextResponse.json(
      { error: "Failed to load underwriting snapshot" },
      { status: 500 }
    );
  }
}
