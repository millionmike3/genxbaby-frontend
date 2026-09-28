import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { scoreFraud, scoreRisk, scoreImpulsiveness } from "@/lib/scoring";

export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  try {
    const user = await auth();

    if (!user) {
      return NextResponse.json("Unauthorized", { status: 401 });
    }

    // Load Prisma at runtime (server-only)
    const { prisma } = await import("@/lib/prisma");

    const body = await request.json();

    const fraudScore = scoreFraud(body);
    const riskScore = scoreRisk(body);
    const impulsivenessScore = scoreImpulsiveness(body);

    await prisma.scoringResult.create({
      data: {
        userId: parseInt(user.user.id, 10),
        fraudScore,
        riskScore,
        impulsivenessScore,
        rawData: body,
      },
    });

    return NextResponse.json({
      fraudScore,
      riskScore,
      impulsivenessScore,
    });
  } catch (err) {
    console.error("Scoring Error:", err);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
