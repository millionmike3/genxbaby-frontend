"use client";

type RiskCell = {
  label: string;
  ltv: number;
  riskScore: number;
  seasoningMonths: number;
};

export default function AdvancedRiskMatrix({ data }: { data: RiskCell[] }) {
  return (
    <div className="bg-slate-800 p-6 rounded-xl border border-slate-700">
      <h3 className="text-xl font-semibold mb-4">Advanced Risk Matrix</h3>
      <div className="grid md:grid-cols-3 gap-4 text-sm text-slate-200">
        {data.map((cell) => {
          const riskBand =
            cell.riskScore > 7 || cell.ltv > 0.85
              ? "bg-red-700"
              : cell.riskScore > 5 || cell.ltv > 0.75
              ? "bg-yellow-700"
              : "bg-green-700";

          return (
            <div
              key={cell.label}
              className={`p-4 rounded-lg border border-slate-700 ${riskBand}`}
            >
              <p className="font-semibold mb-1">{cell.label}</p>
              <p>LTV: {(cell.ltv * 100).toFixed(1)}%</p>
              <p>Risk: {cell.riskScore.toFixed(2)}</p>
              <p>Seasoning: {cell.seasoningMonths} mo</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
