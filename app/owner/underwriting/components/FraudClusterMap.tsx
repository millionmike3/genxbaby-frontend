"use client";

import { genxTheme } from "../visxTheme";
import { Group } from "@visx/group";
import { Voronoi } from "@visx/voronoi";
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

  const points = data.map((d, i) => ({
    x: d.risk,
    y: d.fraud,
    cluster: assignments[i],
    id: i,
  }));

  return (
    <div className="border border-slate-800 bg-slate-900 rounded-lg p-6">
      <h2 className="text-lg font-semibold text-[#4EE38A] mb-4">
        Fraud Cluster Map (AI + Voronoi)
      </h2>

      <svg width={width} height={height}>
        <Voronoi
          width={width}
          height={height}
          x={(d) => d.x}
          y={(d) => d.y}
          data={points}
        >
          {(voronoi) => (
            <Group>
              {/* Voronoi Cells */}
              {voronoi.polygons().map((poly, i) => (
                <polygon
                  key={i}
                  points={poly.points.join(" ")}
                  fill={clusterColors[poly.data.cluster]}
                  opacity={0.15}
                  stroke={clusterColors[poly.data.cluster]}
                  strokeWidth={1}
                />
              ))}

              {/* Points */}
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
          )}
        </Voronoi>
      </svg>

      <p className="text-slate-400 text-xs mt-3">
        X = Risk Score, Y = Fraud Score, Color = AI Cluster
      </p>
    </div>
  );
}
