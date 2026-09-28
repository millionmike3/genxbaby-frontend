import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    // Load Prisma at runtime (server-only)
    const { prisma } = await import("@/lib/prisma");

    const sheets = await prisma.investorPricingSheet.findMany({
      orderBy: { effectiveAt: "desc" },
    });

    return NextResponse.json({ sheets });
  } catch (err) {
    console.error("Investor Pricing GET Error:", err);
    return NextResponse.json(
      { error: "Failed to load pricing sheets" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    // Load Prisma at runtime (server-only)
    const { prisma } = await import("@/lib/prisma");

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
  } catch (err) {
    console.error("Investor Pricing POST Error:", err);
    return NextResponse.json(
      { error: "Failed to create pricing sheet" },
      { status: 500 }
    );
  }
}
