"use client";

import { useEffect, useState } from "react";

interface GlobalAlertsPanelProps {
  apiUrl: string;
}

interface Alert {
  id: string;
  severity: "HIGH" | "MEDIUM" | "LOW" | "INFO";
  type: string;
  message: string;
  timestamp: string;
}

export default function GlobalAlertsPanel({ apiUrl }: GlobalAlertsPanelProps) {
  const [alerts, setAlerts] = useState<Alert[]>([]);

  useEffect(() => {
    async function fetchAlerts() {
      try {
        const res = await fetch(`${apiUrl}/alerts/global`);
        const data = await res.json();
        setAlerts(data);
      } catch (err) {
        console.error("Failed to fetch global alerts:", err);
      }
    }

    fetchAlerts();
  }, [apiUrl]);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Global Alerts</h2>

      <ul className="space-y-2">
        {alerts.map((alert) => (
          <li key={alert.id} className="p-3 bg-white/10 rounded">
            <p className="font-semibold">{alert.type}</p>
            <p className="text-sm text-gray-400">{alert.message}</p>
            <p className="text-xs text-gray-500">
              {new Date(alert.timestamp).toLocaleString()}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}
