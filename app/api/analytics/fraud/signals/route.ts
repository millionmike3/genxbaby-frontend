import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const { prisma } = await import("@/lib/prisma");

    const signals = await prisma.fraudEvent.findMany({
      select: {
        id: true,
        eventType: true,
        signal: true,
        metadata: true,
        createdAt: true,
      },
      orderBy: { createdAt: "desc" },
      take: 200,
    });

    return NextResponse.json({ success: true, data: signals });
  } catch (err) {
    console.error("Fraud Signals Error:", err);
    return NextResponse.json(
      { success: false, error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
