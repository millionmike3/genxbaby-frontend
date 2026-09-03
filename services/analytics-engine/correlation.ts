import { prisma } from "@/lib/prisma";

export async function correlatePricingBehavior(userId: number) {
  const behavior = await prisma.behaviorEvent.findMany({
    where: { userId },
    orderBy: { timestamp: "desc" },
    take: 50,
  });

  const bluetooth = await prisma.bluetoothEvent.findMany({
    where: { userId },
    orderBy: { timestamp: "desc" },
    take: 50,
  });

  const quotes = await prisma.behaviorEvent.findMany({
    where: { userId, pillar: "PRICING" },
    orderBy: { timestamp: "desc" },
    take: 20,
  });

  return {
    impulsivenessAvg:
      behavior.reduce((acc, b) => acc + (b.impulsivenessScore ?? 0), 0) /
      behavior.length,

    bluetoothRiskAvg:
      bluetooth.reduce((acc, b) => acc + (b.signalStrength ?? 0), 0) /
      bluetooth.length,

    pricingVolatility:
      quotes.reduce((acc, q) => acc + (q.impulsivenessScore ?? 0), 0) /
      quotes.length,
  };
}
