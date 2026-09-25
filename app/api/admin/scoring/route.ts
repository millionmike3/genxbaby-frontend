import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = Number(searchParams.get("limit") ?? 50);

    const scores = await prisma.scoringResult.findMany({
      take: limit,
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        applicationId: true,
        fraudScore: true,
        riskScore: true,
        impulsivenessScore: true,
        createdAt: true,
      },
    });

    return NextResponse.json({ success: true, data: scores });
  } catch (err) {
    console.error("Admin Scoring Error:", err);
    return NextResponse.json(
      { success: false, error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
