"use client";

import { useEffect, useState } from "react";

interface UnderwritingPanelProps {
  ownerId: string;
  apiUrl: string;
}

interface UnderwritingData {
  id: string;
  category: string;
  score: number;
  status: string;
  [key: string]: any;
}

export default function UnderwritingPanel({ ownerId, apiUrl }: UnderwritingPanelProps) {
  const [data, setData] = useState<UnderwritingData[] | null>(null);

  useEffect(() => {
    async function loadUnderwriting() {
      try {
        const res = await fetch(`${apiUrl}/dashboard/ai/underwriting/${ownerId}`);
        const json: UnderwritingData[] = await res.json();
        setData(json);
      } catch (err) {
        console.error("Failed to load underwriting panel:", err);
      }
    }

    loadUnderwriting();
  }, [ownerId, apiUrl]);

  if (!data) {
    return (
      <div className="gx-card p-6">
        <h2 className="text-lg font-bold">Underwriting Analysis</h2>
        <p>Loading underwriting data...</p>
      </div>
    );
  }

  return (
    <div className="gx-card p-6">
      <h2 className="text-lg font-bold mb-4">Underwriting Analysis</h2>
      <ul className="list-disc pl-6">
        {data.map((item) => (
          <li key={item.id}>
            {item.category}: {item.score} ({item.status})
          </li>
        ))}
      </ul>
    </div>
  );
}
