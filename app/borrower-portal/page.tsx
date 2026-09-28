import { prisma } from "@/lib/prisma";
import { cookies } from "next/headers";
import { getSession } from "@/lib/session";

export default async function BorrowerPortalOverviewPage() {
  // 1. Read JWT from cookie
  const cookieStore = await cookies();
  const token = cookieStore.get("session")?.value;

  // 2. Validate session
  const session = await getSession(token);
  if (!session) {
    throw new Error("Not authenticated");
  }

  // 3. Enforce borrower role
  if (session.role !== "borrower") {
    throw new Error("Unauthorized: borrower role required");
  }

  // 4. Fetch user from DB
  const user = await prisma.user.findUnique({
    where: { id: Number(session.userId) },
  });

  if (!user) {
    throw new Error("User not found");
  }

  // 5. Fetch borrower record + latest application
  const borrower = await prisma.borrower.findUnique({
    where: { userId: user.id },
    include: {
      applications: {
        orderBy: { createdAt: "desc" },
        take: 1,
        include: {
          underwriting: true,
          fraudEvents: true,
          documents: true,
        },
      },
      riskScore: true,
      behaviorScore: true,
      financialScore: true,
    },
  });

  const latestApp = borrower?.applications[0] ?? null;
  const uw = latestApp?.underwriting ?? null;

  return (
    <main className="px-6 md:px-12 lg:px-20 py-16 text-white bg-slate-900">
      <h1 className="text-4xl font-bold mb-4">Borrower Portal</h1>
      <p className="text-slate-300 mb-8">
        Welcome, {borrower?.fullName ?? user.email}. This view is powered by
        your live application, underwriting, fraud, and document intelligence.
      </p>

      {/* High-level borrower intelligence */}
      <section className="grid md:grid-cols-3 gap-6 mb-10">
        <div className="bg-slate-800/70 border border-slate-700 rounded-xl p-5">
          <h2 className="text-lg font-semibold mb-2">Risk Score</h2>
          <p className="text-3xl font-bold">
            {borrower?.riskScore?.score?.toFixed(2) ?? "—"}
          </p>
          <p className="text-xs text-slate-400 mt-2">
            BorrowerRiskScore (macro + behavioral + financial).
          </p>
        </div>

        <div className="bg-slate-800/70 border border-slate-700 rounded-xl p-5">
          <h2 className="text-lg font-semibold mb-2">Behavior Score</h2>
          <p className="text-3xl font-bold">
            {borrower?.behaviorScore?.behaviorScore?.toFixed(2) ?? "—"}
          </p>
          <p className="text-xs text-slate-400 mt-2">
            Session patterns, responsiveness, drift.
          </p>
        </div>

        <div className="bg-slate-800/70 border border-slate-700 rounded-xl p-5">
          <h2 className="text-lg font-semibold mb-2">Financial Score</h2>
          <p className="text-3xl font-bold">
            {borrower?.financialScore?.score?.toFixed(2) ?? "—"}
          </p>
          <p className="text-xs text-slate-400 mt-2">
            Income, assets, liabilities, reserves.
          </p>
        </div>
      </section>

      {/* Current application snapshot */}
      <section className="bg-slate-800/70 border border-slate-700 rounded-xl p-6 mb-10">
        <h2 className="text-2xl font-semibold mb-4">Current Application</h2>

        {latestApp ? (
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2 text-slate-300">
              <p>
                <span className="font-semibold">Loan Type:</span>{" "}
                {latestApp.loanType ?? "—"}
              </p>
              <p>
                <span className="font-semibold">Status:</span>{" "}
                {latestApp.status}
              </p>
              <p>
                <span className="font-semibold">Property:</span>{" "}
                {latestApp.propertyAddress ?? "—"}
              </p>
              <p>
                <span className="font-semibold">Purchase Price:</span>{" "}
                {latestApp.purchasePrice
                  ? `$${latestApp.purchasePrice.toLocaleString()}`
                  : "—"}
              </p>
              <p>
                <span className="font-semibold">Loan Amount:</span>{" "}
                {latestApp.loanAmount
                  ? `$${latestApp.loanAmount.toLocaleString()}`
                  : "—"}
              </p>
            </div>

            <div className="space-y-2 text-slate-300">
              <p>
                <span className="font-semibold">Income (Annual):</span>{" "}
                {latestApp.incomeAnnual
                  ? `$${latestApp.incomeAnnual.toLocaleString()}`
                  : "—"}
              </p>
              <p>
                <span className="font-semibold">Assets (Liquid):</span>{" "}
                {latestApp.assetsLiquid
                  ? `$${latestApp.assetsLiquid.toLocaleString()}`
                  : "—"}
              </p>
              <p>
                <span className="font-semibold">Behavior Score:</span>{" "}
                {latestApp.behaviorScore?.toFixed(2) ?? "—"}
              </p>
              <p>
                <span className="font-semibold">Fraud Score:</span>{" "}
                {latestApp.fraudScore?.toFixed(2) ?? "—"}
              </p>
              <p>
                <span className="font-semibold">Routing Score:</span>{" "}
                {latestApp.routingScore?.toFixed(2) ?? "—"}
              </p>
            </div>
          </div>
        ) : (
          <p className="text-slate-400">
            No application found yet. Start your first application to see live
            intelligence.
          </p>
        )}
      </section>

      {/* Underwriting intelligence */}
      <section className="bg-slate-800/70 border border-slate-700 rounded-xl p-6 mb-10">
        <h2 className="text-2xl font-semibold mb-4">Underwriting Snapshot</h2>

        {uw ? (
          <div className="grid md:grid-cols-3 gap-6 text-slate-300">
            <div>
              <p>
                <span className="font-semibold">DTI:</span>{" "}
                {uw.dti ? `${(uw.dti * 100).toFixed(1)}%` : "—"}
              </p>
              <p>
                <span className="font-semibold">LTV:</span>{" "}
                {uw.ltv ? `${(uw.ltv * 100).toFixed(1)}%` : "—"}
              </p>
              <p>
                <span className="font-semibold">CLTV:</span>{" "}
                {uw.cltv ? `${(uw.cltv * 100).toFixed(1)}%` : "—"}
              </p>
            </div>
            <div>
              <p>
                <span className="font-semibold">Reserves:</span>{" "}
                {uw.reservesMonths
                  ? `${uw.reservesMonths.toFixed(1)} months`
                  : "—"}
              </p>
              <p>
                <span className="font-semibold">LLPA:</span>{" "}
                {uw.llpa ? `${uw.llpa.toFixed(2)} pts` : "—"}
              </p>
              <p>
                <span className="font-semibold">Final Rate:</span>{" "}
                {uw.finalRate ? `${uw.finalRate.toFixed(3)}%` : "—"}
              </p>
            </div>
            <div>
              <p>
                <span className="font-semibold">Investor Decision:</span>{" "}
                {uw.investorDecision ?? "—"}
              </p>
              <p>
                <span className="font-semibold">Status:</span> {uw.status}
              </p>
              <p className="text-xs text-slate-400 mt-2">
                Reasons and investorReasons are available for deeper drill‑down
                views.
              </p>
            </div>
          </div>
        ) : (
          <p className="text-slate-400">
            Underwriting has not yet produced a case for this application.
          </p>
        )}
      </section>

      {/* Fraud + documents summary */}
      <section className="grid md:grid-cols-2 gap-6">
        <div className="bg-slate-800/70 border border-slate-700 rounded-xl p-6">
          <h2 className="text-xl font-semibold mb-3">Fraud & Signals</h2>
          {latestApp?.fraudEvents?.length ? (
            <ul className="space-y-2 text-slate-300 text-sm">
              {latestApp.fraudEvents.map((event) => (
                <li key={event.id} className="border border-slate-700 rounded-lg p-3">
                  <p>
                    <span className="font-semibold">Type:</span>{" "}
                    {event.eventType ?? "—"}
                  </p>
                  <p className="text-xs text-slate-400 mt-1">
                    Anchor: {event.anchorTxHash ?? "—"}
                  </p>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-slate-400 text-sm">
              No fraud events recorded yet for this application.
            </p>
          )}
        </div>

        <div className="bg-slate-800/70 border border-slate-700 rounded-xl p-6">
          <h2 className="text-xl font-semibold mb-3">Documents</h2>
          {latestApp?.documents?.length ? (
            <ul className="space-y-2 text-slate-300 text-sm">
              {latestApp.documents.map((doc) => (
                <li key={doc.id} className="border border-slate-700 rounded-lg p-3">
                  <p>
                    <span className="font-semibold">Type:</span> {doc.type}
                  </p>
                  <p>
                    <span className="font-semibold">Fraud Score:</span>{" "}
                    {doc.fraudScore?.toFixed(2) ?? "—"}
                  </p>
                  <p className="text-xs text-slate-400 mt-1">
                    URL: {doc.url}
                  </p>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-slate-400 text-sm">
              No documents uploaded yet for this application.
            </p>
          )}
        </div>
      </section>
    </main>
  );
}
