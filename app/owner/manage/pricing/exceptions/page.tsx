
import { getPrisma } from "@/lib/db/prisma";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function PricingExceptionsHome() {
  const prisma = await getPrisma();

  const exceptions = await prisma.pricingException.findMany({
    orderBy: { name: "asc" }
  });

  return (
    <main className="min-h-screen bg-slate-950 text-white p-6 space-y-10">
      <h1 className="text-3xl font-bold text-[#3CF46B]">
        Pricing Exceptions
      </h1>

      <p className="text-slate-300 text-sm">
        Admin and Owner control all pricing exceptions across the LOS hierarchy.
      </p>

      <Link
        href="/owner/manage/pricing/exceptions/create"
        className="px-4 py-2 bg-[#3CF46B] text-black rounded-md text-sm hover:bg-[#32d05f]"
      >
        Add Pricing Exception
      </Link>

      <section className="bg-neutral-900 border border-neutral-700 rounded-xl p-6">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-slate-400">
              <th className="text-left py-2">Name</th>
              <th className="text-left py-2">Scope</th>
              <th className="text-left py-2">Adjustment (bps)</th>
              <th className="text-left py-2">Expires</th>
              <th className="text-left py-2">Actions</th>
            </tr>
          </thead>

          <tbody>
            {exceptions.map((ex) => (
              <tr key={ex.id} className="border-t border-neutral-800">
                <td className="py-2">{ex.name}</td>
                <td className="py-2">{ex.scope}</td>
                <td className="py-2">{ex.adjustmentBps} bps</td>
                <td className="py-2">
                  {ex.expiresAt ? new Date(ex.expiresAt).toLocaleDateString() : "Never"}
                </td>
                <td className="py-2">
                  <Link
                    href={`/owner/manage/pricing/exceptions/${ex.id}`}
                    className="text-[#3CF46B] underline"
                  >
                    Edit
                  </Link>
                  {" • "}
                  <Link
                    href={`/owner/manage/pricing/exceptions/${ex.id}/delete`}
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

