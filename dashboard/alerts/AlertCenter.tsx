"use client";

import { useEffect, useState } from "react";
import AlertFilters from "./AlertFilters";
import AlertList from "./AlertList";
import { initAlertsSocket } from "./alerts.socket";

interface Alert {
  id: string;
  severity: "HIGH" | "MEDIUM" | "LOW" | "INFO";
  type: string;
  message: string;
  timestamp: string;
}



interface AlertCenterProps {
  apiUrl: string;
  ownerId: string;
}

export default function AlertCenter({ apiUrl, ownerId }: AlertCenterProps) {
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [filtered, setFiltered] = useState<Alert[]>([]);
  const [tab, setTab] = useState<"ALL" | "HIGH" | "MEDIUM" | "LOW" | "INFO">("ALL");

  // Fetch initial alerts
  useEffect(() => {
    async function loadAlerts() {
      try {
        const res = await fetch(`${apiUrl}/alerts?ownerId=${ownerId}`);
        const data = await res.json();
        setAlerts(data);
        setFiltered(data);
      } catch (err) {
        console.error("Failed to load alerts:", err);
      }
    }

    loadAlerts();
  }, [apiUrl, ownerId]);

  // Live socket updates
  useEffect(() => {
    const socket = initAlertsSocket(`${apiUrl}/alerts/stream`, (incoming) => {
      setAlerts((prev) => [incoming, ...prev]);
      if (tab === "ALL" || incoming.severity === tab) {
        setFiltered((prev) => [incoming, ...prev]);
      }
    });

    return () => socket.close();
  }, [apiUrl, tab]);

  // Filter by severity tab
  useEffect(() => {
    if (tab === "ALL") {
      setFiltered(alerts);
    } else {
      setFiltered(alerts.filter((a) => a.severity === tab));
    }
  }, [tab, alerts]);

  return (
    <div className="gx-card p-6 rounded-xl">
      <h2 className="text-xl font-bold gx-text-primary mb-4">Alert Center</h2>

      <div className="flex gap-3 mb-4">
        {["ALL", "HIGH", "MEDIUM", "LOW", "INFO"].map((t) => (
          <button
            key={t}
            onClick={() => setTab(t as typeof tab)}
            className={`px-3 py-1 rounded-lg text-sm ${
              tab === t ? "bg-white text-black" : "bg-white/10 text-white"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      <AlertFilters alerts={alerts} onFilter={setFiltered} />
      <AlertList alerts={filtered} />
    </div>
  );
}
