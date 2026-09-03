"use client";

import { useEffect, useState } from "react";

interface CrossEngineRow {
  sessionId: string;
  bluetoothEvents: number;
  behaviorScore: number;
  correlation: number;
}

export default function CrossEngineBluetoothPage() {
  const [rows, setRows] = useState<CrossEngineRow[]>([]);
  const [range, setRange] = useState("24h");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);

    fetch(`/api/bluetooth/cross?range=${range}`)
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
        console.error("Cross-engine fetch error:", err);
        setRows([]);
        setLoading(false);
      });
  }, [range]);

  return (
    <div className="p-8 space-y-8">
      <h1 className="text-3xl font-bold">
        Cross‑Engine Bluetooth ↔ Behavior Intelligence
      </h1>

      {/* Range Filter */}
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
      </div>

      {/* Loading */}
      {loading && (
        <div className="p-6 rounded-xl bg-white/5 animate-pulse">
          <p className="text-gray-300">Loading cross‑engine correlation…</p>
        </div>
      )}

      {/* Empty */}
      {!loading && rows.length === 0 && (
        <div className="p-6 rounded-xl bg-white/5">
          <p className="text-gray-400">No cross‑engine data available.</p>
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
                <th className="py-2 pr-4">Behavior Score</th>
                <th className="py-2 pr-4">Correlation</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.sessionId} className="border-b border-white/5">
                  <td className="py-2 pr-4">{r.sessionId}</td>
                  <td className="py-2 pr-4">{r.bluetoothEvents}</td>
                  <td className="py-2 pr-4">{r.behaviorScore.toFixed(2)}</td>
                  <td className="py-2 pr-4">
                    {(r.correlation * 100).toFixed(1)}%
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
