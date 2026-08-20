// lib/server/getAnomalies.ts
"use server";

export function getAnomalies(timeline: any[]) {
  const anomalies: any[] = [];

  for (const item of timeline) {
    const amount = item.details?.amount
      ? Number(item.details.amount)
      : null;

    if (amount && amount > 100000) {
      anomalies.push({
        type: "LARGE_AMOUNT",
        action: item.action,
        amount,
        actor:
          item.details?.actor ||
          item.details?.wallet ||
          item.details?.email,
      });
    }
  }

  return anomalies;
}
