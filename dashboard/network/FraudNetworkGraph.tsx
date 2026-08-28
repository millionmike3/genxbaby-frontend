"use client";

import { useEffect, useRef } from "react";
import * as d3 from "d3";

interface FraudNetworkGraphProps {
  apiUrl: string;
}

interface NetworkNode {
  id: string;
  type: "ALERT" | "CHECK" | "DOCUMENT" | "ROUTING" | "ACCOUNT";
  x?: number;
  y?: number;
  fx?: number | null;
  fy?: number | null;
}

interface NetworkLink {
  source: string | NetworkNode;
  target: string | NetworkNode;
  severity: "HIGH" | "MEDIUM" | "LOW";
}

interface NetworkData {
  nodes: NetworkNode[];
  links: NetworkLink[];
}

export default function FraudNetworkGraph({ apiUrl }: FraudNetworkGraphProps) {
  const ref = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    fetch(`${apiUrl}/dashboard/ai/fraud-network`)
      .then((r) => r.json())
      .then((data: NetworkData) => renderGraph(data))
      .catch((err) => console.error("Failed to load fraud network:", err));
  }, [apiUrl]);

  function renderGraph({ nodes, links }: NetworkData) {
    if (!ref.current) return;

    const svg = d3.select(ref.current)
      .attr("width", "100%")
      .attr("height", 500);

    svg.selectAll("*").remove();

    const color: Record<NetworkNode["type"], string> = {
      ALERT: "#dc2626",
      CHECK: "#2563eb",
      DOCUMENT: "#7c3aed",
      ROUTING: "#059669",
      ACCOUNT: "#d97706",
    };

    const severityColor: Record<NetworkLink["severity"], string> = {
      HIGH: "#dc2626",
      MEDIUM: "#f59e0b",
      LOW: "#16a34a",
    };

    const simulation = d3.forceSimulation(nodes)
      .force("link", d3.forceLink(links).id((d: any) => d.id).distance(120))
      .force("charge", d3.forceManyBody().strength(-300))
      .force("center", d3.forceCenter(250, 250));

    const link = svg.append("g")
      .selectAll("line")
      .data(links)
      .enter()
      .append("line")
      .attr("stroke-width", 2)
      .attr("stroke", (d) => severityColor[d.severity]);

    const node = svg.append("g")
      .selectAll("circle")
      .data(nodes)
      .enter()
      .append("circle")
      .attr("r", 10)
      .attr("fill", (d) => color[d.type])
      .call(d3.drag<SVGCircleElement, NetworkNode>()
        .on("start", dragStart)
        .on("drag", dragged)
        .on("end", dragEnd)
      );

    const label = svg.append("g")
      .selectAll("text")
      .data(nodes)
      .enter()
      .append("text")
      .text((d) => d.type)
      .attr("font-size", "10px")
      .attr("fill", "#374151");

    simulation.on("tick", () => {
    link
     .attr("x1", (d: any) => (d.source as NetworkNode).x ?? 0)
     .attr("y1", (d: any) => (d.source as NetworkNode).y ?? 0)
     .attr("x2", (d: any) => (d.target as NetworkNode).x ?? 0)
     .attr("y2", (d: any) => (d.target as NetworkNode).y ?? 0);

    node
     .attr("cx", (d: any) => d.x ?? 0)
     .attr("cy", (d: any) => d.y ?? 0);

    label
     .attr("x", (d: any) => (d.x ?? 0) + 12)
     .attr("y", (d: any) => (d.y ?? 0) + 4);
     });


    function dragStart(event: any, d: NetworkNode) {
      if (!event.active) simulation.alphaTarget(0.3).restart();
      d.fx = d.x ?? null;
      d.fy = d.y ?? null;
    }

    function dragged(event: any, d: NetworkNode) {
      d.fx = event.x;
      d.fy = event.y;
    }

    function dragEnd(event: any, d: NetworkNode) {
      if (!event.active) simulation.alphaTarget(0);
      d.fx = null;
      d.fy = null;
    }
  }

  return (
    <div className="bg-white border rounded shadow p-6">
      <h2 className="text-xl font-bold mb-4">Fraud Network Graph</h2>
      <svg ref={ref}></svg>
    </div>
  );
}
