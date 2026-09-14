import { Suspense } from "react";

async function getPricing(id: string) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/application/${id}/pricing`,
    { cache: "no-store" }
  );

  const json = await res.json();
  return json.data ?? null;
}

export default async function PricingPage({ params }: { params: { id: string } }) {
  const data = await getPricing(params.id);

  if (!data) {
    return (
      <div className="p-6">
        <h1 className="text-xl font-semibold">No pricing data found</h1>
      </div>
    );
  }

  const { application, pricing } = data;

  return (
    <div className="p-6 space-y-10">
      <h1 className="text-2xl font-bold">
        Pricing — Application #{application.id}
      </h1>

      <Suspense fallback={<div>Loading...</div>}>
        <PricingSummary pricing={pricing} />
        <PricingBreakdown pricing={pricing} />
        <PricingRationale pricing={pricing} />
        <PricingTimeline pricing={pricing} />
      </Suspense>
    </div>
  );
}

function PricingSummary({ pricing }: { pricing: any }) {
  return (
    <section className="border rounded-xl p-6 bg-white shadow-sm">
      <h2 className="text-lg font-semibold mb-4">Summary</h2>

      <div className="space-y-2 text-sm">
        <div>
          <strong>Base Rate:</strong>{" "}
          {pricing.baseRate != null ? `${pricing.baseRate}%` : "—"}
        </div>
        <div>
          <strong>LLPA:</strong>{" "}
          {pricing.llpa != null ? `${pricing.llpa}%` : "—"}
        </div>
        <div>
          <strong>Risk Adjustments:</strong>{" "}
          {pricing.riskAdjustments != null ? `${pricing.riskAdjustments}%` : "—"}
        </div>
        <div>
          <strong>Fraud Adjustments:</strong>{" "}
          {pricing.fraudAdjustments != null ? `${pricing.fraudAdjustments}%` : "—"}
        </div>
        <div>
          <strong>Final Rate:</strong>{" "}
          {pricing.finalRate != null ? `${pricing.finalRate}%` : "—"}
        </div>
      </div>
    </section>
  );
}

function PricingBreakdown({ pricing }: { pricing: any }) {
  return (
    <section className="border rounded-xl p-6 bg-white shadow-sm">
      <h2 className="text-lg font-semibold mb-4">Breakdown</h2>

      <div className="space-y-2 text-sm">
        <div>
          <strong>Base Rate:</strong> {pricing.baseRate ?? "—"}%
        </div>
        <div>
          <strong>LLPA:</strong> {pricing.llpa ?? "—"}%
        </div>
        <div>
          <strong>Risk Adjustments:</strong> {pricing.riskAdjustments ?? "—"}%
        </div>
        <div>
          <strong>Fraud Adjustments:</strong> {pricing.fraudAdjustments ?? "—"}%
        </div>
        <div className="pt-2 border-t">
          <strong>Total Adjustments:</strong>{" "}
          {(pricing.llpa ?? 0) +
            (pricing.riskAdjustments ?? 0) +
            (pricing.fraudAdjustments ?? 0)}
          %
        </div>
      </div>
    </section>
  );
}

function PricingRationale({ pricing }: { pricing: any }) {
  const rationale = pricing.rationale ?? [];

  return (
    <section className="border rounded-xl p-6 bg-white shadow-sm">
      <h2 className="text-lg font-semibold mb-4">Rationale</h2>

      {rationale.length === 0 ? (
        <p className="text-sm text-gray-500">No rationale provided.</p>
      ) : (
        <ul className="space-y-2 text-sm">
          {rationale.map((r: string, idx: number) => (
            <li key={idx}>• {r}</li>
          ))}
        </ul>
      )}
    </section>
  );
}

function PricingTimeline({ pricing }: { pricing: any }) {
  const timeline = pricing.timeline ?? [];

  return (
    <section className="border rounded-xl p-6 bg-white shadow-sm">
      <h2 className="text-lg font-semibold mb-4">Pricing Timeline</h2>

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
