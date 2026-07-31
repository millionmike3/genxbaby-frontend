export function FinancialHealthChart({ history }) {
  if (!history || history.length === 0) {
    return (
      <div className="border rounded-lg p-4 bg-white shadow">
        <div className="text-gray-500">No financial health data.</div>
      </div>
    );
  }

  const points = history
    .slice()
    .reverse()
    .map((entry, index) => ({
      x: index,
      y: entry.financialHealthScore,
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
      <h2 className="text-xl font-semibold mb-2">Financial Health Over Time</h2>
      <svg width={width} height={height} className="bg-gray-50 rounded">
        <path d={pathD} fill="none" stroke="#10b981" strokeWidth="2" />
      </svg>
    </div>
  );
}
