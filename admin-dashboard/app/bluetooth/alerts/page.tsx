"use client";

import { useEffect, useState } from "react";
import AdminBluetoothAlertsBanner from "../AdminBluetoothAlertsBanner";

interface BluetoothAlert {
  deviceId: string | null;
  name: string;
  count: number;
  volatilityScore: number;
  alert: string;
}

export default function AdminBluetoothAlertsPage() {
  const [alerts, setAlerts] = useState<BluetoothAlert[]>([]);
  const [range, setRange] = useState("24h");
  const [signal, setSignal] = useState("");

  useEffect(() => {
    fetch(`/api/bluetooth/alerts?range=${range}&signal=${signal}`)
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data.alerts)) {
          setAlerts(data.alerts);
        }
      })
      .catch((err) => console.error("Bluetooth alerts fetch error:", err));
  }, [range, signal]);

  return (
    <div className="p-8 space-y-8">
      <h1 className="text-3xl font-bold">Bluetooth Alerts</h1>

      {/* FILTERS */}
      <div className="flex gap-4 mb-4">
        <select
          className="p-2 rounded-lg bg-white/10 text-white border border-white/20"
          value={range}
          onChange={(e) => setRange(e.target.value)}
        >
          <option value="24h">Last 24 Hours</option>
          <option value="7d">Last 7 Days</option>
          <option value="30d">Last 30 Days</option>
        </select>

        <select
          className="p-2 rounded-lg bg-white/10 text-white border border-white/20"
          value={signal}
          onChange={(e) => setSignal(e.target.value)}
        >
          <option value="">All Signals</option>
          <option value="excellent">Excellent</option>
          <option value="good">Good</option>
          <option value="fair">Fair</option>
          <option value="weak">Weak</option>
        </select>
      </div>

      {/* GLOBAL ALERT BANNER */}
      <AdminBluetoothAlertsBanner />

      {/* ALERT LIST */}
      <div className="p-6 rounded-xl bg-white/5 space-y-4">
        <h2 className="text-xl font-semibold mb-2">Triggered Alerts</h2>

        {alerts.length === 0 && (
          <p className="text-gray-400 text-sm">
            No alerts triggered for the selected filters.
          </p>
        )}

        {alerts.map((a, idx) => (
          <div
            key={idx}
            className="p-4 rounded-lg bg-red-600/20 border border-red-600/40 text-white"
          >
            <p className="font-semibold">{a.alert}</p>

            <div className="mt-2 text-sm space-y-1">
              <p>
                <span className="font-medium">Device:</span>{" "}
                {a.name} ({a.deviceId || "No ID"})
              </p>
              <p>
                <span className="font-medium">Detections:</span> {a.count}
              </p>
              <p>
                <span className="font-medium">Volatility Score:</span>{" "}
                {a.volatilityScore.toFixed(2)}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
