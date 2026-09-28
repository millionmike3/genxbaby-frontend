import { getPrisma } from "@/lib/db/prisma";
import { getSession } from "@/lib/session";
import { requireRole } from "@/lib/authz";

export default async function InvestorScoringPage() {
  await requireRole(["investor"]);

  const session = await getSession();
  const userId = Number(session.userId);

  const prisma = await getPrisma();

  const investor = await prisma.investor.findFirst({
    where: { userId },
    include: {
      investorRiskScore: true,
      investorBehaviorScore: true,
      investorLiquidityScore: true,
    },
  });

  const score = investor?.investorRiskScore?.score ?? null;

  return (
    <main className="px-6 md:px-12 lg:px-20 py-16 text-white bg-slate-900">
      <h1 className="text-4xl font-bold mb-6">Scoring</h1>

      {!investor ? (
        <p className="text-slate-400">
          No investor record found for this user.
        </p>
      ) : (
        <section className="grid md:grid-cols-3 gap-6">
          {/* Risk Score */}
          <div className="bg-slate-800/70 border border-slate-700 rounded-xl p-5">
            <h2 className="text-lg font-semibold mb-2">Risk Score</h2>
            <p className="text-3xl font-bold">
              {score?.toFixed(2) ?? "—"}
            </p>
          </div>

          {/* Behavior Score */}
          <div className="bg-slate-800/70 border border-slate-700 rounded-xl p-5">
            <h2 className="text-lg font-semibold mb-2">Behavior Score</h2>
            <p className="text-3xl font-bold">
              {investor.investorBehaviorScore?.behaviorScore?.toFixed(2) ?? "—"}
            </p>
          </div>

          {/* Liquidity Score */}
          <div className="bg-slate-800/70 border border-slate-700 rounded-xl p-5">
            <h2 className="text-lg font-semibold mb-2">Liquidity Score</h2>
            <p className="text-3xl font-bold">
              {investor.investorLiquidityScore?.liquidityScore?.toFixed(2) ?? "—"}
            </p>
          </div>
        </section>
      )}
    </main>
  );
}
