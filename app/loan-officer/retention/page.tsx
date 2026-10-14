
import { getPrisma } from "@/lib/db/prisma";

export const dynamic = "force-dynamic";

export default async function LoanOfficerRetentionPage() {
  const prisma = await getPrisma();

  const clients = await prisma.clientRetentionProfile.findMany({
    orderBy: { churnRiskScore: "desc" },
  });

  return (
    <main className="min-h-screen bg-slate-950 text-white p-6 space-y-10">
      <h1 className="text-3xl font-bold text-[#3CF46B]">
        Client Retention Intelligence
      </h1>

      <p className="text-slate-300 text-sm">
        Identify churn risk, refi opportunities, and high‑value relationships to protect and grow your book.
      </p>

      <section className="bg-neutral-900 border border-neutral-700 rounded-xl p-6">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-slate-400">
              <th className="text-left py-2">Client</th>
              <th className="text-left py-2">Loan</th>
              <th className="text-left py-2">Current Rate</th>
              <th className="text-left py-2">Market Rate</th>
              <th className="text-left py-2">Churn Risk</th>
              <th className="text-left py-2">Refi Opportunity</th>
              <th className="text-left py-2">Recommended Action</th>
            </tr>
          </thead>
          <tbody>
            {clients.map((c) => (
              <tr key={c.id} className="border-t border-neutral-800">
                <td className="py-2">{c.clientName}</td>
                <td className="py-2">{c.loanId}</td>
                <td className="py-2">{c.currentRate.toFixed(3)}%</td>
                <td className="py-2">{c.marketRate.toFixed(3)}%</td>
                <td className="py-2">
                  <span
                    className={
                      c.churnRiskScore >= 80
                        ? "text-red-400"
                        : c.churnRiskScore >= 50
                        ? "text-yellow-300"
                        : "text-[#3CF46B]"
                    }
                  >
                    {c.churnRiskScore}
                  </span>
                </td>
                <td className="py-2">
                  {c.refiOpportunity ? "Yes" : "No"}
                </td>
                <td className="py-2 text-slate-300">
                  {c.recommendedAction || "Review and contact client"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </main>
  );
}
