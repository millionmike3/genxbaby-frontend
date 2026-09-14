import { Suspense } from "react";

async function getApplications(limit = 50) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/admin/applications?limit=${limit}`,
    { cache: "no-store" }
  );

  const json = await res.json();
  return json.data ?? [];
}

export default async function ApplicationsPage() {
  const applications = await getApplications();

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">Applications</h1>

      <Suspense fallback={<div>Loading...</div>}>
        <ApplicationsTable rows={applications} />
      </Suspense>
    </div>
  );
}

function ApplicationsTable({ rows }: { rows: any[] }) {
  return (
    <table className="min-w-full border border-gray-200 rounded-md">
      <thead className="bg-gray-50">
        <tr>
          <th className="px-4 py-2 text-left">Borrower</th>
          <th className="px-4 py-2 text-left">Email</th>
          <th className="px-4 py-2 text-left">Loan Amount</th>
          <th className="px-4 py-2 text-left">Status</th>
          <th className="px-4 py-2 text-left">Fraud Score</th>
          <th className="px-4 py-2 text-left">Underwriting Score</th>
          <th className="px-4 py-2 text-left">Created</th>
        </tr>
      </thead>

      <tbody>
        {rows.map((app) => (
          <tr key={app.id} className="border-t">
            <td className="px-4 py-2">
              {app.borrower?.fullName ?? "Unknown"}
            </td>

            <td className="px-4 py-2">
              {app.borrower?.email ?? "—"}
            </td>

            <td className="px-4 py-2">
              {app.loanAmount ? `$${app.loanAmount.toLocaleString()}` : "—"}
            </td>

            <td className="px-4 py-2">
              {app.status ?? "New"}
            </td>

            <td className="px-4 py-2">
              {app.fraudScore ?? 0}
            </td>

            <td className="px-4 py-2">
              {app.underwritingScore ?? 0}
            </td>

            <td className="px-4 py-2">
              {new Date(app.createdAt).toLocaleDateString()}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
