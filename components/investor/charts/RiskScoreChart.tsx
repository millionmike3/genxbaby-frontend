"use client";
"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from "recharts";

// Shape of each risk score data point
interface RiskScorePoint {
  riskScore: number | string | null;
  _count: {
    riskScore: number;
  };
}

// Props for the chart
interface RiskScoreChartProps {
  data: RiskScorePoint[];
}

export default function RiskScoreChart({ data }: RiskScoreChartProps) {
  // Format data for Recharts
  const formatted = data.map((d) => ({
    riskScore: d.riskScore ?? "N/A",
    count: d._count.riskScore
  }));

  return (
    <div className="gx-card p-4">
      <h3 className="text-lg font-semibold mb-4">Risk Score Distribution</h3>

      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={formatted}>
            <XAxis dataKey="riskScore" stroke="#888" />
            <YAxis stroke="#888" />
            <Tooltip />
            <Bar dataKey="count" fill="#FFB84F" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
