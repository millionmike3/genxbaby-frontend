"use client";

import { useEffect, useState } from "react";
import SignalCard from "@/components/SignalCard";
import { getRiskScore, getRiskSignals } from "@/services/analytics-engine/riskEngine";

type RiskSignal = {
  title: string;
  value: string | number;
  status: "good" | "warning" | "bad";
  description: string;
};

export default function RiskPanel({ userId }: { userId: number }) {
  const [score, setScore] = useState<number | null>(null);
  const [signals, setSignals] = useState<RiskSignal[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const s = await getRiskScore(userId);
        const sig = await getRiskSignals(userId);
        setScore(s);
        setSignals(sig);
      } catch (err) {
        console.error("RiskPanel error:", err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [userId]);

  if (loading) {
    return (
      <div className="p-6 rounded-xl bg-neutral-900 border border-neutral-800">
        <p className="text-neutral-400">Loading risk intelligence…</p>
      </div>
    );
  }

  const scoreColor =
    score && score >= 80
      ? "bg-green-700 text-white"
      : score && score >= 50
      ? "bg-yellow-600 text-black"
      : "bg-red-700 text-white";

  return (
    <div className="p-6 rounded-xl bg-neutral-900 border border-neutral-800 space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-white">Risk Intelligence</h2>
        <div className={`px-4 py-2 rounded-lg text-sm font-semibold ${scoreColor}`}>
          Score: {score ?? "N/A"}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {signals.map((sig, idx) => (
          <SignalCard
            key={idx}
            title={sig.title}
            value={sig.value}
            status={sig.status}
            description={sig.description}
          />
        ))}
      </div>
    </div>
  );
}
