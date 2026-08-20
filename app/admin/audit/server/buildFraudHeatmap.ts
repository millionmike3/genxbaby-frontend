// app/admin/audit/server/buildFraudHeatmap.ts
export function buildFraudHeatmap(timeline: any[], fraudScores: any[]) {
  const fraudSet = new Set(
    fraudScores.map((f) => `${f.action}-${f.createdAt}`)
  );

  const buckets: Record<string, number> = {};

  for (const item of timeline) {
    const keyEvent = `${item.action}-${item.createdAt}`;
    if (!fraudSet.has(keyEvent)) continue;

    const d = new Date(item.createdAt);
    const key = `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}-${d.getHours()}`;
    buckets[key] = (buckets[key] || 0) + 1;
  }

  const max = Math.max(...Object.values(buckets), 1);
  return { buckets, max };
}
