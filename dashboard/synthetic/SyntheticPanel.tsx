"use client";

import { useEffect, useState } from "react";

interface SyntheticPanelProps {
  ownerId: string;
  apiUrl: string;
}

interface SyntheticData {
  id: string;
  type: string;
  score: number;
  [key: string]: any;
}

export default function SyntheticPanel({ ownerId, apiUrl }: SyntheticPanelProps) {
  const [data, setData] = useState<SyntheticData[] | null>(null);

  useEffect(() => {
    async function loadSynthetic() {
      try {
        const res = await fetch(`${apiUrl}/dashboard/ai/synthetic/${ownerId}`);
        const json: SyntheticData[] = await res.json();
        setData(json);
      } catch (err) {
        console.error("Failed to load synthetic panel:", err);
      }
    }

    loadSynthetic();
  }, [ownerId, apiUrl]);

  if (!data) {
    return (
      <div className="gx-card p-6">
        <h2 className="text-lg font-bold">Synthetic Data</h2>
        <p>Loading synthetic analysis...</p>
      </div>
    );
  }

  return (
    <div className="gx-card p-6">
      <h2 className="text-lg font-bold mb-4">Synthetic Data</h2>
      <ul className="list-disc pl-6">
        {data.map((item) => (
          <li key={item.id}>
            {item.type}: {item.score}
          </li>
        ))}
      </ul>
    </div>
  );
}
