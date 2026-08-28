"use client";

import { useEffect, useState } from "react";

interface OwnerIntelligenceReportProps {
  apiUrl: string;
}

interface Profile {
  id: string;
  name: string;
  email: string;
  [key: string]: any;
}

interface Cluster {
  id: string;
  label: string;
  severity: "HIGH" | "MEDIUM" | "LOW";
}

interface TimelineEvent {
  id: string;
  date: string;
  description: string;
}

export default function OwnerIntelligenceReport({ apiUrl }: OwnerIntelligenceReportProps) {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [clusters, setClusters] = useState<Cluster[]>([]);
  const [timeline, setTimeline] = useState<TimelineEvent[]>([]);

  useEffect(() => {
    async function loadReport() {
      try {
        const res = await fetch(`${apiUrl}/dashboard/ai/owner-intelligence`);
        const json = await res.json();

        setProfile(json.profile);
        setClusters(json.clusters);
        setTimeline(json.timeline);
      } catch (err) {
        console.error("Failed to load owner intelligence report:", err);
      }
    }

    loadReport();
  }, [apiUrl]);

  return (
    <div className="bg-white border rounded shadow p-6 space-y-6">
      <h2 className="text-xl font-bold">Owner Intelligence Report</h2>

      {profile && (
        <div>
          <h3 className="text-lg font-semibold mb-2">Profile</h3>
          <p>Name: {profile.name}</p>
          <p>Email: {profile.email}</p>
        </div>
      )}

      {clusters.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold mb-2">Clusters</h3>
          <ul className="list-disc pl-6">
            {clusters.map((c) => (
              <li key={c.id}>
                {c.label} — <span className="font-bold">{c.severity}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {timeline.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold mb-2">Timeline</h3>
          <ul className="list-disc pl-6">
            {timeline.map((t) => (
              <li key={t.id}>
                {t.date}: {t.description}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
