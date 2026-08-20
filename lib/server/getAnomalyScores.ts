"use server";

export function getAnomalyScores(timeline: any[]) {
  const anomalies: any[] = [];

  for (const item of timeline) {
    const details = item.details || {};
    let score = 0;

    // Threshold: large amounts
    if (details.amount && Number(details.amount) > 100000) score += 10;

    // Threshold: repeated voids
    if (item.action === "CheckVoided") score += 4;

    // Threshold: unusual hours
    const hour = new Date(item.createdAt).getHours();
    if (hour < 5 || hour > 23) score += 3;

    if (score >= 7) {
      anomalies.push({
        type: "HIGH_RISK",
        score,
        action: item.action,
        details,
        createdAt: item.createdAt,
      });
    } else if (score >= 4) {
      anomalies.push({
        type: "MEDIUM_RISK",
        score,
        action: item.action,
        details,
        createdAt: item.createdAt,
      });
    }
  }

  return anomalies.sort((a, b) => b.score - a.score);
}
