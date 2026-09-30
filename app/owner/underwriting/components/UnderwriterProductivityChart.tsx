"use client";

import { genxTheme } from "../visxTheme";
import { Group } from "@visx/group";
import { Bar, LinePath } from "@visx/shape";
import { scaleLinear, scaleBand } from "@visx/scale";
import { AxisLeft, AxisBottom } from "@visx/axis";
import { curveMonotoneX } from "@visx/curve";

export default function UnderwriterProductivityChart({
  data,
}: {
  data: {
    day: string;
    decisions: number;
    avgDecisionTime: number;
  }[];
}) {
  const width = 600;
  const height = 300;
  const margin = { top: 20, right: 20, bottom: 40, left: 50 };

  const xScale = scaleBand({
    domain: data.map((d) => d.day),
    range: [margin.left, width - margin.right],
    padding: 0.2,
  });

  const yScale = scaleLinear({
    domain: [0, Math.max(...data.map((d) => d.decisions))],
    range: [height - margin.bottom, margin.top],
  });

  const timeScale = scaleLinear({
    domain: [0, Math.max(...data.map((d) => d.avgDecisionTime))],
    range: [height - margin.bottom, margin.top],
  });

  return (
    <div className="border border-slate-800 bg-slate-900 rounded-lg p-6">
      <h2 className="text-lg font-semibold text-[#4EE38A] mb-4">
        Underwriter Productivity Metrics
      </h2>

      <svg width={width} height={height}>
        <Group>
          {/* Decisions per day (bars) */}
          {data.map((d) => (
            <Bar
              key={d.day}
              x={xScale(d.day)}
              y={yScale(d.decisions)}
              width={xScale.bandwidth()}
              height={height - margin.bottom - yScale(d.decisions)}
              fill={genxTheme.neon}
              opacity={0.85}
            />
          ))}

          {/* Average decision time (line) */}
          <LinePath
            data={data}
            x={(d) => xScale(d.day)! + xScale.bandwidth() / 2}
            y={(d) => timeScale(d.avgDecisionTime)}
            stroke="#FACC15"
            strokeWidth={3}
            curve={curveMonotoneX}
          />

          {/* Y-axis (decisions) */}
          <AxisLeft
            scale={yScale}
            stroke={genxTheme.slate}
            tickStroke={genxTheme.slate}
            tickLabelProps={() => ({ fill: genxTheme.slate, fontSize: 10 })}
          />

          {/* X-axis (days) */}
          <AxisBottom
            scale={xScale}
            top={height - margin.bottom}
            stroke={genxTheme.slate}
            tickStroke={genxTheme.slate}
            tickLabelProps={() => ({ fill: genxTheme.slate, fontSize: 10 })}
          />
        </Group>
      </svg>

      <p className="text-slate-400 text-xs mt-3">
        Bars = Decisions per day, Line = Avg decision time (minutes)
      </p>
    </div>
  );
}
