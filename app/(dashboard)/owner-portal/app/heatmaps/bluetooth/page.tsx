// owner-portal/app/heatmaps/bluetooth/page.tsx

"use client";

import { useEffect, useState } from "react";

interface BluetoothHeatmapDevice {
  name: string;
  deviceId: string | null;
  count: number;
  lastSeen: string | Date;
  avgSignalStrength: number;
  signalBand: string;
  volatilityScore: number;
}

export default function OwnerBluetoothHeatmapPage() {
  const [devices, setDevices] = useState<BluetoothHeatmapDevice[]>([]);

  // FIX: define range + signal
  const [range, setRange] = useState("24h");
  const [signal, setSignal] = useState("all");

  useEffect(() => {
    fetch(`/api/bluetooth/heatmap?range=${range}&signal=${signal}`)
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data.devices)) {
          setDevices(data.devices);
        }
      })
      .catch((err) =>
        console.error("Owner Bluetooth heatmap fetch error:", err)
      );
  }, [range, signal]);

  return (
    <div className="p-8 space-y-6">
      <h1 className="text-3xl font-bold">
        Bluetooth Activity Heatmap
      </h1>
      <p className="text-sm text-gray-400">
        Real device detections, signal bands, and volatility scores.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {devices.map((d, idx) => {
          const band = d.signalBand;
          const vol = d.volatilityScore;

          const bgColor =
            band === "excellent"
              ? "#22c55e"
              : band === "good"
              ? "#4ade80"
              : band === "fair"
              ? "#f59e0b"
              : band === "weak"
              ? "#dc2626"
              : "#6b7280";

          const borderColor = vol > 70 ? "#f97316" : "transparent";

          return (
            <div
              key={idx}
              className="p-4 rounded-lg text-white border-2"
              style={{ backgroundColor: bgColor, borderColor }}
            >
              <p className="font-semibold text-sm">{d.name}</p>
              <p className="text-xs">Detections: {d.count}</p>
              <p className="text-xs">
                Avg Signal: {d.avgSignalStrength.toFixed(1)} ({band})
              </p>
              <p className="text-xs">Volatility: {vol.toFixed(1)}</p>
              <p className="text-xs mt-1">
                Last Seen: {new Date(d.lastSeen).toLocaleString()}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
