"use client";

import { useEffect, useState } from "react";

type BehaviorProfileDTO = {
  id: string;
  pillar: string;
  sessionsCount: number;
  avgImpulsivenessScore: number;
  maxImpulsivenessScore: number;
  impulsivenessLevel: string;
};

export default function BehaviorDashboard() {
  const [profiles, setProfiles] = useState<BehaviorProfileDTO[]>([]);

  useEffect(() => {
    fetch("/api/admin/behavior/profiles")
      .then((res) => res.json())
      .then((data) => setProfiles(data.profiles));
  }, []);

  return (
    <div className="p-8 space-y-6">
      <h1 className="text-3xl font-bold">Behavior Intelligence Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {profiles.map((p) => (
          <div
            key={p.id}
            className="p-4 rounded-lg bg-black/20 border border-white/10"
          >
            <h2 className="text-xl font-semibold">{p.pillar}</h2>
            <p>Sessions: {p.sessionsCount}</p>
            <p>Avg Score: {p.avgImpulsivenessScore.toFixed(2)}</p>
            <p>Max Score: {p.maxImpulsivenessScore.toFixed(2)}</p>
            <p>Level: {p.impulsivenessLevel}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
