"use client";

export default function PortfolioRiskDashboard({ summary }) {
  const {
    totalOwners,
    totalChecks,
    avgRiskScore,
    avgFinancialHealth,
    avgFinalRate,
    tierCounts,
    avgIncomeVerificationScore,
  } = summary;

  const tiers = Object.keys(tierCounts || {});
  const values = Object.values(tierCounts || {});

  const max = Math.max(...values, 1);
  const width = 600;
  const height = 200;
  const barWidth = width / (tiers.length || 1);

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Portfolio Risk Dashboard</h1>

      {/* STAT CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="border rounded-lg p-4 bg-white shadow">
          <div className="text-sm text-gray-600">Total Owners</div>
          <div className="text-2xl font-bold">{totalOwners}</div>
        </div>

        <div className="border rounded-lg p-4 bg-white shadow">
          <div className="text-sm text-gray-600">Total Checks</div>
          <div className="text-2xl font-bold">{totalChecks}</div>
        </div>

        <div className="border rounded-lg p-4 bg-white shadow">
          <div className="text-sm text-gray-600">Avg Risk Score</div>
          <div className="text-2xl font-bold">{avgRiskScore?.toFixed(1)}</div>
        </div>

        <div className="border rounded-lg p-4 bg-white shadow">
          <div className="text-sm text-gray-600">Avg Financial Health</div>
          <div className="text-2xl font-bold">
            {avgFinancialHealth?.toFixed(1)}
          </div>
        </div>

        <div className="border rounded-lg p-4 bg-white shadow">
          <div className="text-sm text-gray-600">Avg Final Rate (%)</div>
          <div className="text-2xl font-bold">
            {(avgFinalRate / 100).toFixed(2)}
          </div>
        </div>

        {/* ⭐ NEW — INCOME VERIFICATION SCORE CARD */}
        <div className="border rounded-lg p-4 bg-white shadow">
          <div className="text-sm text-gray-600">
            Avg Income Verification Score
          </div>
          <div className="text-2xl font-bold">
            {avgIncomeVerificationScore?.toFixed(1) ?? "N/A"}
          </div>
        </div>
      </div>

      {/* TIER DISTRIBUTION */}
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
    </div>
  );
}
