import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  _req: Request,
  { params }: { params: { loanId: string } }
) {
  const loanId = Number(params.loanId);

  const decision = await prisma.underwritingDecision.findFirst({
    where: { loanId },
  });

  const risk = await prisma.riskSnapshot.findFirst({ where: { loanId } });
  const pricing = await prisma.pricingScenario.findFirst({ where: { loanId } });

  // you can enrich with property/mortgage/owner here
  return NextResponse.json({
    loanId,
    decision,
    risk,
    pricing,
  });
}
