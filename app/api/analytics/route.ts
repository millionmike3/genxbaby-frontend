import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { scoreFraud, scoreRisk, scoreImpulsiveness } from "@/lib/scoring";

export async function POST(request: NextRequest, { params }: { params: Promise<Record<string, string>> }) {
  const user = await auth();

  if (!user) {
    return NextResponse.json("Unauthorized", { status: 401 });
  }

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
}
