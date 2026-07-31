export function CheckRiskTimelineView({ checkId, events }) {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Check Risk Timeline</h1>

      <div className="text-gray-600 text-sm">
        Check ID: <span className="font-semibold">{checkId}</span>
      </div>

      <CheckRiskSummary events={events} />
      <CheckRiskTimeline events={events} />
    </div>
  );
}
