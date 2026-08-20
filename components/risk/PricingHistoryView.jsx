"use client";

import PricingHistoryTimeline from "./PricingHistoryTimeline";

export default function PricingHistoryView({ history }) {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Pricing History</h1>

      {!history || history.length === 0 ? (
        <div className="border rounded-lg p-4 bg-white shadow">
          <p className="text-gray-500">No pricing history available.</p>
        </div>
      ) : (
        <PricingHistoryTimeline history={history} />
      )}
    </div>
  );
}
