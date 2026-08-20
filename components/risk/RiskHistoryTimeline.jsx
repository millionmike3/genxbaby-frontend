"use client";

export default function PricingHistoryTimeline({ history }) {
  return (
    <div className="border rounded-lg p-4 bg-white shadow h-full">
      <h2 className="text-xl font-semibold mb-4">Pricing History</h2>

      {(!history || history.length === 0) && (
        <div className="text-gray-500 text-sm">No pricing events recorded yet.</div>
      )}

      <div className="space-y-4 max-h-[400px] overflow-y-auto">
        {history?.map((entry) => (
          <div key={entry.id} className="flex items-start space-x-3">
            <div className="mt-1 w-2 h-2 rounded-full bg-green-600" />
            <div>
              <div className="text-xs text-gray-500">
                {new Date(entry.timestamp).toLocaleString()}
              </div>

              <div className="text-sm font-semibold">
                Final Rate {(entry.finalRateBps / 100).toFixed(2)}%
              </div>

              <div className="text-xs text-gray-600">
                Base {entry.baseRate}% · Adj {entry.adjustments}% · Tier {entry.riskTier}
              </div>

              <div className="text-xs text-gray-600">
                Notes: {entry.notes || "None"}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
