
import { getPrisma } from "@/lib/db/prisma";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function ManageLoanOfficersPage() {
  const prisma = await getPrisma();
  const officers = await prisma.loanOfficer.findMany({
    orderBy: { fullName: "asc" },
  });

  return (
    <main className="min-h-screen bg-slate-950 text-white p-6 space-y-10">
      <h1 className="text-3xl font-bold text-[#3CF46B]">Manage Loan Officers</h1>

      <Link
        href="/owner/manage/loan-officers/create"
        className="px-4 py-2 bg-[#3CF46B] text-black rounded-md text-sm hover:bg-[#32d05f]"
      >
        Add Loan Officer
      </Link>

      <section className="bg-neutral-900 border border-neutral-700 rounded-xl p-6">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-slate-400">
              <th className="text-left py-2">Name</th>
              <th className="text-left py-2">Email</th>
              <th className="text-left py-2">Pipeline</th>
              <th className="text-left py-2">Actions</th>
            </tr>
          </thead>

          <tbody>
            {officers.map((o) => (
              <tr key={o.id} className="border-t border-neutral-800">
                <td className="py-2">{o.fullName}</td>
                <td className="py-2">{o.email}</td>
                <td className="py-2">{o.pipelineCount}</td>
                <td className="py-2">
                  <Link
                    href={`/owner/manage/loan-officers/${o.id}`}
                    className="text-[#3CF46B] underline"
                  >
                    View
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </main>
  );
}
