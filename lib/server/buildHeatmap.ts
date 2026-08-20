export function buildHeatmap(timeline: any[]) {
  const buckets: Record<string, number> = {};

  for (const item of timeline) {
    if (!item.createdAt) continue;

    const d = new Date(item.createdAt);
    const key = `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}-${d.getHours()}`;

    buckets[key] = (buckets[key] || 0) + 1;
  }

  // Compute max for gradient scaling
  const max = Math.max(...Object.values(buckets), 1);

  return { buckets, max };
}
