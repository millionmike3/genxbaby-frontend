"use client";

import { useEffect, useState } from "react";

interface CasePanelProps {
  ownerId: string;
  apiUrl: string;
}

interface Case {
  id: string;
  title: string;
  status: string;
  createdAt: string;
}

export default function CasePanel({ ownerId, apiUrl }: CasePanelProps) {
  const [cases, setCases] = useState<Case[]>([]);

  useEffect(() => {
    async function fetchCases() {
      try {
        const res = await fetch(`${apiUrl}/cases?ownerId=${ownerId}`);
        const data = await res.json();
        setCases(data);
      } catch (err) {
        console.error("Failed to fetch cases:", err);
      }
    }

    fetchCases();
  }, [ownerId, apiUrl]);

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Cases</h2>

      <ul className="space-y-2">
        {cases.map((c) => (
          <li key={c.id} className="p-3 bg-white/10 rounded">
            <p className="font-semibold">{c.title}</p>
            <p className="text-sm text-gray-400">{c.status}</p>
            <p className="text-xs text-gray-500">
              {new Date(c.createdAt).toLocaleString()}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}
