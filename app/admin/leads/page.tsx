import { Suspense } from "react";

async function getLeads(limit = 50) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/admin/leads?limit=${limit}`,
    { cache: "no-store" }
  );

  const json = await res.json();
  return json.data ?? [];
}

export default async function LeadsPage() {
  const leads = await getLeads();

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">Leads</h1>

      <Suspense fallback={<div>Loading...</div>}>
        <LeadsTable rows={leads} />
      </Suspense>
    </div>
  );
}

function LeadsTable({ rows }: { rows: any[] }) {
  return (
    <table className="min-w-full border border-gray-200 rounded-md">
      <thead className="bg-gray-50">
        <tr>
          <th className="px-4 py-2 text-left">Name</th>
          <th className="px-4 py-2 text-left">Email</th>
          <th className="px-4 py-2 text-left">Fraud Score</th>
          <th className="px-4 py-2 text-left">Risk Score</th>
          <th className="px-4 py-2 text-left">Impulsiveness</th>
          <th className="px-4 py-2 text-left">Created</th>
        </tr>
      </thead>

      <tbody>
        {rows.map((lead) => {
          const score = lead.scores ?? {};

          return (
            <tr key={lead.id} className="border-t">
              <td className="px-4 py-2">{lead.name}</td>
              <td className="px-4 py-2">{lead.email ?? "—"}</td>

              <td className="px-4 py-2">
                {score.fraudScore ?? 0}
              </td>

              <td className="px-4 py-2">
                {score.riskScore ?? 0}
              </td>

              <td className="px-4 py-2">
                {score.impulsivenessScore ?? 0}
              </td>

              <td className="px-4 py-2">
                {new Date(lead.createdAt).toLocaleDateString()}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
