"use client";

import { genxTheme } from "../visxTheme";
import { Group } from "@visx/group";
import { Text } from "@visx/text";

export default function PipelineFunnelChart({
  data,
}: {
  data: {
    submitted: number;
    inReview: number;
    returned: number;
    approved: number;
    denied: number;
  };
}) {
  const width = 600;
  const height = 300;

  // Funnel levels (top → bottom)
  const levels = [
    { label: "Submitted", value: data.submitted, color: "#4EE38A" },
    { label: "In Review", value: data.inReview, color: "#3BCB74" },
    { label: "Returned", value: data.returned, color: "#F59E0B" },
    { label: "Approved", value: data.approved, color: "#22C55E" },
    { label: "Denied", value: data.denied, color: "#EF4444" },
  ];

  const maxVal = Math.max(...levels.map((l) => l.value));

  const segmentHeight = height / levels.length;

  return (
    <div className="border border-slate-800 bg-slate-900 rounded-lg p-6">
      <h2 className="text-lg font-semibold text-[#4EE38A] mb-4">
        Underwriting Pipeline Funnel
      </h2>

      <svg width={width} height={height}>
        <Group>
          {levels.map((lvl, i) => {
            const topWidth = (lvl.value / maxVal) * width;
            const bottomWidth =
              i < levels.length - 1
                ? (levels[i + 1].value / maxVal) * width
                : 0;

            const y = i * segmentHeight;

            return (
              <Group key={lvl.label}>
                {/* Funnel segment */}
                <polygon
                  points={`
                    ${(width - topWidth) / 2},${y}
                    ${(width + topWidth) / 2},${y}
                    ${(width + bottomWidth) / 2},${y + segmentHeight}
                    ${(width - bottomWidth) / 2},${y + segmentHeight}
                  `}
                  fill={lvl.color}
                  opacity={0.85}
                  stroke={genxTheme.border}
                  strokeWidth={1}
                />

                {/* Label */}
                <Text
                  x={width / 2}
                  y={y + segmentHeight / 2}
                  fill={genxTheme.text}
                  fontSize={14}
                  textAnchor="middle"
                  dy={5}
                >
                  {lvl.label}: {lvl.value}
                </Text>
              </Group>
            );
          })}
        </Group>
      </svg>

      <p className="text-slate-400 text-xs mt-3">
        Funnel shows borrower progression through underwriting stages.
      </p>
    </div>
  );
}
