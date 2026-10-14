
import { getPrisma } from "@/lib/db/prisma";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function InvestorPricingHome() {
  const prisma = await getPrisma();

  const sheets = await prisma.investorRateSheet.findMany({
    orderBy: { investorName: "asc" }
  });

  return (
    <main className="min-h-screen bg-slate-950 text-white p-6 space-y-10">
      <h1 className="text-3xl font-bold text-[#3CF46B]">
        Investor Rate Sheets
      </h1>

      <p className="text-slate-300 text-sm">
        Admin and Owner control all investor pricing curves and delivery pricing.
      </p>

      <Link
        href="/owner/manage/pricing/investors/create"
        className="px-4 py-2 bg-[#3CF46B] text-black rounded-md text-sm hover:bg-[#32d05f]"
      >
        Add Investor Rate Sheet
      </Link>

      <section className="bg-neutral-900 border border-neutral-700 rounded-xl p-6">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-slate-400">
              <th className="text-left py-2">Investor</th>
              <th className="text-left py-2">Product</th>
              <th className="text-left py-2">Term</th>
              <th className="text-left py-2">Base Rate</th>
              <th className="text-left py-2">Margin</th>
              <th className="text-left py-2">Actions</th>
            </tr>
          </thead>

          <tbody>
            {sheets.map((sheet) => (
              <tr key={sheet.id} className="border-t border-neutral-800">
                <td className="py-2">{sheet.investorName}</td>
                <td className="py-2">{sheet.product}</td>
                <td className="py-2">{sheet.term} years</td>
                <td className="py-2">{sheet.baseRate.toFixed(3)}%</td>
                <td className="py-2">{sheet.marginBps} bps</td>
                <td className="py-2">
                  <Link
                    href={`/owner/manage/pricing/investors/${sheet.id}`}
                    className="text-[#3CF46B] underline"
                  >
                    Edit
                  </Link>
                  {" • "}
                  <Link
                    href={`/owner/manage/pricing/investors/${sheet.id}/delete`}
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
