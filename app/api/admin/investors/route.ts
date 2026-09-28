import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    // Load Prisma at runtime (server-only)
    const { prisma } = await import("@/lib/prisma");

    const { searchParams } = new URL(request.url);
    const limit = Number(searchParams.get("limit") ?? 50);

    const investors = await prisma.investor.findMany({
      take: limit,
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        investorPotentialScore: true,
        investorPotentialBand: true,
        createdAt: true,
      },
    });

    return NextResponse.json({ success: true, data: investors });
  } catch (err) {
    console.error("Admin Investors Error:", err);

    return NextResponse.json(
      { success: false, error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
