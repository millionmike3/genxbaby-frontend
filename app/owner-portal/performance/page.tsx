export default function OwnerPortalPerformancePage() {
  const metrics = [
    { label: "NOI", value: "$145,000", note: "Trailing 12 months" },
    { label: "Cap Rate", value: "6.2%", note: "Portfolio blended" },
    { label: "Cash-on-Cash", value: "9.8%", note: "Current year" },
    { label: "DSCR", value: "1.45x", note: "Debt service coverage" },
  ];

  return (
    <div className="space-y-10">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold mb-4">Performance</h1>
        <p className="text-slate-300 text-lg">
          Review key performance indicators for your portfolio, including NOI,
          cap rate, cash-on-cash returns, and debt service coverage.
        </p>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {metrics.map((m) => (
          <div
            key={m.label}
            className="bg-slate-800/60 rounded-xl p-6 border border-slate-700"
          >
            <h3 className="text-sm text-slate-300">{m.label}</h3>
            <p className="text-3xl font-semibold mt-2">{m.value}</p>
            <p className="text-xs text-slate-400 mt-1">{m.note}</p>
          </div>
        ))}
      </div>

      {/* Future Enhancements Placeholder */}
      <div className="bg-slate-800/40 rounded-xl p-6 border border-slate-700">
        <h3 className="text-lg font-semibold mb-2">Performance Insights</h3>
        <p className="text-slate-300">
          Advanced analytics such as trend charts, year-over-year comparisons,
          and AI-driven performance scoring will appear here.
        </p>
      </div>
    </div>
  );
}
