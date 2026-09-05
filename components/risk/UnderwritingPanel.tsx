"use client";

import { useEffect, useState } from "react";
import SignalCard from "@/components/SignalCard";
import { getUnderwritingProfile } from "@/services/analytics-engine/underwritingEngine";

export default function UnderwritingPanel({ userId }: { userId: number }) {
  const [score, setScore] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState<any | null>(null);

  useEffect(() => {
    async function load() {
      try {
        const p = await getUnderwritingProfile(userId);
        setScore(p.underwritingScore);
        setProfile(p);
      } catch (err) {
        console.error("UnderwritingPanel error:", err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [userId]);

  if (loading || !profile) {
    return (
      <div className="p-6 rounded-xl bg-neutral-900 border border-neutral-800">
        <p className="text-neutral-400">Loading underwriting profile…</p>
      </div>
    );
  }

  const scoreColor =
    score && score >= 80
      ? "bg-green-700 text-white"
      : score && score >= 50
      ? "bg-yellow-600 text-black"
      : "bg-red-700 text-white";

  const signals = [
    {
      title: "Underwriting Score",
      value: score ?? "N/A",
      status:
        score && score >= 80 ? "good" : score && score >= 50 ? "warning" : "bad",
      description: "Unified underwriting score across engines.",
    },
    {
      title: "Behavior Volatility",
      value: profile.volatility.volatilityScore,
      status:
        profile.volatility.volatilityScore < 30
          ? "good"
          : profile.volatility.volatilityScore < 60
          ? "warning"
          : "bad",
      description: "Average change in impulsiveness over time.",
    },
    {
      title: "LLPA Risk",
      value: profile.llpa.llpaRiskScore,
      status:
        profile.llpa.llpaRiskScore < 30
          ? "good"
          : profile.llpa.llpaRiskScore < 60
          ? "warning"
          : "bad",
      description: "Risk based on pricing interactions and LLPA sensitivity.",
    },
    {
      title: "Bluetooth Anomalies",
      value: profile.bluetooth.anomalyScore,
      status:
        profile.bluetooth.anomalyScore < 30
          ? "good"
          : profile.bluetooth.anomalyScore < 60
          ? "warning"
          : "bad",
      description: "Weak/strong signal patterns indicating device anomalies.",
    },
    {
      title: "Fraud Score",
      value: profile.fraud.fraudScore,
      status:
        profile.fraud.fraudScore < 30
          ? "good"
          : profile.fraud.fraudScore < 60
          ? "warning"
          : "bad",
      description: "Fraud risk based on rapid and high‑risk events.",
    },
  ];

  return (
    <div className="p-6 rounded-xl bg-neutral-900 border border-neutral-800 space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-white">Underwriting Intelligence</h2>
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
