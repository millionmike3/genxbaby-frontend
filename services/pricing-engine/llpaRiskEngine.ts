import { prisma } from "@/lib/prisma";

export async function getLlpaRisk(userId: number) {
  const quotes = await prisma.behaviorEvent.findMany({
    where: { userId, pillar: "PRICING" },
    orderBy: { timestamp: "desc" },
    take: 50,
  });

  if (!quotes.length) {
    return { llpaRiskScore: 0, avgImpulsiveness: 0, quoteCount: 0 };
  }

  const avgImp =
    quotes.reduce((acc, q) => acc + (q.impulsivenessScore ?? 0), 0) /
    quotes.length;

  const llpaRiskScore = Math.min(100, Math.round(avgImp));

  return {
    llpaRiskScore,
    avgImpulsiveness: avgImp,
    quoteCount: quotes.length,
  };
}
