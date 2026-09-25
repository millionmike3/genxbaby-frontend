import { prisma } from "@/lib/prisma";
import { cookies } from "next/headers";
import { getSession } from "@/lib/session";

export default async function InvestorPortalOverviewPage() {
  const cookieStore = cookies();
  const token = cookieStore.get("session")?.value;

  const session = await getSession(token);
  if (!session) throw new Error("Not authenticated");
  if (session.role !== "investor") throw new Error("Unauthorized");

  const user = await prisma.user.findUnique({
    where: { id: Number(session.userId) },
  });

  const investor = await prisma.investor.findFirst({
    where: { userId: user.id },
    include: {
      investorRiskScore: true,
      investorBehaviorScore: true,
      investorLiquidityScore: true,
      investorLiquidity: true,
      investorPerformanceSnapshot: {
        orderBy: { createdAt: "desc" },
        take: 1,
      },
      investorCapitalFlow: {
        orderBy: { createdAt: "desc" },
        take: 3,
      },
      investorDiversificationAnalytics: {
        orderBy: { createdAt: "desc" },
        take: 1,
      },
      investorAllocationDynamics: {
        orderBy: { createdAt: "desc" },
        take: 1,
      },
    },
  });

  if (!investor) {
    return (
      <main className="px-6 md:px-12 lg:px-20 py-16 text-white bg-slate-900">
        <h1 className="text-4xl font-bold mb-4">Investor Portal</h1>
        <p className="text-slate-300">No investor record found.</p>
      </main>
    );
  }

  const perf = investor.investorPerformanceSnapshot[0] ?? null;
  const div = investor.investorDiversificationAnalytics[0] ?? null;
  const alloc = investor.investorAllocationDynamics[0] ?? null;

  return (
    <main className="px-6 md:px-12 lg:px-20 py-16 text-white bg-slate-900">
      <h1 className="text-4xl font-bold mb-2">Investor Portal</h1>
      <p className="text-slate-300 mb-8">
        Welcome, {investor.name}. This view is powered by your live positions,
        scoring, liquidity, and performance data.
      </p>

      {/* Top scoring cards */}
      <section className="grid md:grid-cols-3 gap-6 mb-10">
        <div className="bg-slate-800/70 border border-slate-700 rounded-xl p-5">
          <h2 className="text-lg font-semibold mb-2">Risk Score</h2>
          <p className="text-3xl font-bold">
            {investor.investorRiskScore?.score?.toFixed(2) ?? "—"}
          </p>
        </div>

        <div className="bg-slate-800/70 border border-slate-700 rounded-xl p-5">
          <h2 className="text-lg font-semibold mb-2">Behavior Score</h2>
          <p className="text-3xl font-bold">
            {investor.investorBehaviorScore?.behaviorScore?.toFixed(2) ?? "—"}
          </p>
        </div>

        <div className="bg-slate-800/70 border border-slate-700 rounded-xl p-5">
          <h2 className="text-lg font-semibold mb-2">Liquidity Score</h2>
          <p className="text-3xl font-bold">
            {investor.investorLiquidityScore?.liquidityScore?.toFixed(2) ?? "—"}
          </p>
        </div>
      </section>

      {/* Performance + diversification */}
      <section className="grid md:grid-cols-2 gap-6 mb-10">
        <div className="bg-slate-800/70 border border-slate-700 rounded-xl p-6">
          <h2 className="text-2xl font-semibold mb-3">Performance Snapshot</h2>
          {perf ? (
            <ul className="space-y-2 text-slate-300">
              <li>
                <strong>IRR:</strong>{" "}
                {perf.metrics?.irr
                  ? `${(perf.metrics.irr * 100).toFixed(2)}%`
                  : "—"}
              </li>
              <li>
                <strong>Realized Yield:</strong>{" "}
                {perf.metrics?.realizedYield
                  ? `${(perf.metrics.realizedYield * 100).toFixed(2)}%`
                  : "—"}
              </li>
              <li>
                <strong>Unrealized Gain:</strong>{" "}
                {perf.metrics?.unrealizedGain
                  ? `${(perf.metrics.unrealizedGain * 100).toFixed(2)}%`
                  : "—"}
              </li>
            </ul>
          ) : (
            <p className="text-slate-400">No performance snapshot yet.</p>
          )}
        </div>

        <div className="bg-slate-800/70 border border-slate-700 rounded-xl p-6">
          <h2 className="text-2xl font-semibold mb-3">
            Diversification & Allocation
          </h2>
          {div ? (
            <ul className="space-y-2 text-slate-300">
              <li>
                <strong>Diversification Score:</strong>{" "}
                {div.diversificationScore?.toFixed(2) ?? "—"}
              </li>
              <li>
                <strong>Factors:</strong>{" "}
                {JSON.stringify(div.factors ?? {})}
              </li>
            </ul>
          ) : (
            <p className="text-slate-400">No diversification analytics yet.</p>
          )}

          {alloc && (
            <div className="mt-4 text-slate-300 text-sm">
              <p className="font-semibold mb-1">Allocation Mix:</p>
              <pre className="bg-slate-900/70 p-3 rounded-lg text-xs">
                {JSON.stringify(alloc.allocation ?? {}, null, 2)}
              </pre>
            </div>
          )}
        </div>
      </section>

      {/* Capital flows */}
      <section className="bg-slate-800/70 border border-slate-700 rounded-xl p-6">
        <h2 className="text-2xl font-semibold mb-3">Recent Capital Flows</h2>
        {investor.investorCapitalFlow.length ? (
          <ul className="space-y-3 text-slate-300 text-sm">
            {investor.investorCapitalFlow.map((flow) => (
              <li
                key={flow.id}
                className="border border-slate-700 rounded-lg p-3"
              >
                <p>
                  <strong>Type:</strong> {flow.flowType ?? "—"}
                </p>
                <p>
                  <strong>Amount:</strong>{" "}
                  {flow.flowAmount
                    ? `$${flow.flowAmount.toLocaleString()}`
                    : "—"}
                </p>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-slate-400 text-sm">
            No capital flow events recorded yet.
          </p>
        )}
      </section>
    </main>
  );
}
