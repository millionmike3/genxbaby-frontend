"use client";

import { useEffect, useState } from "react";

interface CorrelationRow {
  sessionId: string;
  bluetoothEvents: number;
  avgSignalStrength: number;
}

export default function BluetoothBehaviorCorrelationPage() {
  const [rows, setRows] = useState<CorrelationRow[]>([]);
  const [range, setRange] = useState("24h");
  const [signal, setSignal] = useState("good");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);

    fetch(`/api/bluetooth/correlation?range=${range}&signal=${signal}`)
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data.data)) {
          setRows(data.data);
        } else {
          setRows([]);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Bluetooth correlation fetch error:", err);
        setRows([]);
        setLoading(false);
      });
  }, [range, signal]);

  return (
    <div className="p-8 space-y-6">
      <h1 className="text-3xl font-bold">
        Bluetooth ↔ BehaviorSession Correlation
      </h1>

      {/* Filters */}
      <div className="flex gap-4">
        <select
          value={range}
          onChange={(e) => setRange(e.target.value)}
          className="p-2 rounded bg-black/20 border border-white/10"
        >
          <option value="24h">Last 24 Hours</option>
          <option value="7d">Last 7 Days</option>
          <option value="30d">Last 30 Days</option>
        </select>

        <select
          value={signal}
          onChange={(e) => setSignal(e.target.value)}
          className="p-2 rounded bg-black/20 border border-white/10"
        >
          <option value="good">Good Signal</option>
          <option value="medium">Medium Signal</option>
          <option value="weak">Weak Signal</option>
        </select>
      </div>

      {/* Loading */}
      {loading && (
        <div className="p-6 rounded-xl bg-white/5 animate-pulse">
          <p className="text-gray-300">Loading correlation data…</p>
        </div>
      )}

      {/* Empty */}
      {!loading && rows.length === 0 && (
        <div className="p-6 rounded-xl bg-white/5">
          <p className="text-gray-400">No correlation data available.</p>
        </div>
      )}

      {/* Table */}
      {!loading && rows.length > 0 && (
        <div className="p-6 rounded-xl bg-white/5">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="text-left border-b border-white/10">
                <th className="py-2 pr-4">Behavior Session</th>
                <th className="py-2 pr-4">Bluetooth Events</th>
                <th className="py-2 pr-4">Avg Signal</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.sessionId} className="border-b border-white/5">
                  <td className="py-2 pr-4">{r.sessionId}</td>
                  <td className="py-2 pr-4">{r.bluetoothEvents}</td>
                  <td className="py-2 pr-4">
                    {Number(r.avgSignalStrength).toFixed(1)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
