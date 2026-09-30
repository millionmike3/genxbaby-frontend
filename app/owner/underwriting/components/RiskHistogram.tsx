"use client";

import { genxTheme } from "../visxTheme";
import { Group } from "@visx/group";
import { Bar } from "@visx/shape";
import { scaleLinear, scaleBand } from "@visx/scale";

export default function RiskHistogram({ scores }: { scores: number[] }) {
  const width = 600;
  const height = 250;

  const bins = Array.from({ length: 10 }, (_, i) => ({
    range: `${i * 10}-${i * 10 + 10}`,
    count: scores.filter((s) => s >= i * 10 && s < i * 10 + 10).length,
  }));

  const xScale = scaleBand({
    domain: bins.map((b) => b.range),
    range: [0, width],
    padding: 0.2,
  });

  const yScale = scaleLinear({
    domain: [0, Math.max(...bins.map((b) => b.count))],
    range: [height, 0],
  });

  return (
    <div className="border border-slate-800 bg-slate-900 rounded-lg p-6">
      <h2 className="text-lg font-semibold text-[#4EE38A] mb-4">Risk Distribution</h2>

      <svg width={width} height={height}>
        <Group>
          {bins.map((b) => (
            <Bar
              key={b.range}
              x={xScale(b.range)}
              y={yScale(b.count)}
              width={xScale.bandwidth()}
              height={height - yScale(b.count)}
              fill={genxTheme.neon}
            />
          ))}
        </Group>
      </svg>
    </div>
  );
}
