"use server";


import { prisma } from "@/lib/prisma";
import type { Prisma } from "@prisma/client";

export async function getFraudSignals(userId: number) {
  // Strong typing from Prisma
  type BehaviorEvent = Prisma.BehaviorEventGetPayload<true>;

  const events: BehaviorEvent[] = await prisma.behaviorEvent.findMany({
    where: { userId },
    orderBy: { timestamp: "desc" },
    take: 100,
  });

  const rapidEvents = events.filter((e: BehaviorEvent, i: number, arr: BehaviorEvent[]) => {
    if (i === 0) return false;
    const prev = arr[i - 1];
    return (
      e.timestamp.getTime() - prev.timestamp.getTime() < 1000 * 60 * 2 // < 2 min
    );
  });

  const highRiskPillars = events.filter(
    (e: BehaviorEvent) =>
      e.pillar === "PRICING" && (e.impulsivenessScore ?? 0) > 75
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
