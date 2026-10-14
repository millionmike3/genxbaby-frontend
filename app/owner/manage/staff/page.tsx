
import { getPrisma } from "@/lib/db/prisma";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function ManageStaffPage() {
  const prisma = await getPrisma();
  const staff = await prisma.staff.findMany({
    orderBy: { fullName: "asc" },
  });

  return (
    <main className="min-h-screen bg-slate-950 text-white p-6 space-y-10">
      <h1 className="text-3xl font-bold text-[#3CF46B]">Manage Staff</h1>

      <Link
        href="/owner/manage/staff/create"
        className="px-4 py-2 bg-[#3CF46B] text-black rounded-md text-sm hover:bg-[#32d05f]"
      >
        Add Staff Member
      </Link>

      <section className="bg-neutral-900 border border-neutral-700 rounded-xl p-6">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-slate-400">
              <th className="text-left py-2">Name</th>
              <th className="text-left py-2">Email</th>
              <th className="text-left py-2">Status</th>
              <th className="text-left py-2">Actions</th>
            </tr>
          </thead>

          <tbody>
            {staff.map((s) => (
              <tr key={s.id} className="border-t border-neutral-800">
                <td className="py-2">{s.fullName}</td>
                <td className="py-2">{s.email}</td>
                <td className="py-2">{s.status}</td>
                <td className="py-2">
                  <Link
                    href={`/owner/manage/staff/${s.id}`}
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
