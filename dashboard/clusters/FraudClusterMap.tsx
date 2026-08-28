"use client";

import { useEffect, useState } from "react";

interface FraudClusterMapProps {
  apiUrl: string;
}

interface Cluster {
  id: string;
  name: string;
  riskScore: number;
  members: number;
}

export default function FraudClusterMap({ apiUrl }: FraudClusterMapProps) {
  const [clusters, setClusters] = useState<Cluster[]>([]);

  useEffect(() => {
    async function fetchClusters() {
      try {
        const res = await fetch(`${apiUrl}/fraud/clusters`);
        const data = await res.json();
        setClusters(data);
      } catch (err) {
        console.error("Failed to fetch fraud clusters:", err);
      }
    }

    fetchClusters();
  }, [apiUrl]);

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Fraud Clusters</h2>

      <ul className="space-y-2">
        {clusters.map((cluster) => (
          <li key={cluster.id} className="p-3 bg-white/10 rounded">
            <p className="font-semibold">{cluster.name}</p>
            <p className="text-sm text-gray-400">
              Risk Score: {cluster.riskScore}
            </p>
            <p className="text-xs text-gray-500">
              Members: {cluster.members}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}
