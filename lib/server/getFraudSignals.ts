// lib/server/getFraudSignals.ts
"use server";

export function getFraudSignals(timeline: any[]) {
  const signals: any[] = [];

  // Example: multiple voids on same check
  const voidCounts: Record<string, number> = {};
  for (const item of timeline) {
    if (item.action === "CheckVoided" && item.details?.checkNumber) {
      const key = item.details.checkNumber;
      voidCounts[key] = (voidCounts[key] || 0) + 1;
      if (voidCounts[key] > 2) {
        signals.push({
          type: "MULTIPLE_VOIDS",
          checkNumber: key,
          count: voidCounts[key],
        });
      }
    }
  }

  return signals;
}
