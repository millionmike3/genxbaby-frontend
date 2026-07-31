"use client";

import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

export default function RiskScoreChart({ data }) {
  const formatted = data.map((d) => ({
    riskScore: d.riskScore ?? "N/A",
    count: d._count.riskScore
  }));

  return (
    <div className="gx-card p-4">
      <h3 className="text-lg font-semibold mb-4">Risk Score Distribution</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={formatted}>
          <XAxis dataKey="riskScore" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="count" fill="#00ff99" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
