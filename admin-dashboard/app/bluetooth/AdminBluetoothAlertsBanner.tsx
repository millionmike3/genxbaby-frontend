"use client";

import { useEffect, useState } from "react";

interface BluetoothAlert {
  deviceId: string | null;
  count: number;
  alert: string;
}

export default function AdminBluetoothAlertsBanner() {
  const [alerts, setAlerts] = useState<BluetoothAlert[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAlerts();

    // Auto-refresh every 10 seconds
    const interval = setInterval(fetchAlerts, 10000);
    return () => clearInterval(interval);
  }, []);

  const fetchAlerts = () => {
    fetch("/api/bluetooth/alerts")
      .then((res) => res.json())
      .then((data) => {
        setAlerts(data.alerts || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Bluetooth alerts fetch error:", err);
        setLoading(false);
      });
  };

  if (loading) {
    return (
      <div className="p-4 rounded-lg bg-black/20 border border-white/10 animate-pulse">
        <p className="text-gray-300">Loading Bluetooth alerts…</p>
      </div>
    );
  }

  if (!alerts.length) {
    return (
      <div className="p-4 rounded-lg bg-black/20 border border-white/10">
        <p className="text-gray-400">No active Bluetooth alerts.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {alerts.map((a, idx) => (
        <div
          key={idx}
          className="p-4 rounded-lg bg-red-600/20 border border-red-500/40 text-red-300"
        >
          <div className="flex justify-between items-center">
            <div>
              <p className="font-semibold text-lg">{a.alert}</p>
              <p className="text-sm text-red-200">
                Device: {a.deviceId || "Unknown"}
              </p>
              <p className="text-sm text-red-200">
                Detections: {a.count}
              </p>
            </div>

            <button
              onClick={() =>
                setAlerts((prev) =>
                  prev.filter((_, i) => i !== idx)
                )
              }
              className="text-red-300 hover:text-red-100 transition"
            >
              ✕
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
