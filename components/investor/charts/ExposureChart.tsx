"use client";

import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

export default function ExposureChart({ data }) {
  return (
    <div className="gx-card p-4">
      <h3 className="text-lg font-semibold mb-4">Investor Exposure Over Time</h3>
      <ResponsiveContainer width="100%" height={300}>
        <AreaChart data={data}>
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Area
            type="monotone"
            dataKey="amount"
            stroke="#ff00aa"
            fill="#ff00aa33"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
