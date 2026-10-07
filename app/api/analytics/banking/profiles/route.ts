import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: Record<string, string> }
) {
  try {
    // Load Prisma at runtime (server-only)
    const { prisma } = await import("@/lib/prisma");

    const profiles = await prisma.bankProfile.findMany({
      select: {
        id: true,
        name: true,
        bankName: true,
        routingNumber: true,
        accountNumber: true,
        riskScore: true,
        createdAt: true,
      },
      orderBy: { createdAt: "desc" },
      take: 200,
    });

    return NextResponse.json({ success: true, data: profiles });
  } catch (err) {
    console.error("Banking Profiles Analytics Error:", err);
    return NextResponse.json(
      { success: false, error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
