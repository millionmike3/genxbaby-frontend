// app/admin/audit/server/getFraudScores.ts
export function getFraudScores(timeline: any[]) {
  const scores: any[] = [];

  for (const item of timeline) {
    let score = 0;

    const amount = Number(item.details?.amount ?? 0);

    if (item.action === "CheckVoided") score += 5;
    if (amount > 50000) score += 10;
    if (item.action === "AuditRootAnchored") score += 2;

    if (score > 0) {
      scores.push({
        action: item.action,
        createdAt: item.createdAt,
        score,
        details: item.details,
      });
    }
  }

  return scores.sort((a, b) => b.score - a.score);
}
