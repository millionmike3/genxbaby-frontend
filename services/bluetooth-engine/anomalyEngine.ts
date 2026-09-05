import { prisma } from "@/lib/prisma";

export async function getBluetoothAnomalies(userId: number) {
  const events = await prisma.bluetoothEvent.findMany({
    where: { userId },
    orderBy: { timestamp: "desc" },
    take: 100,
  });

  if (!events.length) {
    return { anomalyScore: 0, weakSignals: 0, strongSignals: 0 };
  }

  const weakSignals = events.filter((e) => (e.signalStrength ?? 0) < 30).length;
  const strongSignals = events.filter((e) => (e.signalStrength ?? 0) > 80)
    .length;

  const anomalyScore = Math.min(
    100,
    weakSignals * 2 + strongSignals * 1.5
  );

  return {
    anomalyScore: Math.round(anomalyScore),
    weakSignals,
    strongSignals,
  };
}
