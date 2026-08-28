"use client";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from "recharts";

// Define the shape of each data point
interface ExposurePoint {
  date: string;
  exposure: number;
}

// Define props for the chart
interface ExposureChartProps {
  data: ExposurePoint[];
}

export default function ExposureChart({ data }: ExposureChartProps) {
  return (
    <div className="gx-card p-4">
      <h3 className="text-lg font-semibold mb-4">Investor Exposure Over Time</h3>

      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <XAxis dataKey="date" stroke="#888" />
            <YAxis stroke="#888" />
            <Tooltip />
            <Area
              type="monotone"
              dataKey="exposure"
              stroke="#4FB6FF"
              fill="#4FB6FF"
              fillOpacity={0.25}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
