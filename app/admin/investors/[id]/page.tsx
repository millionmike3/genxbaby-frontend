import { prisma } from "@/lib/prisma";
import { ScoringDAL } from "@/lib/dal/scoring";
import { classify } from "@/lib/scoring";

interface PageProps {
  params: {
    id: string;
  };
}

export default async function InvestorDetailPage({ params }: PageProps) {
  const investorId = params.id;

  // Fetch investor record
  const investor = await prisma.investor.findUnique({
    where: { id: investorId },
  });

  if (!investor) {
    return (
      <div className="p-6">
        <h1 className="text-xl font-semibold">Investor not found</h1>
      </div>
    );
  }

  if (!investor.userId) {
    return (
      <div className="p-6">
        <h1 className="text-xl font-semibold">Investor has no associated user</h1>
      </div>
    );
  }

  // Fetch scoring history for the investor's user
  const scores = await ScoringDAL.getScoresForUser(String(investor.userId));
  const latest = scores.length > 0 ? scores[0] : null;

  return (
    <div className="p-6 space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold">Investor Detail</h1>
        <p className="text-slate-400 text-sm">{investor.email}</p>
      </div>

      {/* Behavior & Risk Panel */}
      <section className="border border-slate-800 rounded-xl p-6 bg-slate-900/70">
        <h2 className="text-lg font-semibold mb-4">Behavior & Risk</h2>

        {!latest ? (
          <p className="text-slate-400 text-sm">No scoring data available.</p>
        ) : (
          <div className="space-y-3 text-sm text-slate-200">
            <div>
              <strong>Fraud Score:</strong> {latest.fraudScore}
            </div>
            <div>
              <strong>Risk Score:</strong> {latest.riskScore}
            </div>
            <div>
              <strong>Impulsiveness Score:</strong> {latest.impulsivenessScore}
            </div>

            <div>
              <strong>Classification:</strong>{" "}
              {classify(latest.impulsivenessScore ?? 0, "INVESTOR")}

            </div>

            <div>
              <strong>Timestamp:</strong>{" "}
              {new Date(latest.createdAt).toLocaleString()}
            </div>

            <a
              href={`/admin/investors/${investorId}/behavior`}
              className="text-blue-400 hover:underline text-sm"
            >
              View full behavior history →
            </a>
          </div>
        )}
      </section>
    </div>
  );
}
