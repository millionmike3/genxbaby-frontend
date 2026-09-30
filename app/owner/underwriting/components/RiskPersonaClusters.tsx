"use client";

import { genxTheme } from "../visxTheme";
import { Group } from "@visx/group";
import { Circle } from "@visx/shape";
import { scaleLinear } from "@visx/scale";

const clusterColors = ["#4EE38A", "#FACC15", "#FB923C"]; // neon, yellow, orange

export default function RiskPersonaClusters({
  data,
  assignments,
}: {
  data: { fraud: number; risk: number; impulsiveness: number }[];
  assignments: number[];
}) {
  const width = 600;
  const height = 300;

  const xScale = scaleLinear({
    domain: [0, Math.max(...data.map((d) => d.risk))],
    range: [0, width],
  });

  const yScale = scaleLinear({
    domain: [0, Math.max(...data.map((d) => d.fraud))],
    range: [height, 0],
  });

  return (
    <div className="border border-slate-800 bg-slate-900 rounded-lg p-6">
      <h2 className="text-lg font-semibold text-[#4EE38A] mb-4">
        Borrower Risk Persona Clusters (K‑Means)
      </h2>

      <svg width={width} height={height}>
        <Group>
          {data.map((d, i) => (
            <Circle
              key={i}
              cx={xScale(d.risk)}
              cy={yScale(d.fraud)}
              r={6}
              fill={clusterColors[assignments[i]]}
              opacity={0.85}
            />
          ))}
        </Group>
      </svg>

      <p className="text-slate-400 text-xs mt-3">
        X = Risk Score, Y = Fraud Score, Color = Persona Cluster
      </p>
    </div>
  );
}
