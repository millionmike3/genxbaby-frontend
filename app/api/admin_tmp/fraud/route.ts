import { NextRequest,  NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest, { params }: { params: Promise<Record<string, string>> }) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = Number(searchParams.get("limit") ?? 50);

    const events = await prisma.fraudEvent.findMany({
      take: limit,
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        eventType: true,
        signal: true,
        metadata: true,
        createdAt: true,
      },
    });

    return NextResponse.json({ success: true, data: events });
  } catch (err) {
    console.error("Admin Fraud Error:", err);
    return NextResponse.json({ success: false, error: "Internal Server Error" }, { status: 500 });
  }
}
