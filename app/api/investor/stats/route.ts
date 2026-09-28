import { NextRequest, NextResponse } from "next/server";
import { getPrisma } from "@/lib/db/prisma";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<Record<string, string>> }
) {
  const prisma = await getPrisma();

  const totalInvestors = await prisma.investor.count();

  const avgPotentialScore = await prisma.investor.aggregate({
    _avg: { investorPotentialScore: true },
  });

  const highValueInvestors = await prisma.investor.count({
    where: { investorPotentialBand: "high" },
  });

  const pipelineDeals = await prisma.pipelineDeal.count();

  return NextResponse.json({
    totalInvestors,
    avgPotentialScore: avgPotentialScore._avg.investorPotentialScore ?? 0,
    highValueInvestors,
    pipelineDeals,
  });
}
