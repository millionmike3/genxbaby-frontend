"use client";

import { CheckHistoryItem } from "../types";


export default function FraudSummary({ checks }: { checks: CheckHistoryItem[] }) {
  const allFlags = checks.flatMap((c) => c.fraudFlags);

  const critical = allFlags.filter(
    (f) => f.severity === "critical" && !f.resolved
  ).length;

  const warning = allFlags.filter(
    (f) => f.severity === "warning" && !f.resolved
  ).length;

  const info = allFlags.filter(
    (f) => f.severity === "info" && !f.resolved
  ).length;

  return (
    <div className="mb-4 flex gap-3 text-xs">
      <div className="rounded border border-red-200 bg-red-50 px-3 py-2">
        <p className="font-semibold text-red-700">Critical</p>
        <p className="text-red-800">{critical}</p>
      </div>
      <div className="rounded border border-yellow-200 bg-yellow-50 px-3 py-2">
        <p className="font-semibold text-yellow-700">Warning</p>
        <p className="text-yellow-800">{warning}</p>
      </div>
      <div className="rounded border border-blue-200 bg-blue-50 px-3 py-2">
        <p className="font-semibold text-blue-700">Info</p>
        <p className="text-blue-800">{info}</p>
      </div>
    </div>
  );
}
