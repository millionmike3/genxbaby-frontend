"use client";

import { genxTheme } from "../visxTheme";
import { LinePath, curveMonotoneX } from "@visx/shape";
import { scaleLinear, scaleTime } from "@visx/scale";
import { Group } from "@visx/group";
import { AxisLeft, AxisBottom } from "@visx/axis";

export default function FraudTrendChart({ data }: { data: { date: Date; score: number }[] }) {
  const width = 600;
  const height = 250;
  const margin = { top: 20, right: 20, bottom: 30, left: 40 };

  const xScale = scaleTime({
    domain: [Math.min(...data.map((d) => d.date)), Math.max(...data.map((d) => d.date))],
    range: [margin.left, width - margin.right],
  });

  const yScale = scaleLinear({
    domain: [0, Math.max(...data.map((d) => d.score))],
    range: [height - margin.bottom, margin.top],
  });

  return (
    <div className="border border-slate-800 bg-slate-900 rounded-lg p-6">
      <h2 className="text-lg font-semibold text-[#4EE38A] mb-4">Fraud Trend (7‑Day Rolling)</h2>

      <svg width={width} height={height}>
        <Group>
          <AxisLeft
            scale={yScale}
            stroke={genxTheme.slate}
            tickStroke={genxTheme.slate}
            tickLabelProps={() => ({ fill: genxTheme.slate, fontSize: 10 })}
          />

          <AxisBottom
            scale={xScale}
            top={height - margin.bottom}
            stroke={genxTheme.slate}
            tickStroke={genxTheme.slate}
            tickLabelProps={() => ({ fill: genxTheme.slate, fontSize: 10 })}
          />

          <LinePath
            data={data}
            x={(d) => xScale(d.date)}
            y={(d) => yScale(d.score)}
            stroke={genxTheme.neon}
            strokeWidth={3}
            curve={curveMonotoneX}
          />
        </Group>
      </svg>
    </div>
  );
}
