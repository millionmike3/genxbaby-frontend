"use client";

import { genxTheme } from "../visxTheme";
import { AreaClosed, LinePath } from "@visx/shape";
import { curveMonotoneX } from "d3-shape";

import { Group } from "@visx/group";
import { AxisLeft, AxisBottom } from "@visx/axis";

// ⭐ THIS WAS MISSING — this is why your build crashed
import { scaleTime, scaleLinear } from "@visx/scale";

export default function ApplicationVelocityChart({
  data,
}: {
  data: { date: Date; count: number }[];
}) {
  const width = 600;
  const height = 250;
  const margin = { top: 20, right: 20, bottom: 30, left: 40 };

  const xScale = scaleTime({
    domain: [
      Math.min(...data.map((d) => d.date)),
      Math.max(...data.map((d) => d.date)),
    ],
    range: [margin.left, width - margin.right],
  });

  const yScale = scaleLinear({
    domain: [0, Math.max(...data.map((d) => d.count))],
    range: [height - margin.bottom, margin.top],
  });

  return (
    <div className="border border-slate-800 bg-slate-900 rounded-lg p-6">
      <h2 className="text-lg font-semibold text-[#4EE38A] mb-4">
        Application Velocity (Daily Volume)
      </h2>

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

          <AreaClosed
            data={data}
            x={(d) => xScale(d.date)}
            y={(d) => yScale(d.count)}
            yScale={yScale}
            stroke={genxTheme.neon}
            fill={genxTheme.neon}
            fillOpacity={0.25}
            curve={curveMonotoneX}
          />

          <LinePath
            data={data}
            x={(d) => xScale(d.date)}
            y={(d) => yScale(d.count)}
            stroke={genxTheme.neon}
            strokeWidth={3}
            curve={curveMonotoneX}
          />
        </Group>
      </svg>
    </div>
  );
}
