"use client";

import { useEffect, useState } from "react";

interface RiskProfileCardProps {
  apiUrl: string;
}

interface RiskProfile {
  id: string;
  name: string;
  score: number;
  level: "HIGH" | "MEDIUM" | "LOW";
  [key: string]: any;
}

export default function RiskProfileCard({ apiUrl }: RiskProfileCardProps) {
  const [profile, setProfile] = useState<RiskProfile | null>(null);

  useEffect(() => {
    async function loadProfile() {
      try {
        const res = await fetch(`${apiUrl}/dashboard/ai/risk-profile`);
        const json: RiskProfile = await res.json();
        setProfile(json);
      } catch (err) {
        console.error("Failed to load risk profile:", err);
      }
    }

    loadProfile();
  }, [apiUrl]);

  if (!profile) {
    return (
      <div className="gx-card p-6">
        <h2 className="text-lg font-bold">Risk Profile</h2>
        <p>Loading risk profile...</p>
      </div>
    );
  }

  return (
    <div className="gx-card p-6">
      <h2 className="text-lg font-bold mb-4">Risk Profile</h2>
      <p className="mb-2">Name: {profile.name}</p>
      <p className="mb-2">Score: {profile.score}</p>
      <p className="mb-2">
        Level:{" "}
        <span
          className={
            profile.level === "HIGH"
              ? "text-red-600 font-bold"
              : profile.level === "MEDIUM"
              ? "text-yellow-600 font-bold"
              : "text-green-600 font-bold"
          }
        >
          {profile.level}
        </span>
      </p>
    </div>
  );
}
