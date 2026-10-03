"use server";

export default async function AdminSignalsPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">Signals</h1>
      <p className="text-slate-300 mb-6">
        Configure risk thresholds, alerts, and fraud detection signals.
      </p>
    </div>
  );
}
