"use client";

import { CheckHistoryItem } from "../types";


export default function FraudBadge({ check }: { check: CheckHistoryItem }) {
  const critical = check.fraudFlags.filter(
    (f) => f.severity === "critical" && !f.resolved
  ).length;

  const warning = check.fraudFlags.filter(
    (f) => f.severity === "warning" && !f.resolved
  ).length;

  const info = check.fraudFlags.filter(
    (f) => f.severity === "info" && !f.resolved
  ).length;

  if (critical + warning + info === 0) {
    return (
      <span className="inline-flex items-center rounded-full bg-green-50 px-2 py-1 text-[10px] font-medium text-green-700">
        No fraud flags
      </span>
    );
  }

  return (
    <div className="flex gap-1 text-[10px]">
      {critical > 0 && (
        <span className="inline-flex items-center rounded-full bg-red-50 px-2 py-1 font-medium text-red-700">
          🚨 {critical} critical
        </span>
      )}
      {warning > 0 && (
        <span className="inline-flex items-center rounded-full bg-yellow-50 px-2 py-1 font-medium text-yellow-700">
          ⚠️ {warning} warning
        </span>
      )}
      {info > 0 && (
        <span className="inline-flex items-center rounded-full bg-blue-50 px-2 py-1 font-medium text-blue-700">
          ℹ️ {info} info
        </span>
      )}
    </div>
  );
}
