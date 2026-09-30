"use client";

import { genxTheme } from "../visxTheme";
import { HeatmapRect } from "@visx/heatmap";
import { scaleLinear, scaleBand } from "@visx/scale";
import { Group } from "@visx/group";

export default function FraudRiskHeatmap({
  data,
}: {
  data: { day: string; fraud: number; risk: number }[];
}) {
  const width = 600;
  const height = 260;
  const margin = { top: 20, right: 20, bottom: 40, left: 60 };

  // Convert data into heatmap matrix
  const fraudRow = {
    label: "Fraud",
    bins: data.map((d) => ({ day: d.day, value: d.fraud })),
  };

  const riskRow = {
    label: "Risk",
    bins: data.map((d) => ({ day: d.day, value: d.risk })),
  };

  const rows = [fraudRow, riskRow];

  const xScale = scaleBand({
    domain: data.map((d) => d.day),
    range: [margin.left, width - margin.right],
    padding: 0.1,
  });

  const yScale = scaleBand({
    domain: ["Fraud", "Risk"],
    range: [margin.top, height - margin.bottom],
    padding: 0.2,
  });

  const colorScale = scaleLinear({
    domain: [0, 50, 80, 100],
    range: ["#4EE38A", "#FACC15", "#FB923C", "#EF4444"], // neon → yellow → orange → red
  });

  return (
    <div className="border border-slate-800 bg-slate-900 rounded-lg p-6">
      <h2 className="text-lg font-semibold text-[#4EE38A] mb-4">
        Fraud / Risk Heatmap
      </h2>

      <svg width={width} height={height}>
        <Group>
          {rows.map((row) => (
            <Group key={row.label}>
              {row.bins.map((bin) => (
                <rect
                  key={`${row.label}-${bin.day}`}
                  x={xScale(bin.day)}
                  y={yScale(row.label)}
                  width={xScale.bandwidth()}
                  height={yScale.bandwidth()}
                  fill={colorScale(bin.value)}
                  stroke={genxTheme.border}
                  strokeWidth={1}
                  rx={4}
                />
              ))}

              {/* Row Labels */}
              <text
                x={margin.left - 10}
                y={yScale(row.label)! + yScale.bandwidth() / 2}
                fill={genxTheme.slate}
                fontSize={12}
                textAnchor="end"
                alignmentBaseline="middle"
              >
                {row.label}
              </text>
            </Group>
          ))}

          {/* X-axis labels */}
          {data.map((d) => (
            <text
              key={`label-${d.day}`}
              x={xScale(d.day)! + xScale.bandwidth() / 2}
              y={height - 10}
              fill={genxTheme.slate}
              fontSize={10}
              textAnchor="middle"
            >
              {d.day}
            </text>
          ))}
        </Group>
      </svg>
    </div>
  );
}
