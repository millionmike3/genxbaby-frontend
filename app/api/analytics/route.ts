import { auth } from "@/lib/auth"; // your real auth
import { prisma } from "@/lib/prisma";
import { scoreFraud, scoreRisk, scoreImpulsiveness } from "@/lib/scoring";

export async function POST(req: Request) {
  const user = await auth();

  if (!user) {
    return new Response("Unauthorized", { status: 401 });
  }

  const body = await req.json();

  const fraudScore = scoreFraud(body);
  const riskScore = scoreRisk(body);
  const impulsivenessScore = scoreImpulsiveness(body);

  await prisma.scoringResult.create({
    data: {
      userId: parseInt(user.user.id, 10), // ✔ FIXED comma + correct ID
      fraudScore,
      riskScore,
      impulsivenessScore,
      rawData: body,
    },
  });

  return Response.json({ fraudScore, riskScore, impulsivenessScore });
}
