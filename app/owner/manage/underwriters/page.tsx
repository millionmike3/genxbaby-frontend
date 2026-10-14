
import { getPrisma } from "@/lib/db/prisma";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function ManageUnderwritersPage() {
  const prisma = await getPrisma();
  const underwriters = await prisma.underwriter.findMany({
    orderBy: { fullName: "asc" },
  });

  return (
    <main className="min-h-screen bg-slate-950 text-white p-6 space-y-10">
      <h1 className="text-3xl font-bold text-[#3CF46B]">Manage Underwriters</h1>

      <Link
        href="/owner/manage/underwriters/create"
        className="px-4 py-2 bg-[#3CF46B] text-black rounded-md text-sm hover:bg-[#32d05f]"
      >
        Add Underwriter
      </Link>

      <section className="bg-neutral-900 border border-neutral-700 rounded-xl p-6">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-slate-400">
              <th className="text-left py-2">Name</th>
              <th className="text-left py-2">Email</th>
              <th className="text-left py-2">Authority Level</th>
              <th className="text-left py-2">Actions</th>
            </tr>
          </thead>

          <tbody>
            {underwriters.map((u) => (
              <tr key={u.id} className="border-t border-neutral-800">
                <td className="py-2">{u.fullName}</td>
                <td className="py-2">{u.email}</td>
                <td className="py-2">{u.level}</td>
                <td className="py-2">
                  <Link
                    href={`/owner/manage/underwriters/${u.id}`}
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
