"use client";

import { useState } from "react";

export function TierCard({ tier, onSave }) {
  const [minScore, setMinScore] = useState(tier.minScore);
  const [maxScore, setMaxScore] = useState(tier.maxScore);
  const [marginBps, setMarginBps] = useState(tier.marginBps);

  return (
    <div className="border rounded-lg p-4 bg-white shadow space-y-4">
      <h2 className="text-xl font-semibold">{tier.tier}</h2>

      <div className="space-y-2">
        <label className="block text-sm">Min Score</label>
        <input
          type="number"
          value={minScore}
          onChange={(e) => setMinScore(Number(e.target.value))}
          className="border rounded p-2 w-full"
        />

        <label className="block text-sm">Max Score</label>
        <input
          type="number"
          value={maxScore}
          onChange={(e) => setMaxScore(Number(e.target.value))}
          className="border rounded p-2 w-full"
        />

        <label className="block text-sm">Margin (bps)</label>
        <input
          type="number"
          value={marginBps}
          onChange={(e) => setMarginBps(Number(e.target.value))}
          className="border rounded p-2 w-full"
        />
      </div>

      <button
        onClick={() =>
          onSave({ minScore, maxScore, marginBps })
        }
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Save
      </button>
    </div>
  );
}
