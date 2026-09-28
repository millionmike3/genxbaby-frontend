import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    // Load Prisma at runtime (server-only)
    const { prisma } = await import("@/lib/prisma");

    const { searchParams } = new URL(request.url);
    const limit = Number(searchParams.get("limit") ?? 50);

    const readings = await prisma.environmentReading.findMany({
      take: limit,
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        locationId: true,
        deviceCount: true,
        bluetoothDensity: true,
        riskScore: true,
        timestamp: true,
        createdAt: true,
      },
    });

    return NextResponse.json({ success: true, data: readings });
  } catch (err) {
    console.error("Admin Environment Error:", err);
    return NextResponse.json(
      { success: false, error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
