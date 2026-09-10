import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { ScoringDAL } from "@/lib/dal/scoring";
import { classify } from "@/lib/scoring";

export default async function OwnerDashboardPage() {
  const session = await auth();

  if (!session?.user) {
    return (
      <div className="p-6">
        <h1 className="text-xl font-semibold">Unauthorized</h1>
      </div>
    );
  }

  const ownerId = session.user.ownerId;

  if (!ownerId) {
    return (
      <div className="p-6">
        <h1 className="text-xl font-semibold">No owner profile found</h1>
      </div>
    );
  }

  // Fetch investors belonging to this owner
  const investors = await prisma.investor.findMany({
    where: { ownerId },
    include: { user: true },
  });

  // Fetch latest scores for each investor
  const investorScores = await Promise.all(
    investors.map(async (inv) => {
      const latest = await ScoringDAL.getLatestScores(inv.userId);
      return {
        investor: inv,
        latest,
      };
    })
  );

  // Compute portfolio-level risk
  const validScores = investorScores.filter((s) => s.latest);
  const avgRisk =
    validScores.length > 0
      ? validScores.reduce((acc, s) => acc + s.latest.riskScore, 0) /
        validScores.length
      : 0;

  const portfolioRiskBand = classify(avgRisk, "RISK");

  // Sort investors by risk descending
  const sortedInvestors = investorScores
    .filter((s) => s.latest)
    .sort((a, b) => b.latest.riskScore - a.latest.riskScore);

  return (
    <div className="p-6 space-y-10">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold">Owner Dashboard</h1>
        <p className="text-slate-400 text-sm">
          Portfolio overview for {session.user.email}
        </p>
      </div>

      {/* Portfolio Behavior Risk Card */}
      <section className="border border-slate-800 rounded-xl p-6 bg-slate-900/70">
        <h2 className="text-lg font-semibold mb-4">Portfolio Behavior Risk</h2>

        <div className="space-y-3 text-sm text-slate-200">
          <div>
            <strong>Portfolio Risk Band:</strong> {portfolioRiskBand}
          </div>

          <div>
            <strong>Average Risk Score:</strong> {avgRisk.toFixed(1)}
          </div>

          <div>
            <strong>Total Investors:</strong> {investors.length}
          </div>
        </div>
      </section>

      {/* Top Risky Investors Table */}
      <section className="border border-slate-800 rounded-xl p-6 bg-slate-900/70">
        <h2 className="text-lg font-semibold mb-4">Top Risky Investors</h2>

        {sortedInvestors.length === 0 ? (
          <p className="text-slate-400 text-sm">No scoring data available.</p>
        ) : (
          <table className="w-full text-sm text-slate-300">
            <thead>
              <tr className="text-left border-b border-slate-700">
                <th className="py-2">Investor</th>
                <th className="py-2">Risk Score</th>
                <th className="py-2">Impulsiveness</th>
                <th className="py-2">Band</th>
                <th className="py-2">Last Updated</th>
              </tr>
            </thead>
            <tbody>
              {sortedInvestors.map(({ investor, latest }) => (
                <tr key={investor.id} className="border-b border-slate-800">
                  <td className="py-2">{investor.email}</td>
                  <td className="py-2">{latest.riskScore}</td>
                  <td className="py-2">{latest.impulsivenessScore}</td>
                  <td className="py-2">
                    {classify(latest.riskScore, "RISK")}
                  </td>
                  <td className="py-2">
                    {new Date(latest.createdAt).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>
    </div>
  );
}
