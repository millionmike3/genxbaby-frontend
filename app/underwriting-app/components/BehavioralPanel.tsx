"use client";

import { useEffect, useState } from "react";

export default function BehavioralPanel({ userId }) {
  const [score, setScore] = useState(null);

  useEffect(() => {
    if (!userId) return;

    const token = localStorage.getItem("gx_token");

    async function load() {
      const result = await fetch(
        `${process.env.NEXT_PUBLIC_GATEWAY_URL}/behavioral/score?userId=${userId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      ).then((r) => r.json());

      setScore(result);
    }

    load();
  }, [userId]);

  if (!score)
    return (
      <div className="p-6 bg-[#111] rounded-xl border border-[#3CF46B] mt-6">
        Loading behavioral intelligence...
      </div>
    );

  return (
    <div className="p-6 bg-[#111] rounded-xl border border-[#3CF46B] mt-6">
      <h2 className="text-xl font-bold text-[#3CF46B] mb-4">
        Behavioral Intelligence
      </h2>

      <div className="grid grid-cols-2 gap-4">
        <div>Score: {score.score}</div>
        <div>Classification: {score.classification}</div>
        <div>Volatility: {score.metrics.volatility}</div>
        <div>Reaction Speed: {score.metrics.reactionSpeed}</div>
        <div>Navigation Volatility: {score.metrics.navigationVolatility}</div>
        <div>Urgency Score: {score.metrics.urgencyScore}</div>
        <div>Reversals: {score.metrics.reversals}</div>
      </div>
    </div>
  );
}
