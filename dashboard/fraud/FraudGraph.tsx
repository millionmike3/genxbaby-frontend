"use client";

import { useEffect, useRef } from "react";
import * as d3 from "d3";

interface FraudGraphProps {
  data: {
    nodes: any[];
    edges: any[];
  };
}

export default function FraudGraph({ data }: FraudGraphProps) {
  const svgRef = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    if (!data || !svgRef.current) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

    const width = 600;
    const height = 400;

    const simulation = d3
      .forceSimulation(data.nodes)
      .force("link", d3.forceLink(data.edges).id((d: any) => d.id))
      .force("charge", d3.forceManyBody().strength(-200))
      .force("center", d3.forceCenter(width / 2, height / 2));

    const link = svg
      .append("g")
      .selectAll("line")
      .data(data.edges)
      .enter()
      .append("line")
      .attr("stroke", "#555");

    const node = svg
      .append("g")
      .selectAll("circle")
      .data(data.nodes)
      .enter()
      .append("circle")
      .attr("r", 8)
      .attr("fill", "#4ade80");

    simulation.on("tick", () => {
      link
        .attr("x1", (d: any) => d.source.x)
        .attr("y1", (d: any) => d.source.y)
        .attr("x2", (d: any) => d.target.x)
        .attr("y2", (d: any) => d.target.y);

      node.attr("cx", (d: any) => d.x).attr("cy", (d: any) => d.y);
    });
  }, [data]);

  return (
    <svg
      ref={svgRef}
      width={600}
      height={400}
      className="gx-card p-4 rounded-lg"
    />
  );
}
