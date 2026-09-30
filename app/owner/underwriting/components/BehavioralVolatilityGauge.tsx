"use client";

import { Arc } from "@visx/shape";
import { Group } from "@visx/group";

export default function BehavioralVolatilityGauge({ score }: { score: number }) {
  const width = 260;
  const height = 160;
  const radius = 70;

  const angle = (score / 100) * Math.PI; // 0–180 degrees

  const color =
    score > 75 ? "#4EE38A" : score > 50 ? "#FACC15" : score > 30 ? "#FB923C" : "#EF4444";

  return (
    <div className="border border-slate-800 bg-slate-900 rounded-lg p-6">
      <h2 className="text-lg font-semibold text-[#4EE38A] mb-4">
        Behavioral Volatility Index (Portfolio Stability)
      </h2>

      <svg width={width} height={height}>
        <Group top={height - 20} left={width / 2}>
          <Arc
            startAngle={Math.PI}
            endAngle={0}
            innerRadius={radius - 10}
            outerRadius={radius}
            fill="#1e293b"
          />

          <Arc
            startAngle={Math.PI}
            endAngle={Math.PI - angle}
            innerRadius={radius - 10}
            outerRadius={radius}
            fill={color}
          />
        </Group>

        <text
          x={width / 2}
          y={height / 2 - 10}
          fill={color}
          fontSize={32}
          fontWeight="bold"
          textAnchor="middle"
        >
          {score}
        </text>

        <text
          x={width / 2}
          y={height / 2 + 20}
          fill="#94a3b8"
          fontSize={12}
          textAnchor="middle"
        >
          Stability Score (0–100)
        </text>
      </svg>
    </div>
  );
}
