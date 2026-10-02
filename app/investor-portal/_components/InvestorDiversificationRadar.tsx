"use client";

import {
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  Tooltip,
} from "recharts";

export function InvestorDiversificationRadar({ data }: { data: any[] }) {
  return (
    <div className="bg-slate-800/60 rounded-xl p-6 border border-slate-700">
      <h2 className="text-xl font-semibold mb-4">Diversification Radar</h2>

      <div className="h-96">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart data={data}>
            <PolarGrid stroke="#475569" />
            <PolarAngleAxis dataKey="factor" stroke="#94a3b8" />
            <PolarRadiusAxis angle={30} stroke="#94a3b8" domain={[0, 1]} />
            <Tooltip />

            <Radar
              name="Diversification"
              dataKey="value"
              stroke="#4EE38A"
              fill="#4EE38A"
              fillOpacity={0.4}
            />
          </RadarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
