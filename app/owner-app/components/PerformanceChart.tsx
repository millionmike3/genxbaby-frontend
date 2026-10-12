"use client";

type Point = { period: string; dscr: number; ltv: number; riskScore: number };

export default function PerformanceChart({ data }: { data: Point[] }) {
  return (
    <div className="p-4 rounded-xl border border-slate-800 bg-slate-900/60">
      <h3 className="text-lg font-semibold mb-2">DSCR / LTV / Risk Trends</h3>
      <div className="space-y-2 text-sm text-slate-300">
        {data.map((p) => (
          <div key={p.period} className="flex justify-between">
            <span>{p.period}</span>
            <span>DSCR: {p.dscr.toFixed(2)}</span>
            <span>LTV: {(p.ltv * 100).toFixed(1)}%</span>
            <span>Risk: {p.riskScore.toFixed(2)}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
