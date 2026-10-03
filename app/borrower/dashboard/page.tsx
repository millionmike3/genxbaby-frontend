import { Suspense } from "react";

async function getBorrowerDashboard() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/borrower/dashboard`,
    { cache: "no-store" }
  );

  const json = await res.json();
  return json.data ?? null;
}

export default async function BorrowerDashboardPage() {
  const dashboard = await getBorrowerDashboard();

  if (!dashboard) {
    return (
      <div className="min-h-screen bg-black text-white p-8">
        <h1 className="text-3xl font-bold text-[#3CF46B]">
          Borrower Dashboard
        </h1>
        <p className="mt-4 text-lg text-gray-400">
          No borrower data found.
        </p>
      </div>
    );
  }

  const { borrower, latestApplication, latestScore } = dashboard;

  return (
    <div className="min-h-screen bg-black text-white p-8 space-y-10">
      <h1 className="text-4xl font-bold text-[#3CF46B]">
        Borrower Dashboard
      </h1>

      <Suspense fallback={<div className="text-gray-400">Loading...</div>}>
        <BorrowerProfile borrower={borrower} />
        <BorrowerApplication app={latestApplication} />
        <BorrowerScores score={latestScore} />
      </Suspense>
    </div>
  );
}

function BorrowerProfile({ borrower }: { borrower: any }) {
  return (
    <section className="border border-neutral-700 rounded-xl p-6 bg-neutral-900 shadow-xl">
      <h2 className="text-xl font-semibold mb-4 text-[#3CF46B]">Profile</h2>

      <div className="space-y-2 text-sm">
        <div><strong>Name:</strong> {borrower.fullName}</div>
        <div><strong>Email:</strong> {borrower.email}</div>
        <div><strong>Phone:</strong> {borrower.phone ?? "—"}</div>
        <div><strong>Employer:</strong> {borrower.employer ?? "—"}</div>
        <div>
          <strong>Created:</strong>{" "}
          {new Date(borrower.createdAt).toLocaleDateString()}
        </div>
      </div>
    </section>
  );
}

function BorrowerApplication({ app }: { app: any }) {
  if (!app) {
    return (
      <section className="border border-neutral-700 rounded-xl p-6 bg-neutral-900 shadow-xl">
        <h2 className="text-xl font-semibold mb-4 text-[#3CF46B]">
          Latest Application
        </h2>
        <p className="text-sm text-gray-400">No applications found.</p>
      </section>
    );
  }

  return (
    <section className="border border-neutral-700 rounded-xl p-6 bg-neutral-900 shadow-xl">
      <h2 className="text-xl font-semibold mb-4 text-[#3CF46B]">
        Latest Application
      </h2>

      <div className="space-y-2 text-sm">
        <div>
          <strong>Loan Amount:</strong>{" "}
          ${app.loanAmount?.toLocaleString() ?? "—"}
        </div>
        <div><strong>Status:</strong> {app.status ?? "New"}</div>
        <div><strong>Credit Score:</strong> {app.creditScore ?? "—"}</div>
        <div><strong>DTI:</strong> {app.dti ?? "—"}</div>
        <div>
          <strong>Created:</strong>{" "}
          {new Date(app.createdAt).toLocaleDateString()}
        </div>
      </div>
    </section>
  );
}

function BorrowerScores({ score }: { score: any }) {
  if (!score) {
    return (
      <section className="border border-neutral-700 rounded-xl p-6 bg-neutral-900 shadow-xl">
        <h2 className="text-xl font-semibold mb-4 text-[#3CF46B]">
          Behavior Scores
        </h2>
        <p className="text-sm text-gray-400">No scoring data available.</p>
      </section>
    );
  }

  return (
    <section className="border border-neutral-700 rounded-xl p-6 bg-neutral-900 shadow-xl">
      <h2 className="text-xl font-semibold mb-4 text-[#3CF46B]">
        Behavior Scores
      </h2>

      <div className="space-y-2 text-sm">
        <div><strong>Fraud Score:</strong> {score.fraudScore}</div>
        <div><strong>Risk Score:</strong> {score.riskScore}</div>
        <div><strong>Impulsiveness:</strong> {score.impulsivenessScore}</div>
        <div>
          <strong>Last Updated:</strong>{" "}
          {new Date(score.createdAt).toLocaleString()}
        </div>
      </div>
    </section>
  );
}
