export default function OwnerPortalEquityPage() {
  const equityData = [
    { label: "Total Equity", value: "$980,000" },
    { label: "Loan Paydown (YTD)", value: "$42,500" },
    { label: "Appreciation (YTD)", value: "$68,000" },
  ];

  return (
    <div className="space-y-10">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold mb-4">Equity</h1>
        <p className="text-slate-300 text-lg">
          Track your equity growth across your portfolio, including loan
          paydown, appreciation, and total owner equity.
        </p>
      </div>

      {/* Equity Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {equityData.map((e) => (
          <div
            key={e.label}
            className="bg-slate-800/60 rounded-xl p-6 border border-slate-700"
          >
            <h3 className="text-sm text-slate-300">{e.label}</h3>
            <p className="text-3xl font-semibold mt-2">{e.value}</p>
          </div>
        ))}
      </div>

      {/* Future Enhancements */}
      <section className="bg-slate-800/40 p-6 rounded-xl border border-slate-700">
        <h3 className="text-lg font-semibold mb-2">Equity Insights</h3>
        <p className="text-slate-300">
          Detailed equity charts, appreciation trends, and loan amortization
          breakdowns will appear here as your portfolio intelligence expands.
        </p>
      </section>
    </div>
  );
}
