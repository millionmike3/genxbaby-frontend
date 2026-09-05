import { prisma } from "@/lib/prisma";

export async function getFraudSignals(userId: number) {
  const events = await prisma.behaviorEvent.findMany({
    where: { userId },
    orderBy: { timestamp: "desc" },
    take: 100,
  });

  const rapidEvents = events.filter((e, i, arr) => {
    if (i === 0) return false;
    const prev = arr[i - 1];
    return (
      e.timestamp.getTime() - prev.timestamp.getTime() < 1000 * 60 * 2 // < 2 min
    );
  });

  const highRiskPillars = events.filter(
    (e) => e.pillar === "PRICING" && (e.impulsivenessScore ?? 0) > 75
  );

  const score = Math.min(
    100,
    rapidEvents.length * 3 + highRiskPillars.length * 5
  );

  return {
    fraudScore: score,
    rapidEventsCount: rapidEvents.length,
    highRiskPricingEvents: highRiskPillars.length,
  };
}
