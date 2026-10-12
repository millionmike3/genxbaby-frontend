"use client";

type Bucket = { bucket: string; _avg: { score: number }; _count: { _all: number } };

export default function RiskBucketChart({ data }: { data: Bucket[] }) {
  return (
    <div className="p-4 rounded-xl border border-slate-800 bg-slate-900/60">
      <h3 className="text-lg font-semibold mb-2">Risk Buckets</h3>
      <div className="space-y-2 text-sm text-slate-300">
        {Array.isArray(data) && data.map((b) => (
          <div key={b.bucket} className="flex justify-between">
            <span>{b.bucket}</span>
            <span>Avg: {b._avg.score.toFixed(2)}</span>
            <span>Count: {b._count._all}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
