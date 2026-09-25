import { prisma } from "@/lib/prisma";
import { cookies } from "next/headers";
import { getSession } from "@/lib/session";

export default async function OwnerPortalOverviewPage() {
  // 1. Read JWT from cookie
  const cookieStore = cookies();
  const token = cookieStore.get("session")?.value;

  // 2. Validate session
  const session = await getSession(token);
  if (!session) {
    throw new Error("Not authenticated");
  }

  // 3. Enforce owner role
  if (session.role !== "owner") {
    throw new Error("Unauthorized: owner role required");
  }

  // 4. Fetch user from DB
  const user = await prisma.user.findUnique({
    where: { id: Number(session.userId) },
  });

  if (!user) {
    throw new Error("User not found");
  }

  // 5. Fetch Ownership Entities (LLCs)
  const ownershipEntities = await prisma.ownershipEntity.findMany({
    where: { ownerId: user.id },
    include: {
      properties: {
        include: {
          financials: true,
          ownerEquity: true,
          rentRoll: true,
        },
      },
    },
  });

  // 6. Fetch Mortgage Assets owned by this owner
  const mortgageAssets = await prisma.mortgageAsset.findMany({
    where: { ownerId: user.id },
    include: {
      performance: true,
      payments: {
        orderBy: { date: "desc" },
        take: 5,
      },
      borrower: true,
    },
  });

  return (
    <main className="px-6 md:px-12 lg:px-20 py-16 text-white bg-slate-900">
      <h1 className="text-4xl font-bold mb-4">Owner Portal</h1>
      <p className="text-slate-300 mb-8">
        Welcome, {user.email}. This dashboard reflects your real estate
        holdings, mortgage assets, cashflow, equity, and performance analytics.
      </p>

      {/* SECTION: Ownership Entities */}
      <section className="mb-12">
        <h2 className="text-3xl font-semibold mb-4">Ownership Entities</h2>

        {ownershipEntities.length === 0 ? (
          <p className="text-slate-400">No ownership entities found.</p>
        ) : (
          <div className="space-y-6">
            {ownershipEntities.map((entity) => (
              <div
                key={entity.id}
                className="bg-slate-800/60 border border-slate-700 p-6 rounded-xl"
              >
                <h3 className="text-2xl font-semibold mb-2">
                  {entity.name} ({entity.type})
                </h3>
                <p className="text-slate-400 mb-4">
                  EIN: {entity.ein ?? "—"} • Ownership:{" "}
                  {entity.ownershipPercent ?? "—"}%
                </p>

                {/* Properties under this LLC */}
                <div className="space-y-4">
                  {entity.properties.map((prop) => (
                    <div
                      key={prop.id}
                      className="bg-slate-900/40 p-4 rounded-lg border border-slate-700"
                    >
                      <h4 className="text-xl font-semibold mb-2">
                        {prop.address}, {prop.city}, {prop.state}
                      </h4>

                      <p className="text-slate-300">
                        <strong>Type:</strong> {prop.type}
                      </p>
                      <p className="text-slate-300">
                        <strong>Purchase Price:</strong>{" "}
                        {`$${prop.purchasePrice.toLocaleString()}`}
                      </p>
                      <p className="text-slate-300">
                        <strong>Current Value:</strong>{" "}
                        {prop.currentValue
                          ? `$${prop.currentValue.toLocaleString()}`
                          : "—"}
                      </p>

                      {/* Financials */}
                      {prop.financials && (
                        <div className="mt-3 text-sm text-slate-400">
                          <p>
                            <strong>NOI:</strong>{" "}
                            {prop.financials.noi
                              ? `$${prop.financials.noi.toLocaleString()}`
                              : "—"}
                          </p>
                          <p>
                            <strong>Cap Rate:</strong>{" "}
                            {prop.financials.capRate
                              ? `${prop.financials.capRate.toFixed(2)}%`
                              : "—"}
                          </p>
                          <p>
                            <strong>Expenses:</strong>{" "}
                            {prop.financials.expenses
                              ? `$${prop.financials.expenses.toLocaleString()}`
                              : "—"}
                          </p>
                        </div>
                      )}

                      {/* Equity */}
                      {prop.ownerEquity && (
                        <div className="mt-3 text-sm text-slate-400">
                          <p>
                            <strong>Equity:</strong>{" "}
                            {`$${prop.ownerEquity.equityAmount.toLocaleString()}`}
                          </p>
                          <p>
                            <strong>Equity %:</strong>{" "}
                            {prop.ownerEquity.equityPercent ?? "—"}%
                          </p>
                        </div>
                      )}

                      {/* Rent Roll */}
                      {prop.rentRoll.length > 0 && (
                        <div className="mt-4">
                          <h5 className="font-semibold mb-2">Rent Roll</h5>
                          <ul className="space-y-2 text-sm text-slate-300">
                            {prop.rentRoll.map((unit) => (
                              <li
                                key={unit.id}
                                className="border border-slate-700 rounded-lg p-3"
                              >
                                <p>
                                  <strong>Unit:</strong>{" "}
                                  {unit.unitNumber ?? "—"}
                                </p>
                                <p>
                                  <strong>Rent:</strong>{" "}
                                  {`$${unit.rent.toLocaleString()}`}
                                </p>
                                <p className="text-xs text-slate-500">
                                  Lease:{" "}
                                  {unit.leaseStart?.toLocaleDateString() ??
                                    "—"}{" "}
                                  →{" "}
                                  {unit.leaseEnd?.toLocaleDateString() ?? "—"}
                                </p>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* SECTION: Mortgage Assets */}
      <section>
        <h2 className="text-3xl font-semibold mb-4">Mortgage Assets</h2>

        {mortgageAssets.length === 0 ? (
          <p className="text-slate-400">No mortgage assets found.</p>
        ) : (
          <div className="grid md:grid-cols-2 gap-6">
            {mortgageAssets.map((asset) => (
              <div
                key={asset.id}
                className="bg-slate-800/60 border border-slate-700 p-6 rounded-xl"
              >
                <h3 className="text-xl font-semibold mb-2">
                  Loan #{asset.id} — {asset.status}
                </h3>

                <p className="text-slate-300">
                  <strong>Borrower:</strong>{" "}
                  {asset.borrower?.fullName ?? "—"}
                </p>
                <p className="text-slate-300">
                  <strong>Loan Amount:</strong>{" "}
                  {`$${asset.loanAmount.toLocaleString()}`}
                </p>
                <p className="text-slate-300">
                  <strong>Rate:</strong> {asset.interestRate.toFixed(3)}%
                </p>
                <p className="text-slate-300">
                  <strong>Balance:</strong>{" "}
                  {`$${asset.currentBalance.toLocaleString()}`}
                </p>

                {/* Performance */}
                {asset.performance && (
                  <div className="mt-3 text-sm text-slate-400">
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
                  <div className="mt-4">
                    <h4 className="font-semibold mb-2">Recent Payments</h4>
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
      </section>
    </main>
  );
}
