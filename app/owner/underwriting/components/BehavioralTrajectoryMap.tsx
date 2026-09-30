"use client";

import { genxTheme } from "../visxTheme";
import { Group } from "@visx/group";
import { LinePath, Circle } from "@visx/shape";
import { scaleLinear } from "@visx/scale";
import { curveMonotoneX } from "@visx/curve";

export default function BehavioralTrajectoryMap({
  data,
}: {
  data: {
    timestamp: Date;
    fraud: number;
    risk: number;
    impulsiveness: number;
  }[];
}) {
  const width = 600;
  const height = 300;

  // Normalize timeline
  const sorted = [...data].sort(
    (a, b) => a.timestamp.getTime() - b.timestamp.getTime()
  );

  const xScale = scaleLinear({
    domain: [0, sorted.length - 1],
    range: [40, width - 40],
  });

  const yScale = scaleLinear({
    domain: [
      0,
      Math.max(
        ...sorted.map((d) => Math.max(d.fraud, d.risk, d.impulsiveness))
      ),
    ],
    range: [height - 40, 40],
  });

  const severityColor = (value: number) => {
    if (value < 30) return genxTheme.neon; // stable
    if (value < 60) return "#FACC15"; // yellow
    if (value < 80) return "#FB923C"; // orange
    return "#EF4444"; // red
  };

  return (
    <div className="border border-slate-800 bg-slate-900 rounded-lg p-6">
      <h2 className="text-lg font-semibold text-[#4EE38A] mb-4">
        Borrower Behavioral Trajectory
      </h2>

      <svg width={width} height={height}>
        <Group>
          {/* FRAUD PATH */}
          <LinePath
            data={sorted}
            x={(_, i) => xScale(i)}
            y={(d) => yScale(d.fraud)}
            stroke="#EF4444"
            strokeWidth={3}
            curve={curveMonotoneX}
            opacity={0.8}
          />

          {/* RISK PATH */}
          <LinePath
            data={sorted}
            x={(_, i) => xScale(i)}
            y={(d) => yScale(d.risk)}
            stroke="#FACC15"
            strokeWidth={3}
            curve={curveMonotoneX}
            opacity={0.8}
          />

          {/* IMPULSIVENESS PATH */}
          <LinePath
            data={sorted}
            x={(_, i) => xScale(i)}
            y={(d) => yScale(d.impulsiveness)}
            stroke="#4EE38A"
            strokeWidth={3}
            curve={curveMonotoneX}
            opacity={0.8}
          />

          {/* Points */}
          {sorted.map((d, i) => (
            <Circle
              key={i}
              cx={xScale(i)}
              cy={yScale(d.fraud)}
              r={5}
              fill={severityColor(d.fraud)}
              opacity={0.9}
            />
          ))}

          {sorted.map((d, i) => (
            <Circle
              key={`risk-${i}`}
              cx={xScale(i)}
              cy={yScale(d.risk)}
              r={5}
              fill={severityColor(d.risk)}
              opacity={0.9}
            />
          ))}

          {sorted.map((d, i) => (
            <Circle
              key={`imp-${i}`}
              cx={xScale(i)}
              cy={yScale(d.impulsiveness)}
              r={5}
              fill={severityColor(d.impulsiveness)}
              opacity={0.9}
            />
          ))}
        </Group>
      </svg>

      <p className="text-slate-400 text-xs mt-3">
        Tracks borrower behavior over time across Fraud, Risk, and Impulsiveness.
      </p>
    </div>
  );
}
