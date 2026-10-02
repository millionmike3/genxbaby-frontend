"use client";

import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

export function InvestorBenchmarkChart({ data }: { data: any[] }) {
  return (
    <div className="bg-slate-800/60 rounded-xl p-6 border border-slate-700">
      <h2 className="text-xl font-semibold mb-4">Performance vs Benchmarks</h2>

      <div className="h-96">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid stroke="#475569" strokeDasharray="3 3" />
            <XAxis dataKey="label" stroke="#94a3b8" />
            <YAxis stroke="#94a3b8" />
            <Tooltip />

            <Line
              type="monotone"
              dataKey="portfolio"
              stroke="#4EE38A"
              strokeWidth={2}
              name="Your Portfolio"
            />

            <Line
              type="monotone"
              dataKey="sp500"
              stroke="#38bdf8"
              strokeWidth={2}
              name="S&P 500"
            />

            <Line
              type="monotone"
              dataKey="reit"
              stroke="#f472b6"
              strokeWidth={2}
              name="REIT Index"
            />

            <Line
              type="monotone"
              dataKey="bond"
              stroke="#facc15"
              strokeWidth={2}
              name="Bond Index"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
