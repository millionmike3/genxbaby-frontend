import { Suspense } from "react";

async function getBorrowers(limit = 50) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/admin/borrowers?limit=${limit}`, {
    cache: "no-store",
  });

  const json = await res.json();
  return json.data ?? [];
}

export default async function BorrowersPage() {
  const borrowers = await getBorrowers();

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">Borrowers</h1>

      <Suspense fallback={<div>Loading...</div>}>
        <BorrowerTable rows={borrowers} />
      </Suspense>
    </div>
  );
}

function BorrowerTable({ rows }: { rows: any[] }) {
  return (
    <table className="min-w-full border border-gray-200 rounded-md">
      <thead className="bg-gray-50">
        <tr>
          <th className="px-4 py-2 text-left">Name</th>
          <th className="px-4 py-2 text-left">Email</th>
          <th className="px-4 py-2 text-left">Phone</th>
          <th className="px-4 py-2 text-left">Employer</th>
          <th className="px-4 py-2 text-left">Created</th>
        </tr>
      </thead>

      <tbody>
        {rows.map((b) => (
          <tr key={b.id} className="border-t">
            <td className="px-4 py-2">{b.fullName}</td>
            <td className="px-4 py-2">{b.email}</td>
            <td className="px-4 py-2">{b.phone ?? "—"}</td>
            <td className="px-4 py-2">{b.employer ?? "—"}</td>
            <td className="px-4 py-2">
              {new Date(b.createdAt).toLocaleDateString()}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
