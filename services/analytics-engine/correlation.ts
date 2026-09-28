"use server";

import type { Prisma } from "@prisma/client";

export async function correlatePricingBehavior(userId: number) {
  // Load Prisma at runtime (server-only)
  const { prisma } = await import("@/lib/prisma");

  // Strongly typed payloads from Prisma
  type BehaviorEvent = Prisma.BehaviorEventGetPayload<true>;
  type BluetoothEvent = Prisma.BluetoothEventGetPayload<true>;

  const behavior: BehaviorEvent[] = await prisma.behaviorEvent.findMany({
    where: { userId },
    orderBy: { timestamp: "desc" },
    take: 50,
  });

  const bluetooth: BluetoothEvent[] = await prisma.bluetoothEvent.findMany({
    where: { userId },
    orderBy: { timestamp: "desc" },
    take: 50,
  });

  const quotes: BehaviorEvent[] = await prisma.behaviorEvent.findMany({
    where: { userId, pillar: "PRICING" },
    orderBy: { timestamp: "desc" },
    take: 20,
  });

  return {
    impulsivenessAvg:
      behavior.reduce(
        (acc: number, b: BehaviorEvent) => acc + (b.impulsivenessScore ?? 0),
        0
      ) / behavior.length,

    bluetoothRiskAvg:
      bluetooth.reduce(
        (acc: number, b: BluetoothEvent) => acc + (b.signalStrength ?? 0),
        0
      ) / bluetooth.length,

    pricingVolatility:
      quotes.reduce(
        (acc: number, q: BehaviorEvent) => acc + (q.impulsivenessScore ?? 0),
        0
      ) / quotes.length,
  };
}
