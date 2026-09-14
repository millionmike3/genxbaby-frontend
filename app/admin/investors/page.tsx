import { Suspense } from "react";

async function getInvestors(limit = 50) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/admin/investors?limit=${limit}`,
    { cache: "no-store" }
  );

  const json = await res.json();
  return json.data ?? [];
}

export default async function InvestorsPage() {
  const investors = await getInvestors();

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">Investors</h1>

      <Suspense fallback={<div>Loading...</div>}>
        <InvestorsTable rows={investors} />
      </Suspense>
    </div>
  );
}

function InvestorsTable({ rows }: { rows: any[] }) {
  return (
    <table className="min-w-full border border-gray-200 rounded-md">
      <thead className="bg-gray-50">
        <tr>
          <th className="px-4 py-2 text-left">Name</th>
          <th className="px-4 py-2 text-left">Email</th>
          <th className="px-4 py-2 text-left">Phone</th>
          <th className="px-4 py-2 text-left">Potential Score</th>
          <th className="px-4 py-2 text-left">Band</th>
          <th className="px-4 py-2 text-left">Created</th>
        </tr>
      </thead>

      <tbody>
        {rows.map((inv) => (
          <tr key={inv.id} className="border-t">
            <td className="px-4 py-2">{inv.name}</td>
            <td className="px-4 py-2">{inv.email ?? "—"}</td>
            <td className="px-4 py-2">{inv.phone ?? "—"}</td>

            <td className="px-4 py-2">
              {inv.investorPotentialScore ?? "—"}
            </td>

            <td className="px-4 py-2">
              {inv.investorPotentialBand ?? "—"}
            </td>

            <td className="px-4 py-2">
              {new Date(inv.createdAt).toLocaleDateString()}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
