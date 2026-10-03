"use server";

import { getPrisma } from "@/lib/db/prisma";
import { cookies } from "next/headers";
import { getSession } from "@/lib/session";

export default async function OwnerPortalMortgagesPage() {
  // Session is validated in OwnerPortalLayout, but we still need userId
  const cookieStore = await cookies(); // MUST be awaited in Next.js 16
  const token = cookieStore.get("session")?.value;

  const session = await getSession(token);
  if (!session) throw new Error("Not authenticated");

  const prisma = await getPrisma();

  // Fetch user
  const user = await prisma.user.findUnique({
    where: { id: Number(session.userId) },
  });

  if (!user) throw new Error("User not found");

  // Fetch mortgage assets
  const assets = await prisma.mortgageAsset.findMany({
    where: { ownerId: user.id },
    include: {
      borrower: true,
      performance: true,
      payments: {
        orderBy: { date: "desc" },
        take: 5,
      },
    },
  });

  return (
    <div className="space-y-10 text-white">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold mb-4">Mortgage Assets</h1>
        <p className="text-slate-300 text-lg">
          Review your mortgage-backed assets, including loan details, borrower
          information, performance metrics, and recent payment activity.
        </p>
      </div>

      {/* Mortgage Cards */}
      {assets.length === 0 ? (
        <p className="text-slate-400">No mortgage assets found.</p>
      ) : (
        <div className="grid md:grid-cols-2 gap-6">
          {assets.map((asset) => (
            <div
              key={asset.id}
              className="bg-slate-800/60 border border-slate-700 p-6 rounded-xl space-y-4"
            >
              {/* Loan Header */}
              <div>
                <h2 className="text-xl font-semibold">
                  Loan #{asset.id} — {asset.status}
                </h2>
                <p className="text-slate-400 text-sm">
                  Borrower: {asset.borrower?.fullName ?? "—"}
                </p>
              </div>

              {/* Loan Details */}
              <div className="space-y-1">
                <p>
                  <strong>Loan Amount:</strong>{" "}
                  {`$${asset.loanAmount.toLocaleString()}`}
                </p>
                <p>
                  <strong>Rate:</strong> {asset.interestRate.toFixed(3)}%
                </p>
                <p>
                  <strong>Balance:</strong>{" "}
                  {`$${asset.currentBalance.toLocaleString()}`}
                </p>
              </div>

              {/* Performance Metrics */}
              {asset.performance && (
                <div className="mt-3 text-sm text-slate-400 space-y-1">
                  <p>
                    <strong>DTI:</strong>{" "}
                    {asset.performance.dti
                      ? `${(asset.performance.dti * 100).toFixed(1)}%`
                      : "—"}
                  </p>
                  <p>
                    <strong>LTV:</strong>{" "}
                    {asset.performance.ltv
                      ? `${(asset.performance.ltv * 100).toFixed(1)}%`
                      : "—"}
                  </p>
                  <p>
                    <strong>Risk Score:</strong>{" "}
                    {asset.performance.riskScore?.toFixed(2) ?? "—"}
                  </p>
                </div>
              )}

              {/* Recent Payments */}
              {asset.payments.length > 0 && (
                <div className="mt-4 space-y-2">
                  <h3 className="font-semibold">Recent Payments</h3>
                  <ul className="space-y-2 text-sm text-slate-300">
                    {asset.payments.map((p) => (
                      <li
                        key={p.id}
                        className="border border-slate-700 rounded-lg p-3"
                      >
                        <p>
                          <strong>Amount:</strong>{" "}
                          {`$${p.amount.toLocaleString()}`}
                        </p>
                        <p className="text-xs text-slate-500">
                          {p.date.toLocaleDateString()}
                        </p>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
