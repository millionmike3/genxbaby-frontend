"use client";

import { Group } from "@visx/group";
import { LinePath } from "@visx/shape";
import { Circle } from "@visx/shape";
import { scaleLinear } from "@visx/scale";
import { curveMonotoneX } from "@visx/curve";

export default function PortfolioBehavioralMap({
  data,
}: {
  data: {
    borrowerId: string;
    timestamp: Date;
    fraud: number;
    risk: number;
    impulsiveness: number;
  }[];
}) {
  const width = 700;
  const height = 350;

  // Group by borrower
  const grouped = data.reduce((acc, d) => {
    if (!acc[d.borrowerId]) acc[d.borrowerId] = [];
    acc[d.borrowerId].push(d);
    return acc;
  }, {} as Record<string, typeof data>);

  // Sort each borrower’s timeline
  Object.values(grouped).forEach((arr) =>
    arr.sort((a, b) => a.timestamp.getTime() - b.timestamp.getTime())
  );

  const maxScore = Math.max(
    ...data.map((d) => Math.max(d.fraud, d.risk, d.impulsiveness))
  );

  const xScale = scaleLinear({
    domain: [0, 10], // assume max 10 timeline points
    range: [40, width - 40],
  });

  const yScale = scaleLinear({
    domain: [0, maxScore],
    range: [height - 40, 40],
  });

  const colors = ["#4EE38A", "#FACC15", "#FB923C", "#EF4444", "#3B82F6"];

  return (
    <div className="border border-slate-800 bg-slate-900 rounded-lg p-6">
      <h2 className="text-lg font-semibold text-[#4EE38A] mb-4">
        Portfolio Behavioral Map
      </h2>

      <svg width={width} height={height}>
        <Group>
          {Object.entries(grouped).map(([borrowerId, points], idx) => {
            const color = colors[idx % colors.length];

            return (
              <Group key={borrowerId}>
                <LinePath
                  data={points}
                  x={(_, i) => xScale(i)}
                  y={(d) => yScale((d.fraud + d.risk + d.impulsiveness) / 3)}
                  stroke={color}
                  strokeWidth={2}
                  curve={curveMonotoneX}
                  opacity={0.7}
                />

                {points.map((p, i) => (
                  <Circle
                    key={i}
                    cx={xScale(i)}
                    cy={yScale((p.fraud + p.risk + p.impulsiveness) / 3)}
                    r={4}
                    fill={color}
                    opacity={0.9}
                  />
                ))}
              </Group>
            );
          })}
        </Group>
      </svg>

      <p className="text-slate-400 text-xs mt-3">
        Each line represents a borrower’s behavioral trajectory over time.
      </p>
    </div>
  );
}
