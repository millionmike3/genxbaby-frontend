import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest, { params }: { params: Promise<Record<string, string>> }) {
  const sheets = await prisma.investorPricingSheet.findMany({
    orderBy: { effectiveAt: "desc" },
  });

  return NextResponse.json({ sheets });
}

export async function POST(request: NextRequest, { params }: { params: Promise<Record<string, string>> }) {
  const { investorId, baseSpread, llpaFactor } = await request.json();

  await prisma.investorPricingSheet.updateMany({
    where: { investorId },
    data: { active: false },
  });

  await prisma.investorPricingSheet.create({
    data: {
      investorId,
      name: `Sheet ${new Date().toISOString()}`,
      effectiveAt: new Date(),
      baseSpread,
      llpaFactor,
      active: true,
    },
  });

  return NextResponse.json({ ok: true });
}
