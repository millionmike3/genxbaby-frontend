import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest) {
  const sheets = await prisma.investorPricingSheet.findMany({
    orderBy: { effectiveAt: "desc" },
  });

  return NextResponse.json({ sheets });
}

export async function POST(request: NextRequest) {
  const { investorId, baseSpread, llpaFactor } = await request.json();

  // Deactivate previous sheets (store active flag in metadata)
  await prisma.investorPricingSheet.updateMany({
    where: { investorId },
    data: {
      metadata: {
        active: false,
      },
    },
  });

  // Create new sheet
  await prisma.investorPricingSheet.create({
    data: {
      investorId,
      effectiveAt: new Date(),
      baseSpread,
      llpaFactor,
      metadata: {
        active: true,
       programName: `Sheet ${new Date().toISOString()}`,
      },
    },
  });

  return NextResponse.json({ ok: true });
}
