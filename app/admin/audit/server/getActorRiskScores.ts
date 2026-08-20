// app/admin/audit/server/getActorRiskScores.ts
export function getActorRiskScores(timeline: any[]) {
  const map: Record<string, { actor: string; score: number; events: number }> = {};

  for (const item of timeline) {
    const actor =
      item.details?.actor ||
      item.details?.wallet ||
      item.details?.address ||
      null;

    if (!actor) continue;

    if (!map[actor]) {
      map[actor] = { actor, score: 0, events: 0 };
    }

    const entry = map[actor];
    entry.events += 1;

    const amount = Number(item.details?.amount ?? 0);

    if (item.action === "CheckVoided") entry.score += 5;
    if (amount > 50000) entry.score += 10;
    if (item.action === "AuditRootAnchored") entry.score += 2;
  }

  return Object.values(map).sort((a, b) => b.score - a.score);
}
