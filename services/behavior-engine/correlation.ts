// genxbaby-backend/services/bluetooth-engine/correlation.ts

import prisma from "@/lib/prisma";

export async function getBluetoothBehaviorCorrelation() {
  // BehaviorEvent is the actual "session" model in your schema
  const sessions = await prisma.behaviorEvent.findMany({
    include: {
      bluetoothEvents: true,
    },
  });

  const result = sessions.map((session) => {
    const events = session.bluetoothEvents;

    const count = events.length;

    const signals = events
      .map((e) => e.signalStrength)
      .filter((x) => typeof x === "number");

    const avgSignal =
      signals.reduce((a, b) => a + b, 0) / (signals.length || 1);

    return {
      sessionId: session.id,
      bluetoothEvents: count,
      avgSignalStrength: avgSignal,
    };
  });

  return result;
}
