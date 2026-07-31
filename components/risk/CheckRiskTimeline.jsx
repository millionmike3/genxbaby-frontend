export function CheckRiskTimeline({ events }) {
  return (
    <div className="border rounded-lg p-4 bg-white shadow">
      <h2 className="text-xl font-semibold mb-4">Fraud / SAR Events</h2>

      {(!events || events.length === 0) && (
        <div className="text-gray-500 text-sm">
          No events recorded for this check.
        </div>
      )}

      <div className="space-y-4 max-h-[400px] overflow-y-auto">
        {events.map((event) => (
          <div key={event.id} className="flex items-start space-x-3">
            <div className="mt-1 w-2 h-2 rounded-full bg-red-600" />
            <div>
              <div className="text-xs text-gray-500">
                {new Date(event.timestamp).toLocaleString()}
              </div>
              <div className="text-sm font-semibold">
                Fraud {event.fraudScore} · SAR {event.sarSeverity}
              </div>
              {event.volatilityIndex !== undefined && (
                <div className="text-xs text-gray-600">
                  Volatility {event.volatilityIndex}
                </div>
              )}
              {event.notes && (
                <div className="text-xs text-gray-700 mt-1">
                  {event.notes}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
