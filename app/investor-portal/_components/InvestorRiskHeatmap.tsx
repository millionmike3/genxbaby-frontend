"use client";

import {
  ResponsiveContainer,
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  ZAxis,
  Tooltip,
  Cell,
} from "recharts";

export function InvestorRiskHeatmap({ data }: { data: any[] }) {
  return (
    <div className="bg-slate-800/60 rounded-xl p-6 border border-slate-700">
      <h2 className="text-xl font-semibold mb-4">Risk Factor Heatmap</h2>

      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <ScatterChart>
            <XAxis
              type="category"
              dataKey="factor"
              stroke="#94a3b8"
              tick={{ fill: "#94a3b8" }}
            />
            <YAxis
              type="number"
              dataKey="index"
              stroke="#94a3b8"
              tick={{ fill: "#94a3b8" }}
              domain={[0, 1]}
            />
            <ZAxis type="number" dataKey="value" range={[50, 400]} />
            <Tooltip />

            <Scatter data={data}>
              {data.map((entry, i) => {
                const intensity = entry.value;
                const color =
                  intensity > 0.75
                    ? "#ef4444"
                    : intensity > 0.5
                    ? "#f59e0b"
                    : intensity > 0.25
                    ? "#4EE38A"
                    : "#38bdf8";

                return <Cell key={i} fill={color} />;
              })}
            </Scatter>
          </ScatterChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
