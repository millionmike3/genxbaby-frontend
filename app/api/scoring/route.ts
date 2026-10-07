import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { getPrisma } from "@/lib/prisma";
import { scoreFraud, scoreRisk, scoreImpulsiveness } from "@/lib/scoring";

// Define the shape of the scoring input
interface ScoringInput {
  age: number;
  incomeVolatility: number;
  deviceCount: number;
  bluetoothDensity: number;
  ipReputation: string;
  [key: string]: unknown;
}

// Define the shape of your auth session
interface AuthSession {
  id: string;
  email?: string | null;
  role?: string | null;
}

export async function POST(
  request: NextRequest,
  { params }: { params: Record<string, string> }
) {
  const user = (await auth(request)) as AuthSession | null;

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = (await request.json()) as ScoringInput;

  const fraudScore = scoreFraud(body);
  const riskScore = scoreRisk(body);
  const impulsivenessScore = scoreImpulsiveness(body);

  const prisma = await getPrisma();

  await prisma.scoringResult.create({
    data: {
      userId: user.id,
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
