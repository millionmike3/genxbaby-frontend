export function TierDistributionChart({ tierCounts }) {
  const tiers = Object.keys(tierCounts);
  const values = Object.values(tierCounts);

  const max = Math.max(...values, 1);
  const width = 600;
  const height = 200;
  const barWidth = width / tiers.length;

  return (
    <div className="border rounded-lg p-4 bg-white shadow">
      <h2 className="text-xl font-semibold mb-2">Tier Distribution</h2>

      <svg width={width} height={height} className="bg-gray-50 rounded">
        {tiers.map((tier, i) => {
          const barHeight = (values[i] / max) * height;
          return (
            <rect
              key={tier}
              x={i * barWidth}
              y={height - barHeight}
              width={barWidth - 10}
              height={barHeight}
              fill="#2563eb"
            />
          );
        })}
      </svg>

      <div className="flex space-x-4 mt-4 text-sm">
        {tiers.map((tier, i) => (
          <div key={tier}>
            {tier}: {values[i]}
          </div>
        ))}
      </div>
    </div>
  );
}
