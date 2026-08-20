// app/admin/audit/server/getAdminScores.ts
export function getAdminScores(timeline: any[]) {
  const map: Record<string, { actor: string; score: number }> = {};

  for (const item of timeline) {
    if (!item.admin) continue;

    const actor = item.admin.email;

    if (!map[actor]) {
      map[actor] = { actor, score: 0 };
    }

    map[actor].score += 1;
  }

  return Object.values(map).sort((a, b) => b.score - a.score);
}
