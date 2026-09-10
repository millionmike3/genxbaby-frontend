import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { scoreFraud, scoreRisk, scoreImpulsiveness } from "@/lib/scoring";
import type { NextRequest } from "next/server";

// Define the shape of the scoring input
// Adjust fields based on your actual scoring logic
interface ScoringInput {
  age: number;
  incomeVolatility: number;
  deviceCount: number;
  bluetoothDensity: number;
  ipReputation: string;
  [key: string]: unknown; // allow extra fields
}

// Define the shape of your auth session
interface AuthSession {
  id: string; // required because you use user.id
  email?: string | null;
  role?: string | null;
}

export async function POST(req: NextRequest) {
  const user = (await auth(req)) as AuthSession | null;

  if (!user) {
    return new Response("Unauthorized", { status: 401 });
  }

  const body = (await req.json()) as ScoringInput;

  const fraudScore = scoreFraud(body);
  const riskScore = scoreRisk(body);
  const impulsivenessScore = scoreImpulsiveness(body);

  await prisma.scoringResult.create({
    data: {
      userId: user.id,
      fraudScore,
      riskScore,
      impulsivenessScore,
      rawData: body,
    },
  });

  return Response.json({ fraudScore, riskScore, impulsivenessScore });
}
