import { prisma } from "@/lib/prisma";
import { cookies } from "next/headers";
import { getSession } from "@/lib/session";

export default async function InvestorScoringPage() {
  // 1. Read JWT from cookie
  const cookieStore = await cookies();
  const token = cookieStore.get("session")?.value;

  // 2. Validate session
  const session = await getSession(token);
  if (!session) {
    throw new Error("Not authenticated");
  }

  // 3. Enforce investor role
  if (session.role !== "investor") {
    throw new Error("Unauthorized: investor role required");
  }

  // 4. Fetch user from DB
  const user = await prisma.user.findUnique({
    where: { id: Number(session.userId) },
  });

  if (!user) {
    throw new Error("User not found");
  }

  // 5. Fetch investor scoring records
  const investor = await prisma.investor.findFirst({
    where: { userId: user.id },
    include: {
      investorRiskScore: true,
      investorBehaviorScore: true,
      investorLiquidityScore: true,
    },
  });

  if (!investor) {
    return (
      <main className="px-6 md:px-12 lg:px-20 py-16 text-white bg-slate-900">
        <h1 className="text-4xl font-bold mb-4">Investor Scoring</h1>
        <p className="text-slate-300">No investor record found.</p>
      </main>
    );
  }

  return (
    <main className="px-6 md:px-12 lg:px-20 py-16 text-white bg-slate-900">
      <h1 className="text-4xl font-bold mb-6">Scoring</h1>

      <section className="grid md:grid-cols-3 gap-6">
        {/* Risk Score */}
        <div className="bg-slate-800/70 border border-slate-700 rounded-xl p-5">
          <h2 className="text-lg font-semibold mb-2">Risk Score</h2>
          <p className="text-3xl font-bold">
            {investor.investorRiskScore?.score?.toFixed(2) ?? "—"}
          </p>
          <pre className="mt-3 text-xs bg-slate-900/70 p-3 rounded-lg text-slate-300">
            {JSON.stringify(investor.investorRiskScore?.factors ?? {}, null, 2)}
          </pre>
        </div>

        {/* Behavior Score */}
        <div className="bg-slate-800/70 border border-slate-700 rounded-xl p-5">
          <h2 className="text-lg font-semibold mb-2">Behavior Score</h2>
          <p className="text-3xl font-bold">
            {investor.investorBehaviorScore?.behaviorScore?.toFixed(2) ?? "—"}
          </p>
          <pre className="mt-3 text-xs bg-slate-900/70 p-3 rounded-lg text-slate-300">
            {JSON.stringify(
              investor.investorBehaviorScore?.patterns ?? {},
              null,
              2
            )}
          </pre>
        </div>

        {/* Liquidity Score */}
        <div className="bg-slate-800/70 border border-slate-700 rounded-xl p-5">
          <h2 className="text-lg font-semibold mb-2">Liquidity Score</h2>
          <p className="text-3xl font-bold">
            {investor.investorLiquidityScore?.liquidityScore?.toFixed(2) ?? "—"}
          </p>
          <pre className="mt-3 text-xs bg-slate-900/70 p-3 rounded-lg text-slate-300">
            {JSON.stringify(
              investor.investorLiquidityScore?.metrics ?? {},
              null,
              2
            )}
          </pre>
        </div>
      </section>
    </main>
  );
}
