export function RiskHistoryTimeline({ history }) {
  return (
    <div className="border rounded-lg p-4 bg-white shadow h-full">
      <h2 className="text-xl font-semibold mb-4">Underwriting Timeline</h2>

      {(!history || history.length === 0) && (
        <div className="text-gray-500 text-sm">No events recorded yet.</div>
      )}

      <div className="space-y-4 max-h-[400px] overflow-y-auto">
        {history.map((entry) => (
          <div key={entry.id} className="flex items-start space-x-3">
            <div className="mt-1 w-2 h-2 rounded-full bg-blue-600" />
            <div>
              <div className="text-xs text-gray-500">
                {new Date(entry.timestamp).toLocaleString()}
              </div>
              <div className="text-sm font-semibold">
                RiskScore {entry.riskScore} · Tier {entry.riskTier}
              </div>
              <div className="text-xs text-gray-600">
                Fraud {entry.fraudScore} · SAR {entry.sarSeverity} · Vol{" "}
                {entry.volatilityIndex} · Beh {entry.behaviorScore} · Bank{" "}
                {entry.bankRiskScore}
              </div>
              <div className="text-xs text-gray-600">
                Final Rate: {(entry.finalRateBps / 100).toFixed(2)}%
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
