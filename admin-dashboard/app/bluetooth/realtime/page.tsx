// admin-dashboard/app/bluetooth/realtime/page.tsx

"use client";

import { useEffect, useState } from "react";

interface BluetoothEvent {
  id: string;
  name: string;
  deviceId: string | null;
  timestamp: string | Date;
  signalStrength: number | null;
}

export default function BluetoothRealtimePage() {
  const [events, setEvents] = useState<BluetoothEvent[]>([]);

  useEffect(() => {
    const ws = new WebSocket("ws://localhost:8080");

    ws.onmessage = (msg) => {
      try {
        const data = JSON.parse(msg.data);
        if (data.type === "bluetooth-event") {
          setEvents((prev) => [data.event, ...prev].slice(0, 50));
        }
      } catch (e) {
        console.error("WS parse error:", e);
      }
    };

    return () => ws.close();
  }, []);

  return (
    <div className="p-8 space-y-6">
      <h1 className="text-3xl font-bold">
        Real‑Time Bluetooth Event Stream
      </h1>

      <div className="p-6 rounded-xl bg-white/5 space-y-3">
        {events.map((e) => (
          <div
            key={e.id}
            className="flex items-center justify-between p-3 rounded-lg bg-white/10"
          >
            <div>
              <p className="font-semibold text-sm">
                {e.name} ({e.deviceId || "No ID"})
              </p>
              <p className="text-xs text-gray-300">
                {new Date(e.timestamp).toLocaleString()}
              </p>
            </div>
            <div className="text-xs">
              Signal:{" "}
              {e.signalStrength !== null
                ? e.signalStrength
                : "--"}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
