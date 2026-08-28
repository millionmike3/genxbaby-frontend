"use client";

import { useEffect, useState } from "react";
import FraudDashboard from "./FraudDashboard";

interface FraudPageProps {
  ownerId: string;
  apiUrl: string;
}

export default function FraudPage({ ownerId, apiUrl }: FraudPageProps) {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch(`${apiUrl}/fraud/owner/${ownerId}`);
        const json = await res.json();
        setData(json);
      } catch (err) {
        console.error("Failed to load fraud page:", err);
      }
    }

    load();
  }, [ownerId, apiUrl]);

  if (!data) {
    return <div className="gx-card p-6">Loading fraud intelligence…</div>;
  }

  return (
    <div className="p-6">
      <FraudDashboard ownerId={ownerId} apiUrl={apiUrl} />
    </div>
  );
}
