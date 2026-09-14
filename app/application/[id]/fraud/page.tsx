import { Suspense } from "react";

async function getFraud(id: string) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/application/${id}/fraud`,
    { cache: "no-store" }
  );

  const json = await res.json();
  return json.data ?? null;
}

export default async function FraudPage({ params }: { params: { id: string } }) {
  const data = await getFraud(params.id);

  if (!data) {
    return (
      <div className="p-6">
        <h1 className="text-xl font-semibold">No fraud data found</h1>
      </div>
    );
  }

  const { application, fraud } = data;

  return (
    <div className="p-6 space-y-10">
      <h1 className="text-2xl font-bold">
        Fraud Analysis — Application #{application.id}
      </h1>

      <Suspense fallback={<div>Loading...</div>}>
        <FraudScoreCard fraud={fraud} />
        <FraudSignalsCard fraud={fraud} />
        <DeviceIntelligenceCard fraud={fraud} />
        <EnvironmentRiskCard fraud={fraud} />
        <AnomaliesCard fraud={fraud} />
        <FraudTimelineCard fraud={fraud} />
      </Suspense>
    </div>
  );
}

function FraudScoreCard({ fraud }: { fraud: any }) {
  return (
    <section className="border rounded-xl p-6 bg-white shadow-sm">
      <h2 className="text-lg font-semibold mb-4">Fraud Score</h2>

      <div className="space-y-2 text-sm">
        <div>
          <strong>Score:</strong> {fraud.fraudScore ?? "—"}
        </div>
        <div>
          <strong>Severity:</strong>{" "}
          {fraud.fraudScore >= 80
            ? "High"
            : fraud.fraudScore >= 50
            ? "Medium"
            : "Low"}
        </div>
      </div>
    </section>
  );
}

function FraudSignalsCard({ fraud }: { fraud: any }) {
  const signals = fraud.signals ?? [];

  return (
    <section className="border rounded-xl p-6 bg-white shadow-sm">
      <h2 className="text-lg font-semibold mb-4">Fraud Signals</h2>

      {signals.length === 0 ? (
        <p className="text-sm text-gray-500">No fraud signals detected.</p>
      ) : (
        <ul className="space-y-2 text-sm">
          {signals.map((s: string, idx: number) => (
            <li key={idx}>• {s}</li>
          ))}
        </ul>
      )}
    </section>
  );
}

function DeviceIntelligenceCard({ fraud }: { fraud: any }) {
  return (
    <section className="border rounded-xl p-6 bg-white shadow-sm">
      <h2 className="text-lg font-semibold mb-4">Device Intelligence</h2>

      <div className="space-y-2 text-sm">
        <div>
          <strong>Nearby Devices:</strong> {fraud.deviceCount ?? "—"}
        </div>
        <div>
          <strong>Bluetooth Density:</strong> {fraud.bluetoothDensity ?? "—"}
        </div>
      </div>
    </section>
  );
}

function EnvironmentRiskCard({ fraud }: { fraud: any }) {
  return (
    <section className="border rounded-xl p-6 bg-white shadow-sm">
      <h2 className="text-lg font-semibold mb-4">Environment Risk</h2>

      <div className="space-y-2 text-sm">
        <div>
          <strong>Risk Score:</strong> {fraud.environmentRisk ?? "—"}
        </div>
        <div>
          <strong>Severity:</strong>{" "}
          {fraud.environmentRisk >= 80
            ? "High"
            : fraud.environmentRisk >= 50
            ? "Medium"
            : "Low"}
        </div>
      </div>
    </section>
  );
}

function AnomaliesCard({ fraud }: { fraud: any }) {
  const anomalies = fraud.anomalies ?? [];

  return (
    <section className="border rounded-xl p-6 bg-white shadow-sm">
      <h2 className="text-lg font-semibold mb-4">Behavioral Anomalies</h2>

      {anomalies.length === 0 ? (
        <p className="text-sm text-gray-500">No anomalies detected.</p>
      ) : (
        <ul className="space-y-2 text-sm">
          {anomalies.map((a: any, idx: number) => (
            <li key={idx}>
              <strong>{a.label}:</strong> {a.value}
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

function FraudTimelineCard({ fraud }: { fraud: any }) {
  const timeline = fraud.timeline ?? [];

  return (
    <section className="border rounded-xl p-6 bg-white shadow-sm">
      <h2 className="text-lg font-semibold mb-4">Fraud Timeline</h2>

      {timeline.length === 0 ? (
        <p className="text-sm text-gray-500">No timeline events.</p>
      ) : (
        <ul className="space-y-2 text-sm">
          {timeline.map((t: any, idx: number) => (
            <li key={idx}>
              <strong>{t.label}:</strong>{" "}
              {new Date(t.timestamp).toLocaleString()}
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
