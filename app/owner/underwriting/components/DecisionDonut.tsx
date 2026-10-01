"use client";

import { Group } from "@visx/group";
import { Arc } from "@visx/shape";
import { Text } from "@visx/text";

type Props = {
  approved: number;
  denied: number;
  returned: number;
};

export default function DecisionDonut({ approved, denied, returned }: Props) {
  const width = 300;
  const height = 300;
  const radius = Math.min(width, height) / 2;

  const data = [
    { label: "Approved", value: approved, color: "#4EE38A" },
    { label: "Denied", value: denied, color: "#EF4444" },
    { label: "Returned", value: returned, color: "#FB923C" },
  ];

  const total = approved + denied + returned;

  let startAngle = 0;

  return (
    <div className="border border-slate-800 bg-slate-900 rounded-lg p-6 flex flex-col items-center">
      <h2 className="text-lg font-semibold text-[#4EE38A] mb-4">
        Decision Breakdown
      </h2>

      <svg width={width} height={height}>
        <Group top={height / 2} left={width / 2}>
          {data.map((slice, i) => {
            const angle = (slice.value / total) * (Math.PI * 2);
            const endAngle = startAngle + angle;

            const arcProps = {
              startAngle,
              endAngle,
              innerRadius: radius * 0.55,
              outerRadius: radius * 0.95,
            };

            startAngle = endAngle;

            return (
              <Arc
                key={i}
                {...arcProps}
                fill={slice.color}
                stroke="#0f172a"
                strokeWidth={2}
              />
            );
          })}

          {/* Center label */}
          <Text
            textAnchor="middle"
            verticalAnchor="middle"
            fill="#4EE38A"
            fontSize={22}
            fontWeight={600}
          >
            {total}
          </Text>
        </Group>
      </svg>

      <div className="flex gap-6 mt-4 text-sm text-slate-300">
        {data.map((d) => (
          <div key={d.label} className="flex items-center gap-2">
            <span
              className="inline-block w-3 h-3 rounded-full"
              style={{ backgroundColor: d.color }}
            />
            {d.label}: {d.value}
          </div>
        ))}
      </div>
    </div>
  );
}
