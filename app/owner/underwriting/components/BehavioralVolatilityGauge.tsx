"use client";

import { Arc } from "@visx/shape";
import { Group } from "@visx/group";

export default function BehavioralVolatilityGauge({ score }: { score: number }) {
  const width = 260;
  const height = 160;
  const radius = 70;

  // Normalize score
  const safeScore = Number(score);
  const clamped = Math.max(0, Math.min(100, safeScore));

  // Arc color
  const color =
    clamped > 75 ? "#4EE38A" :
    clamped > 50 ? "#FACC15" :
    clamped > 30 ? "#FB923C" :
    "#EF4444";

  // Arc angle (0–180 degrees)
  const angle = (clamped / 100) * Math.PI;

  return (
    <svg width={width} height={height}>
      <Group top={height - 20} left={width / 2}>
        {/* Background arc */}
        <Arc
          startAngle={Math.PI}
          endAngle={0}
          innerRadius={radius - 10}
          outerRadius={radius}
          fill="#1e293b"
        />

        {/* Active arc */}
        <Arc
          startAngle={Math.PI}
          endAngle={Math.PI - angle}
          innerRadius={radius - 10}
          outerRadius={radius}
          fill={color}
        />
      </Group>

      {/* Score number */}
      <text
        x={width / 2}
        y={height / 2 - 10}
        fill={color}
        fontSize={32}
        fontWeight="bold"
        textAnchor="middle"
      >
        {clamped}
      </text>
    </svg>
  );
}
