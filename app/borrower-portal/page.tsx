"use server";

import { getPrisma } from "@/lib/db/prisma";
import { cookies } from "next/headers";
import { getSession } from "@/lib/session";

export default async function BorrowerPortalOverviewPage() {
  // 1. Read JWT from cookie (must await cookies() in Next.js 16)
  const cookieStore = await cookies();
  const token = cookieStore.get("session")?.value;

  // 2. Validate session
  const session = await getSession(token);
  if (!session) throw new Error("Not authenticated");
  if (session.role !== "borrower")
    throw new Error("Unauthorized: borrower role required");

  const prisma = await getPrisma();

  // 3. Fetch user
  const user = await prisma.user.findUnique({
    where: { id: Number(session.userId) },
  });

  if (!user) throw new Error("User not found");

  // 4. Fetch borrower + latest application + intelligence
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

  const latestApp = borrower?.applications?.[0] ?? null;
  const uw = latestApp?.underwriting ?? null;

  return (
    <main className="px-6 md:px-12 lg:px-20 py-16 text-white bg-slate-900">
      {/* Header */}
      <h1 className="text-4xl font-bold mb-4">Borrower Portal</h1>

      <p className="text-slate-300 mb-8">
        Welcome, {borrower?.fullName ?? user.email}. This view is powered by your
        live application, underwriting, fraud, and document intelligence.
      </p>

      {/* High-level borrower intelligence */}
      <section className="grid md:grid-cols-3 gap-6 mb-10">
        {/* Risk Score */}
        <div className="bg-slate-800/70 border border-slate-700 rounded-xl p-5">
          <h2 className="text-lg font-semibold mb-2">Risk Score</h2>
          <p className="text-3xl font-bold">
            {borrower?.riskScore?.score?.toFixed(2) ?? "—"}
          </p>
          <p className="text-xs text-slate-400 mt-2">
            BorrowerRiskScore (macro + behavioral + financial).
          </p>
        </div>

        {/* Behavior Score */}
        <div className="bg-slate-800/70 border border-slate-700 rounded-xl p-5">
          <h2 className="text-lg font-semibold mb-2">Behavior Score</h2>
          <p className="text-3xl font-bold">
            {borrower?.behaviorScore?.behaviorScore?.toFixed(2) ?? "—"}
          </p>
          <p className="text-xs text-slate-400 mt-2">
            Session patterns, responsiveness, drift.
          </p>
        </div>

        {/* Financial Score */}
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
            {/* Column 1 */}
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

            {/* Column 2 */}
            <div className="space-y-2 text-slate-300">
              <p>
                <span className="font-semibold">Income (Annual):</span>{" "}
                {latestApp.incomeAnnual
                  ? `$${latestApp.incomeAnnual.toLocaleString()}`
                  : "N/A"}
              </p>
            </div>
          </div>
        ) : (
          <p className="text-slate-400">No active application.</p>
        )}
      </section>
    </main>
  );
}
