import { Suspense } from "react";

async function getFraudEvents(limit = 50) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/admin/fraud?limit=${limit}`,
    { cache: "no-store" }
  );

  const json = await res.json();
  return json.data ?? [];
}

export default async function FraudPage() {
  const events = await getFraudEvents();

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">Fraud Events</h1>

      <Suspense fallback={<div>Loading...</div>}>
        <FraudTable rows={events} />
      </Suspense>
    </div>
  );
}

function FraudTable({ rows }: { rows: any[] }) {
  return (
    <table className="min-w-full border border-gray-200 rounded-md">
      <thead className="bg-gray-50">
        <tr>
          <th className="px-4 py-2 text-left">Event Type</th>
          <th className="px-4 py-2 text-left">Signal</th>
          <th className="px-4 py-2 text-left">Metadata</th>
          <th className="px-4 py-2 text-left">Created</th>
        </tr>
      </thead>

      <tbody>
        {rows.map((ev) => (
          <tr key={ev.id} className="border-t">
            <td className="px-4 py-2">{ev.eventType}</td>

            <td className="px-4 py-2">
              {ev.signal ?? "—"}
            </td>

            <td className="px-4 py-2 text-sm text-gray-600">
              {ev.metadata ? JSON.stringify(ev.metadata) : "—"}
            </td>

            <td className="px-4 py-2">
              {new Date(ev.createdAt).toLocaleDateString()}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
