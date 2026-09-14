import { Suspense } from "react";

async function getUnderwriting(id: string) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/application/${id}/underwriting`,
    { cache: "no-store" }
  );

  const json = await res.json();
  return json.data ?? null;
}

export default async function UnderwritingPage({ params }: { params: { id: string } }) {
  const data = await getUnderwriting(params.id);

  if (!data) {
    return (
      <div className="p-6">
        <h1 className="text-xl font-semibold">No underwriting data found</h1>
      </div>
    );
  }

  const { application, underwriting } = data;

  return (
    <div className="p-6 space-y-10">
      <h1 className="text-2xl font-bold">
        Underwriting — Application #{application.id}
      </h1>

      <Suspense fallback={<div>Loading...</div>}>
        <UnderwritingSummary underwriting={underwriting} />
        <CreditMetrics underwriting={underwriting} />
        <IncomeDTI underwriting={underwriting} />
        <PropertyDetails underwriting={underwriting} />
        <UnderwritingTimeline underwriting={underwriting} />
      </Suspense>
    </div>
  );
}

function UnderwritingSummary({ underwriting }: { underwriting: any }) {
  return (
    <section className="border rounded-xl p-6 bg-white shadow-sm">
      <h2 className="text-lg font-semibold mb-4">Summary</h2>

      <div className="space-y-2 text-sm">
        <div><strong>Decision:</strong> {underwriting.decision ?? "Pending"}</div>
        <div><strong>LLPA:</strong> {underwriting.llpa ?? "—"}</div>
        <div><strong>Risk Factors:</strong> {underwriting.riskFactors?.join(", ") ?? "—"}</div>
      </div>
    </section>
  );
}

function CreditMetrics({ underwriting }: { underwriting: any }) {
  return (
    <section className="border rounded-xl p-6 bg-white shadow-sm">
      <h2 className="text-lg font-semibold mb-4">Credit Metrics</h2>

      <div className="space-y-2 text-sm">
        <div><strong>Credit Score:</strong> {underwriting.creditScore ?? "—"}</div>
        <div><strong>Derogatory Marks:</strong> {underwriting.derogatoryMarks ?? "—"}</div>
      </div>
    </section>
  );
}

function IncomeDTI({ underwriting }: { underwriting: any }) {
  return (
    <section className="border rounded-xl p-6 bg-white shadow-sm">
      <h2 className="text-lg font-semibold mb-4">Income & DTI</h2>

      <div className="space-y-2 text-sm">
        <div><strong>Income:</strong> {underwriting.income ?? "—"}</div>
        <div><strong>DTI:</strong> {underwriting.dti ?? "—"}</div>
      </div>
    </section>
  );
}

function PropertyDetails({ underwriting }: { underwriting: any }) {
  return (
    <section className="border rounded-xl p-6 bg-white shadow-sm">
      <h2 className="text-lg font-semibold mb-4">Property Details</h2>

      <div className="space-y-2 text-sm">
        <div><strong>Address:</strong> {underwriting.propertyAddress ?? "—"}</div>
        <div><strong>Type:</strong> {underwriting.propertyType ?? "—"}</div>
        <div><strong>Value:</strong> {underwriting.propertyValue ?? "—"}</div>
      </div>
    </section>
  );
}

function UnderwritingTimeline({ underwriting }: { underwriting: any }) {
  const timeline = underwriting.timeline ?? [];

  return (
    <section className="border rounded-xl p-6 bg-white shadow-sm">
      <h2 className="text-lg font-semibold mb-4">Timeline</h2>

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
