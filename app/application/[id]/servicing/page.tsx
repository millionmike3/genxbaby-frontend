import { Suspense } from "react";

async function getServicing(id: string) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/application/${id}/servicing`,
    { cache: "no-store" }
  );

  const json = await res.json();
  return json.data ?? null;
}

export default async function ServicingPage({ params }: { params: { id: string } }) {
  const data = await getServicing(params.id);

  if (!data) {
    return (
      <div className="p-6">
        <h1 className="text-xl font-semibold">No servicing data found</h1>
      </div>
    );
  }

  const { application, servicing } = data;

  return (
    <div className="p-6 space-y-10">
      <h1 className="text-2xl font-bold">
        Servicing — Application #{application.id}
      </h1>

      <Suspense fallback={<div>Loading...</div>}>
        <ServicingSummary servicing={servicing} />
        <PaymentHistory servicing={servicing} />
        <EscrowCard servicing={servicing} />
        <DelinquencyCard servicing={servicing} />
        <ServicingTimeline servicing={servicing} />
      </Suspense>
    </div>
  );
}

function ServicingSummary({ servicing }: { servicing: any }) {
  return (
    <section className="border rounded-xl p-6 bg-white shadow-sm">
      <h2 className="text-lg font-semibold mb-4">Summary</h2>

      <div className="space-y-2 text-sm">
        <div><strong>Status:</strong> {servicing.status ?? "—"}</div>
        <div>
          <strong>Next Due Date:</strong>{" "}
          {servicing.nextDueDate
            ? new Date(servicing.nextDueDate).toLocaleDateString()
            : "—"}
        </div>
        <div>
          <strong>Last Payment:</strong>{" "}
          {servicing.lastPaymentDate
            ? new Date(servicing.lastPaymentDate).toLocaleDateString()
            : "—"}
        </div>
        <div>
          <strong>Delinquency Days:</strong>{" "}
          {servicing.delinquencyDays ?? 0}
        </div>
      </div>
    </section>
  );
}

function PaymentHistory({ servicing }: { servicing: any }) {
  const history = servicing.paymentHistory ?? [];

  return (
    <section className="border rounded-xl p-6 bg-white shadow-sm">
      <h2 className="text-lg font-semibold mb-4">Payment History</h2>

      {history.length === 0 ? (
        <p className="text-sm text-gray-500">No payments recorded.</p>
      ) : (
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b">
              <th className="py-2 text-left">Date</th>
              <th className="py-2 text-left">Amount</th>
              <th className="py-2 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            {history.map((p: any, idx: number) => (
              <tr key={idx} className="border-b">
                <td className="py-2">
                  {new Date(p.date).toLocaleDateString()}
                </td>
                <td className="py-2">${p.amount.toLocaleString()}</td>
                <td className="py-2">{p.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </section>
  );
}

function EscrowCard({ servicing }: { servicing: any }) {
  return (
    <section className="border rounded-xl p-6 bg-white shadow-sm">
      <h2 className="text-lg font-semibold mb-4">Escrow</h2>

      <div className="space-y-2 text-sm">
        <div>
          <strong>Escrow Balance:</strong>{" "}
          {servicing.escrowBalance != null
            ? `$${servicing.escrowBalance.toLocaleString()}`
            : "—"}
        </div>
      </div>
    </section>
  );
}

function DelinquencyCard({ servicing }: { servicing: any }) {
  const days = servicing.delinquencyDays ?? 0;

  return (
    <section className="border rounded-xl p-6 bg-white shadow-sm">
      <h2 className="text-lg font-semibold mb-4">Delinquency</h2>

      <div className="space-y-2 text-sm">
        <div><strong>Days Delinquent:</strong> {days}</div>
        <div>
          <strong>Severity:</strong>{" "}
          {days >= 60 ? "Severe" : days >= 30 ? "Moderate" : "Low"}
        </div>
      </div>
    </section>
  );
}

function ServicingTimeline({ servicing }: { servicing: any }) {
  const timeline = servicing.timeline ?? [];

  return (
    <section className="border rounded-xl p-6 bg-white shadow-sm">
      <h2 className="text-lg font-semibold mb-4">Servicing Timeline</h2>

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
