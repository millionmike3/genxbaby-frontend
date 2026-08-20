"use client";

import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

export default function BatchVolumeChart({ data }) {
  return (
    <div className="gx-card p-4">
      <h3 className="text-lg font-semibold mb-4">Anchored Volume Over Time</h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="count" stroke="#00ccff" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
