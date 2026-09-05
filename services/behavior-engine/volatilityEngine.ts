import { prisma } from "@/lib/prisma";

export async function getBehaviorVolatility(userId: number) {
  const events = await prisma.behaviorEvent.findMany({
    where: { userId },
    orderBy: { timestamp: "asc" },
    take: 100,
  });

  if (events.length < 2) {
    return { volatilityScore: 0, deltas: [] };
  }

  const deltas = events.map((e, i, arr) => {
    if (i === 0) return 0;
    const prev = arr[i - 1];
    return Math.abs(
      (e.impulsivenessScore ?? 0) - (prev.impulsivenessScore ?? 0)
    );
  });

  const avgDelta =
    deltas.reduce((acc, d) => acc + d, 0) / Math.max(deltas.length, 1);

  return {
    volatilityScore: Math.min(100, Math.round(avgDelta)),
    deltas,
  };
}
