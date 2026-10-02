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

export function InvestorTransactionsTimeline({ data }: { data: any[] }) {
  return (
    <div className="bg-slate-800/60 rounded-xl p-6 border border-slate-700">
      <h2 className="text-xl font-semibold mb-4">Transactions Timeline</h2>

      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid stroke="#475569" strokeDasharray="3 3" />
            <XAxis dataKey="label" stroke="#94a3b8" />
            <YAxis stroke="#94a3b8" />
            <Tooltip />

            <Line
              type="monotone"
              dataKey="amount"
              stroke="#4EE38A"
              strokeWidth={2}
              name="Amount"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
