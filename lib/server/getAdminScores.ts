// lib/server/getAdminScores.ts
"use server";

export function getAdminScores(timeline: any[]) {
  const scores: Record<string, number> = {};

  for (const item of timeline) {
    const actor =
      item.details?.actor ||
      item.details?.wallet ||
      item.details?.email ||
      null;

    if (!actor) continue;

    let delta = 0;

    if (item.action === "GRANT_ROLE") delta += 5;
    if (item.action === "REVOKE_ROLE") delta += 3;
    if (item.action === "CheckRegistered") delta += 2;
    if (item.action === "CheckVoided") delta += 4;

    scores[actor] = (scores[actor] || 0) + delta;
  }

  return Object.entries(scores)
    .map(([actor, score]) => ({ actor, score }))
    .sort((a, b) => b.score - a.score);
}
