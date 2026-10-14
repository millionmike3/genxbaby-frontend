
import { getPrisma } from "@/lib/db/prisma";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function MarginControlsHome() {
  const prisma = await getPrisma();

  const margins = await prisma.marginControl.findMany({
    orderBy: { name: "asc" }
  });

  return (
    <main className="min-h-screen bg-slate-950 text-white p-6 space-y-10">
      <h1 className="text-3xl font-bold text-[#3CF46B]">
        Margin Controls
      </h1>

      <p className="text-slate-300 text-sm">
        Admin and Owner control all margin rules applied across the LOS hierarchy.
      </p>

      <Link
        href="/owner/manage/pricing/margins/create"
        className="px-4 py-2 bg-[#3CF46B] text-black rounded-md text-sm hover:bg-[#32d05f]"
      >
        Add Margin Rule
      </Link>

      <section className="bg-neutral-900 border border-neutral-700 rounded-xl p-6">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-slate-400">
              <th className="text-left py-2">Name</th>
              <th className="text-left py-2">Scope</th>
              <th className="text-left py-2">Margin (bps)</th>
              <th className="text-left py-2">Actions</th>
            </tr>
          </thead>

          <tbody>
            {margins.map((rule) => (
              <tr key={rule.id} className="border-t border-neutral-800">
                <td className="py-2">{rule.name}</td>
                <td className="py-2">{rule.scope}</td>
                <td className="py-2">{rule.marginBps} bps</td>
                <td className="py-2">
                  <Link
                    href={`/owner/manage/pricing/margins/${rule.id}`}
                    className="text-[#3CF46B] underline"
                  >
                    Edit
                  </Link>
                  {" • "}
                  <Link
                    href={`/owner/manage/pricing/margins/${rule.id}/delete`}
                    className="text-red-400 underline"
                  >
                    Delete
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
