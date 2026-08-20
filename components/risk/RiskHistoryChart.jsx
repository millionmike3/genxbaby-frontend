"use client";

export default function RiskHistoryChart({ history }) {
  if (!history || history.length === 0) {
    return (
      <div className="border rounded-lg p-4 bg-white shadow">
        <div className="text-gray-500">No risk history available.</div>
      </div>
    );
  }

  const points = history
    .slice()
    .reverse()
    .map((entry, index) => ({
      x: index,
      y: entry.riskScore,
      label: new Date(entry.timestamp).toLocaleString(),
    }));

  const maxScore = 100;
  const width = 600;
  const height = 200;
  const stepX = width / Math.max(points.length - 1, 1);

  const pathD = points
    .map((p, i) => {
      const x = i * stepX;
      const y = height - (p.y / maxScore) * height;
      return `${i === 0 ? "M" : "L"} ${x} ${y}`;
    })
    .join(" ");

  return (
    <div className="border rounded-lg p-4 bg-white shadow">
      <h2 className="text-xl font-semibold mb-2">Risk Score Over Time</h2>

      <svg width={width} height={height} className="bg-gray-50 rounded">
        <path d={pathD} fill="none" stroke="#2563eb" strokeWidth="2" />
      </svg>

      <div className="mt-2 text-xs text-gray-500">
        Latest riskScore: {history[0].riskScore} | Entries: {history.length}
      </div>
    </div>
  );
}
