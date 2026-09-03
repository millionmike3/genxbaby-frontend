// genxbaby-frontend/services/bluetooth-engine/index.ts

import { prisma } from "@/lib/prisma";

// -------------------------------------------------------------
// HEATMAP DATA
// -------------------------------------------------------------
export async function getBluetoothHeatmapData() {
  const events = await prisma.bluetoothEvent.findMany({
    orderBy: { timestamp: "desc" },
  });

  const map = new Map<
    string,
    { name: string; count: number; lastSeen: Date }
  >();

  for (const e of events) {
    const key = e.name || "Unknown Device";
    const existing = map.get(key);

    if (!existing) {
      map.set(key, {
        name: key,
        count: 1,
        lastSeen: e.timestamp,
      });
    } else {
      existing.count += 1;
      if (e.timestamp > existing.lastSeen) {
        existing.lastSeen = e.timestamp;
      }
    }
  }

  return Array.from(map.values());
}

// -------------------------------------------------------------
// ALERTS DATA  (REQUIRED BY alerts/route.ts)
// -------------------------------------------------------------
export async function getBluetoothAlerts() {
  const alerts = await prisma.bluetoothAlert.findMany({
    orderBy: { timestamp: "desc" },
    take: 100,
  });

  return alerts.map((a) => ({
    id: a.id,
    severity: a.severity,
    message: a.message,
    deviceId: a.deviceId,
    timestamp: a.timestamp,
  }));
}

// -------------------------------------------------------------
// ADMIN SUMMARY (FILTERED)
// -------------------------------------------------------------
export async function getAdminBluetoothSummary({
  range,
  type,
  signal,
}: {
  range?: string;
  type?: string;
  signal?: string;
}) {
  let eventWhere: any = {};
  let alertWhere: any = {};

  if (range) {
    const now = new Date();
    const since =
      range === "24h"
        ? new Date(now.getTime() - 24 * 60 * 60 * 1000)
        : range === "7d"
        ? new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)
        : range === "30d"
        ? new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000)
        : null;

    if (since) {
      eventWhere.timestamp = { gte: since };
      alertWhere.timestamp = { gte: since };
    }
  }

  if (signal) {
    const signalMap: Record<string, number[]> = {
      weak: [-100, -85],
      fair: [-84, -70],
      good: [-69, -55],
      excellent: [-54, -40],
    };

    if (signalMap[signal]) {
      const [min, max] = signalMap[signal];
      eventWhere.rssi = { gte: min, lte: max };
    }
  }

  const includeEvents = !type || type === "events" || type === "all";
  const includeAlerts = !type || type === "alerts" || type === "all";

  const totalEvents = includeEvents
    ? await prisma.bluetoothEvent.count({ where: eventWhere })
    : 0;

  const totalAlerts = includeAlerts
    ? await prisma.bluetoothAlert.count({ where: alertWhere })
    : 0;

  const latestEvent = includeEvents
    ? await prisma.bluetoothEvent.findFirst({
        where: eventWhere,
        orderBy: { timestamp: "desc" },
      })
    : null;

  const latestAlert = includeAlerts
    ? await prisma.bluetoothAlert.findFirst({
        where: alertWhere,
        orderBy: { timestamp: "desc" },
      })
    : null;

  return {
    totalEvents,
    totalAlerts,
    latestEvent,
    latestAlert,
  };
}
