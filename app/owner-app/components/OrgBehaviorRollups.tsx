"use client";

import { useEffect, useState } from "react";

type BehaviorRollups = {
  avgScore: number;
  avgVolatility: number;
  avgReactionSpeed: number;
  avgNavigationVolatility: number;
  avgUrgencyScore: number;
  avgReversals: number;
};

export default function OrgBehaviorRollups({ orgId }: { orgId: string }) {
  const [rollups, setRollups] = useState<BehaviorRollups | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("gx_token") || "";
    (async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_GATEWAY_URL}/owner/${orgId}/behavior-rollups`,
        { headers: { Authorization: `Bearer ${token}` } }
      ).then((r) => r.json());
      setRollups(res);
    })();
  }, [orgId]);

  if (!rollups) {
    return (
      <div className="p-4 rounded-xl border border-slate-800 bg-slate-900/60">
        <p className="text-sm text-slate-400">Loading behavioral rollups...</p>
      </div>
    );
  }

  return (
    <div className="p-4 rounded-xl border border-slate-800 bg-slate-900/60">
      <h3 className="text-lg font-semibold mb-2">
        Behavioral Intelligence (Org Rollups)
      </h3>
      <div className="grid grid-cols-2 gap-2 text-sm text-slate-300">
        <div>Avg Score: {rollups.avgScore.toFixed(2)}</div>
        <div>Volatility: {rollups.avgVolatility.toFixed(2)}</div>
        <div>Reaction Speed: {rollups.avgReactionSpeed.toFixed(2)}</div>
        <div>Navigation Volatility: {rollups.avgNavigationVolatility.toFixed(2)}</div>
        <div>Urgency Score: {rollups.avgUrgencyScore.toFixed(2)}</div>
        <div>Reversals: {rollups.avgReversals.toFixed(2)}</div>
      </div>
    </div>
  );
}
