import { NextRequest,  NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest, { params }: { params: Promise<Record<string, string>> }) {
  try {
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
    return NextResponse.json({ success: false, error: "Internal Server Error" }, { status: 500 });
  }
}
