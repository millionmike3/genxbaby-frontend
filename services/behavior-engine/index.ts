// genxbaby-frontend/services/behavior-engine/index.ts

import { prisma } from "@/lib/prisma";

import { scoreStockSanitizer } from "./scoring/stock";
import { scoreCustomer } from "./scoring/customer";
import { scoreInvestor } from "./scoring/investor";
import { classify } from "./classify/classify";
import { createBehaviorSession } from "./session/createSession";
import { updateBehaviorProfile } from "./profile/updateProfile";

import { Metrics } from "./types/Metrics";
import { Pillar } from "./types/Pillars";

/**
 * MAIN BEHAVIOR ENGINE PROCESSOR
 * Computes impulsiveness score, creates a session, updates profile.
 */
export async function processBehaviorEvent(
  userId: string | null,
  leadId: string | null,
  investorId: string | null,
  pillar: Pillar,
  page: string,
  startedAt: string,
  endedAt: string,
  metrics: Metrics
) {
  let impulsivenessScore = 0;

  if (pillar === "STOCK_SANITIZER") {
    impulsivenessScore = scoreStockSanitizer(metrics);
  } else if (pillar === "CUSTOMER") {
    impulsivenessScore = scoreCustomer(metrics);
  } else if (pillar === "INVESTOR") {
    impulsivenessScore = scoreInvestor(metrics);
  }

  const level = classify(impulsivenessScore, pillar);

  const session = await createBehaviorSession(
    userId,
    leadId,
    investorId,
    pillar,
    page,
    startedAt,
    endedAt,
    metrics,
    impulsivenessScore
  );

  const profile = await updateBehaviorProfile(
    userId,
    leadId,
    investorId,
    pillar,
    impulsivenessScore
  );

  return { session, profile, level };
}

/**
 * BEHAVIOR HEATMAP DATA
 * Aggregates behavior events into a heatmap-like structure.
 * Required by: /admin-dashboard/app/api/bluetooth/cross/route.ts
 */
export async function getBehaviorHeatmapData() {
  const events = await prisma.behaviorEvent.findMany({
    orderBy: { timestamp: "desc" },
  });

  const map = new Map<
    string,
    { category: string; count: number; lastSeen: Date }
  >();

  for (const e of events) {
    const key = e.pillar || "Unknown";


    const existing = map.get(key);

    if (!existing) {
      map.set(key, {
        category: key,
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
