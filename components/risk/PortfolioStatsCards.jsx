export function PortfolioStatsCards({ summary }) {
  const cards = [
    {
      label: "Total Owners",
      value: summary.totalOwners,
    },
    {
      label: "Total Checks",
      value: summary.totalChecks,
    },
    {
      label: "Avg Risk Score",
      value: summary.avgRiskScore.toFixed(1),
    },
    {
      label: "Avg Financial Health",
      value: summary.avgFinancialHealth.toFixed(1),
    },
    {
      label: "Avg Final Rate (%)",
      value: (summary.avgFinalRate / 100).toFixed(2),
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {cards.map((c) => (
        <div
          key={c.label}
          className="border rounded-lg p-4 bg-white shadow"
        >
          <div className="text-sm text-gray-600">{c.label}</div>
          <div className="text-2xl font-bold">{c.value}</div>
        </div>
      ))}
    </div>
  );
}
