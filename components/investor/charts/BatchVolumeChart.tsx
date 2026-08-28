"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from "recharts";

// Define the shape of each data point
interface BatchVolumePoint {
  date: string;
  volume: number;
}

// Define props for the chart
interface BatchVolumeChartProps {
  data: BatchVolumePoint[];
}

export default function BatchVolumeChart({ data }: BatchVolumeChartProps) {
  return (
    <div className="gx-card p-4">
      <h3 className="text-lg font-semibold mb-4">Anchored Volume Over Time</h3>

      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <XAxis dataKey="date" stroke="#888" />
            <YAxis stroke="#888" />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="volume"
              stroke="#3CF46B"
              strokeWidth={3}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
