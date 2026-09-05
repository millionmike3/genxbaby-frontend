"use client";

import { useEffect, useState } from "react";

interface BehaviorSession {
  id: string;
  pillar: string;
  page: string;
  impulsivenessScore: number | null;
  startedAt: string;
}

export default function BehaviorHeatmap() {
  const [sessions, setSessions] = useState<BehaviorSession[]>([]);

  useEffect(() => {
    fetch("/api/owner/behavior/sessions")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data.sessions)) {
          setSessions(data.sessions);
        }
      })
      .catch((err) => console.error("Heatmap fetch error:", err));
  }, []);

  return (
    <div className="p-8 space-y-6">
      <h1 className="text-3xl font-bold">Behavior Heatmap</h1>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {sessions.map((s) => {
          const score = s.impulsivenessScore ?? 0;

          const bgColor =
            score < 30
              ? "#1e3a8a" // stable (blue)
              : score < 60
              ? "#2563eb" // reactive (light blue)
              : score < 80
              ? "#f59e0b" // impulsive (yellow)
              : "#dc2626"; // volatile (red)

          return (
            <div
              key={s.id}
              className="p-4 rounded-lg text-white"
              style={{ backgroundColor: bgColor }}
            >
              <p className="font-semibold">{s.pillar}</p>
              <p>Score: {score.toFixed(2)}</p>
              <p>{s.page}</p>
              <p>{new Date(s.startedAt).toLocaleString()}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
