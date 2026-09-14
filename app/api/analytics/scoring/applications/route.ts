import { NextRequest,  NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest, { params }: { params: Promise<Record<string, string>> }) {
  try {
    const scores = await prisma.scoringResult.findMany({
      select: {
        id: true,
        applicationId: true,
        fraudScore: true,
        riskScore: true,
        impulsivenessScore: true,
        createdAt: true,
      },
      orderBy: { createdAt: "desc" },
      take: 200,
    });

    return NextResponse.json({ success: true, data: scores });
  } catch (err) {
    console.error("Application Scoring Analytics Error:", err);
    return NextResponse.json({ success: false, error: "Internal Server Error" }, { status: 500 });
  }
}
