"use client";

import { useEffect, useState } from "react";

interface BluetoothSummaryRow {
  deviceId: string | null;
  totalEvents: number;
  avgSignal: number;
  lastSeen: string;
}

export default function BluetoothSummaryPage() {
  const [rows, setRows] = useState<BluetoothSummaryRow[]>([]);
  const [range, setRange] = useState("24h");
  const [type, setType] = useState("all");
  const [signal, setSignal] = useState("good");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);

    fetch(`/api/bluetooth/summary?range=${range}&type=${type}&signal=${signal}`)
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
        console.error("Bluetooth summary fetch error:", err);
        setRows([]);
        setLoading(false);
      });
  }, [range, type, signal]);

  return (
    <div className="p-8 space-y-8">
      <h1 className="text-3xl font-bold">Bluetooth Summary Dashboard</h1>

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
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="p-2 rounded bg-black/20 border border-white/10"
        >
          <option value="all">All Devices</option>
          <option value="known">Known Devices</option>
          <option value="unknown">Unknown Devices</option>
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
          <p className="text-gray-300">Loading Bluetooth summary…</p>
        </div>
      )}

      {/* Empty */}
      {!loading && rows.length === 0 && (
        <div className="p-6 rounded-xl bg-white/5">
          <p className="text-gray-400">No Bluetooth summary data available.</p>
        </div>
      )}

      {/* Table */}
      {!loading && rows.length > 0 && (
        <div className="p-6 rounded-xl bg-white/5">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="text-left border-b border-white/10">
                <th className="py-2 pr-4">Device ID</th>
                <th className="py-2 pr-4">Total Events</th>
                <th className="py-2 pr-4">Avg Signal</th>
                <th className="py-2 pr-4">Last Seen</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r, idx) => (
                <tr key={idx} className="border-b border-white/5">
                  <td className="py-2 pr-4">{r.deviceId || "Unknown"}</td>
                  <td className="py-2 pr-4">{r.totalEvents}</td>
                  <td className="py-2 pr-4">{Number(r.avgSignal).toFixed(1)}</td>
                  <td className="py-2 pr-4">{r.lastSeen}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
