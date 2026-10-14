
import { getPrisma } from "@/lib/db/prisma";
import { ScoringDAL } from "@/lib/dal/scoring";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function InvestorPerformancePage() {
  const prisma = await getPrisma();

  // Fetch all investors with allocations + capital + userId for scoring
  const investors = await prisma.investor.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      allocations: {
        include: {
          mortgage: {
            include: {
              borrower: true,
              property: true,
              pricing: true,
              underwriting: true,
              fraud: true,
            },
          },
        },
      },
    },
  });

  // Fetch scoring for each investor
  const scoringMap = new Map<string, any>();

  for (const inv of investors) {
    if (!inv.userId) continue;
    const scores = await ScoringDAL.getScoresForUser(String(inv.userId));
    scoringMap.set(inv.id, scores.length > 0 ? scores[0] : null);
  }

  return (
    <main className="min-h-screen bg-slate-950 text-white p-6 space-y-16">
      {/* HEADER */}
      <header>
        <h1 className="text-3xl font-bold text-[#3CF46B] mb-2">
          Investor Performance & Risk Dashboard
        </h1>
        <p className="text-sm text-slate-400">
          Portfolio performance, capital deployment, risk exposure, and behavioral intelligence.
        </p>
      </header>

      {/* =============================== */}
      {/* PERFORMANCE TABLE */}
      {/* =============================== */}
      <section>
        <h2 className="text-xl font-semibold mb-4">Portfolio Overview</h2>

        <div className="bg-neutral-900 border border-neutral-700 rounded-xl overflow-hidden">
          <div className="grid grid-cols-6 gap-3 px-4 py-3 text-xs font-semibold text-slate-300 border-b border-neutral-700">
            <span>Investor</span>
            <span>Committed</span>
            <span>Deployed</span>
            <span>Allocations</span>
            <span>Risk</span>
            <span>Actions</span>
          </div>

          {investors.map((inv) => {
            const committed = inv.committedCapital ?? 0;
            const deployed = inv.deployedCapital ?? 0;
            const allocCount = inv.allocations.length;

            const score = scoringMap.get(inv.id);
            const riskScore = score?.riskScore ?? "—";
            const fraudScore = score?.fraudScore ?? "—";
            const impulsiveness = score?.impulsivenessScore ?? "—";

            return (
              <div
                key={inv.id}
                className="grid grid-cols-6 gap-3 px-4 py-3 text-xs border-b border-neutral-800 hover:bg-neutral-800/60 transition"
              >
                {/* Investor */}
                <div className="flex flex-col">
                  <span className="text-slate-100">{inv.name}</span>
                  <span className="text-slate-500">{inv.email}</span>
                </div>

                {/* Capital */}
                <div className="flex flex-col">
                  <span className="text-slate-100">${committed.toLocaleString()}</span>
                  <span className="text-slate-500">Committed</span>
                </div>

                <div className="flex flex-col">
                  <span className="text-slate-100">${deployed.toLocaleString()}</span>
                  <span className="text-slate-500">Deployed</span>
                </div>

                {/* Allocations */}
                <div className="flex flex-col">
                  <span className="text-slate-100">{allocCount}</span>
                  <span className="text-slate-500">Allocations</span>
                </div>

                {/* Risk */}
                <div className="flex flex-col">
                  <span className="text-slate-100">Risk: {riskScore}</span>
                  <span className="text-slate-500">Fraud: {fraudScore}</span>
                  <span className="text-slate-500">Beh: {impulsiveness}</span>
                </div>

                {/* Actions */}
                <div className="flex flex-col gap-2">
                  <Link
                    href={`/admin/investors/${inv.id}`}
                    className="px-3 py-1 bg-neutral-700 rounded-md text-sm hover:bg-neutral-600 transition text-center"
                  >
                    View Investor
                  </Link>
                  <Link
                    href={`/admin/investors/${inv.id}/allocate`}
                    className="px-3 py-1 bg-[#3CF46B] text-black rounded-md text-sm hover:bg-[#32d05f] transition text-center"
                  >
                    Allocate
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* =============================== */}
      {/* RISK HEATMAP */}
      {/* =============================== */}
      <section>
        <h2 className="text-xl font-semibold mb-4">Risk Heatmap</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {investors.map((inv) => {
            const score = scoringMap.get(inv.id);

            return (
              <div
                key={inv.id}
                className="bg-neutral-900 border border-neutral-700 rounded-xl p-6"
              >
                <h3 className="text-lg font-semibold mb-2">{inv.name}</h3>

                {!score ? (
                  <p className="text-slate-400 text-sm">No scoring data.</p>
                ) : (
                  <div className="space-y-2 text-sm">
                    <p>Fraud Score: {score.fraudScore}</p>
                    <p>Risk Score: {score.riskScore}</p>
                    <p>Impulsiveness: {score.impulsivenessScore}</p>
                    <p>
                      Classification:{" "}
                      {classify(score.impulsivenessScore ?? 0, "INVESTOR")}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>
    </main>
  );
}
