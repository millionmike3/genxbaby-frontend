"use client";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

export function InvestorLiquidityStressChart({ data }: { data: any[] }) {
  return (
    <div className="bg-slate-800/60 rounded-xl p-6 border border-slate-700">
      <h2 className="text-xl font-semibold mb-4">Liquidity Stress Test</h2>

      <div className="h-96">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid stroke="#475569" strokeDasharray="3 3" />
            <XAxis dataKey="scenario" stroke="#94a3b8" />
            <YAxis stroke="#94a3b8" />
            <Tooltip />

            <Bar dataKey="liquid" fill="#4EE38A" name="Liquid (0–30d)" />
            <Bar dataKey="shortTerm" fill="#38bdf8" name="Short-Term (30–90d)" />
            <Bar dataKey="midTerm" fill="#f472b6" name="Mid-Term (90–180d)" />
            <Bar dataKey="longTerm" fill="#facc15" name="Long-Term (180d+)" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
