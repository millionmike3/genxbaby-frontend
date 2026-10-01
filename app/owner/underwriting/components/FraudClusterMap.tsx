"use client";

import { Group } from "@visx/group";
import { voronoi } from "@visx/voronoi";
import { Circle } from "@visx/shape";

const clusterColors = ["#4EE38A", "#FACC15", "#FB923C", "#EF4444"];

export default function FraudClusterMap({
  data,
  assignments,
}: {
  data: { fraud: number; risk: number }[];
  assignments: number[];
}) {
  const width = 600;
  const height = 300;

  // Prevent empty-data Voronoi crash
  if (!data || data.length === 0) {
    return (
      <div className="border border-slate-800 bg-slate-900 rounded-lg p-6">
        <h2 className="text-lg font-semibold text-[#4EE38A] mb-4">
          Fraud Cluster Map (AI + Voronoi)
        </h2>
        <p className="text-slate-400 text-xs">No data available</p>
      </div>
    );
  }

  const points = data.map((d, i) => ({
    x: d.risk,
    y: d.fraud,
    cluster: assignments[i] ?? 0,
    id: i,
  }));

  const diagram = voronoi()
    .x((d) => d.x)
    .y((d) => d.y)
    .extent([
      [0, 0],
      [width, height],
    ]);

  const polygons = diagram.polygons(points) ?? [];

  return (
    <div className="border border-slate-800 bg-slate-900 rounded-lg p-6">
      <h2 className="text-lg font-semibold text-[#4EE38A] mb-4">
        Fraud Cluster Map (AI + Voronoi)
      </h2>

      <svg width={width} height={height}>
        <Group>
          {polygons.map((poly, i) => {
            if (!poly || !poly.length) return null;

            return (
              <polygon
                key={i}
                points={poly.map((p) => `${p[0]},${p[1]}`).join(" ")}
                fill={clusterColors[poly.data.cluster]}
                opacity={0.15}
                stroke={clusterColors[poly.data.cluster]}
                strokeWidth={1}
              />
            );
          })}

          {points.map((p) => (
            <Circle
              key={p.id}
              cx={p.x}
              cy={p.y}
              r={6}
              fill={clusterColors[p.cluster]}
              opacity={0.9}
            />
          ))}
        </Group>
      </svg>

      <p className="text-slate-400 text-xs mt-3">
        X = Risk Score, Y = Fraud Score, Color = AI Cluster
      </p>
    </div>
  );
}
