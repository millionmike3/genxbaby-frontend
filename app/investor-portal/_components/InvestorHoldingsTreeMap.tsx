"use client";

import {
  ResponsiveContainer,
  Treemap,
  Tooltip,
} from "recharts";

export function InvestorHoldingsTreeMap({ data }: { data: any[] }) {
  return (
    <div className="bg-slate-800/60 rounded-xl p-6 border border-slate-700">
      <h2 className="text-xl font-semibold mb-4">Holdings Allocation TreeMap</h2>

      <div className="h-96">
        <ResponsiveContainer width="100%" height="100%">
          <Treemap
            data={data}
            dataKey="value"
            nameKey="name"
            stroke="#1e293b"
            fill="#4EE38A"
          >
            <Tooltip />
          </Treemap>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
