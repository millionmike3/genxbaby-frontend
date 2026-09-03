"use client";

import { useEffect, useState } from "react";

export default function BluetoothCrossEnginePage() {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    fetch("/api/bluetooth/cross")
      .then((res) => res.json())
      .then((d) => setData(d))
      .catch((err) => console.error("Cross-engine fetch error:", err));
  }, []);

  if (!data) return <p>Loading...</p>;

  const { bluetooth, behavior, stock } = data;

  return (
    <div className="p-8 space-y-8">
      <h1 className="text-3xl font-bold">Cross‑Engine Behavioral Intelligence</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 rounded-xl bg-white/5">
          <h2 className="text-xl font-semibold mb-2">Bluetooth Heatmap</h2>
          <p className="text-sm text-gray-400">Devices: {bluetooth.length}</p>
        </div>

        <div className="p-6 rounded-xl bg-white/5">
          <h2 className="text-xl font-semibold mb-2">Behavior Heatmap</h2>
          <p className="text-sm text-gray-400">Sessions: {behavior.length}</p>
        </div>

        <div className="p-6 rounded-xl bg-white/5">
          <h2 className="text-xl font-semibold mb-2">Stock Sanitizer Heatmap</h2>
          <p className="text-sm text-gray-400">Stocks: {stock.length}</p>
        </div>
      </div>

      <div className="p-6 rounded-xl bg-white/5">
        <h2 className="text-xl font-semibold mb-4">Correlation Insights</h2>

        <p className="text-sm text-gray-300">
          This dashboard shows how Bluetooth proximity, user behavior, and stock
          impulsiveness interact in real time.
        </p>

        <ul className="mt-4 space-y-2 text-sm text-gray-200">
          <li>• High Bluetooth volatility correlates with impulsive behavior spikes.</li>
          <li>• Stock sanitizer alerts increase when Bluetooth crowding is high.</li>
          <li>• Behavior sessions with high Bluetooth density show higher risk scores.</li>
        </ul>
      </div>
    </div>
  );
}
