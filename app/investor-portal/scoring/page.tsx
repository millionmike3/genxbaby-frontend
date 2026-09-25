import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/session";
import { requireRole } from "@/lib/authz";

export default async function InvestorScoringPage() {
  await requireRole(["investor"]);
  const user = await getCurrentUser();

  const investor = await prisma.investor.findFirst({
    where: { userId: user.id },
    include: {
      InvestorRiskScore: true,
      InvestorBehaviorScore: true,
      InvestorLiquidityScore: true,
    },
  });

  return (
    <main className="px-6 md:px-12 lg:px-20 py-16 text-white bg-slate-900">
      <h1 className="text-4xl font-bold mb-6">Scoring</h1>

      {!investor ? (
        <p className="text-slate-400">
          No investor record found for this user.
        </p>
      ) : (
        <section className="grid md:grid-cols-3 gap-6">
          <div className="bg-slate-800/70 border border-slate-700 rounded-xl p-5">
            <h2 className="text-lg font-semibold mb-2">Risk Score</h2>
            <p className="text-3xl font-bold">
              {investor.InvestorRiskScore?.score?.toFixed(2) ?? "—"}
            </p>
            <pre className="mt-3 text-xs bg-slate-900/70 p-3 rounded-lg text-slate-300">
              {JSON.stringify(
                investor.InvestorRiskScore?.factors ?? {},
                null,
                2
              )}
            </pre>
          </div>

          <div className="bg-slate-800/70 border border-slate-700 rounded-xl p-5">
            <h2 className="text-lg font-semibold mb-2">Behavior Score</h2>
            <p className="text-3xl font-bold">
              {investor.InvestorBehaviorScore?.behaviorScore?.toFixed(2) ??
                "—"}
            </p>
            <pre className="mt-3 text-xs bg-slate-900/70 p-3 rounded-lg text-slate-300">
              {JSON.stringify(
                investor.InvestorBehaviorScore?.patterns ?? {},
                null,
                2
              )}
            </pre>
          </div>

          <div className="bg-slate-800/70 border border-slate-700 rounded-xl p-5">
            <h2 className="text-lg font-semibold mb-2">Liquidity Score</h2>
            <p className="text-3xl font-bold">
              {investor.InvestorLiquidityScore?.liquidityScore?.toFixed(2) ??
                "—"}
            </p>
            <pre className="mt-3 text-xs bg-slate-900/70 p-3 rounded-lg text-slate-300">
              {JSON.stringify(
                investor.InvestorLiquidityScore?.metrics ?? {},
                null,
                2
              )}
            </pre>
          </div>
        </section>
      )}
    </main>
  );
}
