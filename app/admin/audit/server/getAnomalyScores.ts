// app/admin/audit/server/getAnomalyScores.ts
export function getAnomalyScores(timeline: any[]) {
  const anomalies: any[] = [];

  for (const item of timeline) {
    const amount = Number(item.details?.amount ?? 0);

    if (amount > 100000) {
      anomalies.push({
        type: "HighValueTransaction",
        score: 0.9,
        action: item.action,
        details: item.details,
      });
    }
  }

  return anomalies;
}
