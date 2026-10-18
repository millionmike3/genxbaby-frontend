export default function FraudEventsPage() {
  return (
    <div>
      <h1 className="text-4xl font-bold mb-6">Fraud Events</h1>

      <p className="text-slate-300 mb-8">
        Review detected fraud anomalies, anchored events, behavioral risk
        signals, and system‑generated fraud intelligence.
      </p>

      {/* Section: Summary */}
      <section className="bg-slate-800/50 p-6 rounded-xl border border-slate-700 mb-10">
        <h2 className="text-2xl font-semibold mb-4">Fraud Summary</h2>
        <p className="text-slate-400">
          This dashboard will display aggregated fraud scores, anomaly counts,
          Bluetooth density anomalies, impulsiveness spikes, and routing risk
          indicators once integrated with the fraud intelligence engine.
        </p>
      </section>

      {/* Section: Event List */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">Recent Fraud Events</h2>

        <div className="space-y-4">
          <div className="bg-slate-800/40 p-4 rounded-lg border border-slate-700">
            <strong className="text-slate-200">Event Viewer</strong>
            <p className="text-slate-400 mt-2">
              A detailed list of fraud events will appear here, including:
            </p>

            <ul className="list-disc list-inside text-slate-400 mt-3 space-y-1">
              <li>Anchored blockchain event hashes</li>
              <li>Fraud score spikes</li>
              <li>Behavioral anomalies</li>
              <li>Bluetooth density irregularities</li>
              <li>Routing score deviations</li>
              <li>Underwriting fraud flags</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}
