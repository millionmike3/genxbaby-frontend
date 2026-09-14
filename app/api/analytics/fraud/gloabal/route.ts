import { NextRequest,  NextResponse } from "next/server";
import { prisma } from "@/lib/prisma"; // DAL doesn't have a global fraud aggregator

export async function GET(request: NextRequest, { params }: { params: Promise<Record<string, string>> }) {
  try {
    const events = await prisma.fraudEvent.findMany({
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

    return NextResponse.json({ success: true, data: events });
  } catch (err) {
    console.error("Global Fraud Analytics Error:", err);
    return NextResponse.json({ success: false, error: "Internal Server Error" }, { status: 500 });
  }
}
