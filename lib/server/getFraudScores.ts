"use server";

export function getFraudScores(timeline: any[]) {
  const scores: any[] = [];

  for (const item of timeline) {
    const details = item.details || {};

    // Example scoring heuristics
    let score = 0;

    if (item.action === "CheckVoided") score += 5;
    if (item.action === "CheckRegistered" && Number(details.amount) > 50000)
      score += 10;
    if (item.action === "AuditRootAnchored") score += 2;

    // Time-based anomaly
    const hour = new Date(item.createdAt).getHours();
    if (hour < 6 || hour > 22) score += 3;

    if (score > 0) {
      scores.push({
        action: item.action,
        score,
        details,
        createdAt: item.createdAt,
      });
    }
  }

  return scores.sort((a, b) => b.score - a.score);
}
