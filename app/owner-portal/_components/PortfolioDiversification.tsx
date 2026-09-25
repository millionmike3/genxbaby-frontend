type DiversificationBucket = {
  label: string;
  count: number;
};

export function DiversificationSummary({
  cityScore,
  typeScore,
}: {
  cityScore: number;
  typeScore: number;
}) {
  return (
    <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 mb-6">
      <h3 className="text-xl font-semibold mb-2">Diversification Summary</h3>
      <p className="text-sm text-slate-300">
        City diversification score: {cityScore}/100
      </p>
      <p className="text-sm text-slate-300">
        Asset type diversification score: {typeScore}/100
      </p>
    </div>
  );
}

export default function PortfolioDiversification({
  byCity,
  byType,
}: {
  byCity: DiversificationBucket[];
  byType: DiversificationBucket[];
}) {
  return (
    <div className="grid md:grid-cols-2 gap-6">
      {/* By City */}
      <div className="bg-slate-800 p-6 rounded-xl border border-slate-700">
        <h3 className="text-xl font-semibold mb-4">By City</h3>
        <ul className="space-y-2 text-slate-200 text-sm">
          {byCity.map((c) => (
            <li
              key={c.label}
              className="flex justify-between border border-slate-700 rounded-lg px-3 py-2"
            >
              <span>{c.label}</span>
              <span>{c.count}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* By Property Type */}
      <div className="bg-slate-800 p-6 rounded-xl border border-slate-700">
        <h3 className="text-xl font-semibold mb-4">By Property Type</h3>
        <ul className="space-y-2 text-slate-200 text-sm">
          {byType.map((t) => (
            <li
              key={t.label}
              className="flex justify-between border border-slate-700 rounded-lg px-3 py-2"
            >
              <span>{t.label}</span>
              <span>{t.count}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
