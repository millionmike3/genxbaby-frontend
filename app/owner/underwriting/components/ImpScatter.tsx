"use client";

import { genxTheme } from "../visxTheme";
import { Group } from "@visx/group";
import { Circle } from "@visx/shape";
import { scaleLinear } from "@visx/scale";

export default function ImpScatter({
  data,
}: {
  data: { risk: number; impulsiveness: number }[];
}) {
  const width = 600;
  const height = 250;

  const xScale = scaleLinear({
    domain: [0, Math.max(...data.map((d) => d.risk))],
    range: [0, width],
  });

  const yScale = scaleLinear({
    domain: [0, Math.max(...data.map((d) => d.impulsiveness))],
    range: [height, 0],
  });

  return (
    <div className="border border-slate-800 bg-slate-900 rounded-lg p-6">
      <h2 className="text-lg font-semibold text-[#4EE38A] mb-4">Impulsiveness Scatter Plot</h2>

      <svg width={width} height={height}>
        <Group>
          {data.map((d, i) => (
            <Circle
              key={i}
              cx={xScale(d.risk)}
              cy={yScale(d.impulsiveness)}
              r={5}
              fill={genxTheme.neon}
              opacity={0.8}
            />
          ))}
        </Group>
      </svg>
    </div>
  );
}
