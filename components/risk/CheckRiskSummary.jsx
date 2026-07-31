export function CheckRiskSummary({ events }) {
  if (!events || events.length === 0) {
    return (
      <div className="border rounded-lg p-4 bg-white shadow">
        <div className="text-gray-500 text-sm">
          No fraud/SAR events recorded for this check.
        </div>
      </div>
    );
  }

  const latest = events[events.length - 1];

  return (
    <div className="border rounded-lg p-4 bg-white shadow space-y-2">
      <h2 className="text-xl font-semibold">Latest Risk Snapshot</h2>
      <div className="text-sm text-gray-600">
        Timestamp: {new Date(latest.timestamp).toLocaleString()}
      </div>
      <div className="text-sm">
        <span className="font-semibold">Fraud Score:</span>{" "}
        {latest.fraudScore}
      </div>
      <div className="text-sm">
        <span className="font-semibold">SAR Severity:</span>{" "}
        {latest.sarSeverity}
      </div>
      {latest.notes && (
        <div className="text-sm text-gray-700 mt-2">
          <span className="font-semibold">Notes:</span> {latest.notes}
        </div>
      )}
    </div>
  );
}
