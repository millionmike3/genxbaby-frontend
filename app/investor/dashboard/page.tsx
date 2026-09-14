import { Suspense } from "react";

async function getInvestorDashboard() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/investor/dashboard`,
    { cache: "no-store" }
  );

  const json = await res.json();
  return json.data ?? null;
}

export default async function InvestorDashboardPage() {
  const dashboard = await getInvestorDashboard();

  if (!dashboard) {
    return (
      <div className="p-6">
        <h1 className="text-xl font-semibold">No investor data found</h1>
      </div>
    );
  }

  const { investor, latestScore, portfolio } = dashboard;

  return (
    <div className="p-6 space-y-10">
      <h1 className="text-2xl font-bold">Investor Dashboard</h1>

      <Suspense fallback={<div>Loading...</div>}>
        <InvestorProfile investor={investor} />
        <InvestorScores score={latestScore} />
        <InvestorPortfolio portfolio={portfolio} />
      </Suspense>
    </div>
  );
}

function InvestorProfile({ investor }: { investor: any }) {
  return (
    <section className="border rounded-xl p-6 bg-white shadow-sm">
      <h2 className="text-lg font-semibold mb-4">Profile</h2>

      <div className="space-y-2 text-sm">
        <div><strong>Name:</strong> {investor.name}</div>
        <div><strong>Email:</strong> {investor.email}</div>
        <div><strong>Phone:</strong> {investor.phone ?? "—"}</div>
        <div><strong>Created:</strong> {new Date(investor.createdAt).toLocaleDateString()}</div>
      </div>
    </section>
  );
}

function InvestorScores({ score }: { score: any }) {
  if (!score) {
    return (
      <section className="border rounded-xl p-6 bg-white shadow-sm">
        <h2 className="text-lg font-semibold mb-4">Behavior Scores</h2>
        <p className="text-sm text-gray-500">No scoring data available.</p>
      </section>
    );
  }

  return (
    <section className="border rounded-xl p-6 bg-white shadow-sm">
      <h2 className="text-lg font-semibold mb-4">Behavior Scores</h2>

      <div className="space-y-2 text-sm">
        <div><strong>Fraud Score:</strong> {score.fraudScore}</div>
        <div><strong>Risk Score:</strong> {score.riskScore}</div>
        <div><strong>Impulsiveness:</strong> {score.impulsivenessScore}</div>
        <div><strong>Last Updated:</strong> {new Date(score.createdAt).toLocaleString()}</div>
      </div>
    </section>
  );
}

function InvestorPortfolio({ portfolio }: { portfolio: any }) {
  if (!portfolio) {
    return (
      <section className="border rounded-xl p-6 bg-white shadow-sm">
        <h2 className="text-lg font-semibold mb-4">Portfolio</h2>
        <p className="text-sm text-gray-500">No portfolio data available.</p>
      </section>
    );
  }

  return (
    <section className="border rounded-xl p-6 bg-white shadow-sm">
      <h2 className="text-lg font-semibold mb-4">Portfolio Overview</h2>

      <div className="space-y-2 text-sm">
        <div><strong>Total Applications:</strong> {portfolio.totalApplications}</div>
        <div><strong>Active Investments:</strong> {portfolio.activeInvestments}</div>
        <div><strong>Pipeline Position:</strong> {portfolio.pipelinePosition}</div>
        <div><strong>Risk Band:</strong> {portfolio.riskBand}</div>
      </div>
    </section>
  );
}
