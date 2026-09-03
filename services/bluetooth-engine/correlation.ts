// genxbaby-frontend/services/bluetooth-engine/correlation.ts

import { prisma } from "@/lib/prisma";

/**
 * Computes correlation between Bluetooth device behaviors.
 * Replace this logic with your real analytics later.
 */
export async function getBluetoothBehaviorCorrelation() {
  // Fetch events
  const events = await prisma.bluetoothEvent.findMany({
    orderBy: { timestamp: "desc" },
  });

  if (events.length < 2) {
    return {
      correlation: 0,
      message: "Not enough data to compute correlation",
    };
  }

  // Simple placeholder correlation logic
  let changes = 0;
  for (let i = 1; i < events.length; i++) {
    if (events[i].rssi !== events[i - 1].rssi) {
      changes++;
    }
  }

  const correlationScore = changes / events.length;

  return {
    correlation: correlationScore,
    message: "Correlation computed successfully",
  };
}
