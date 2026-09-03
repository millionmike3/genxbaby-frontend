// genxbaby-frontend/services/stock-engine/index.ts

import { prisma } from "@/lib/prisma";

/**
 * STOCK HEATMAP DATA
 */
export async function getStockHeatmapData() {
  const events = await prisma.behaviorEvent.findMany({
    where: { pillar: "STOCK_SANITIZER" },
    orderBy: { timestamp: "desc" },
  });

  const map = new Map<
    string,
    { page: string; count: number; lastSeen: Date }
  >();

  for (const e of events) {
    const key = e.page || "UNKNOWN"; // FIXED — ticker does not exist
    const existing = map.get(key);

    if (!existing) {
      map.set(key, {
        page: key,
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
