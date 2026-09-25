import { prisma } from "@/lib/prisma";
import { cookies } from "next/headers";
import { getSession } from "@/lib/session";

export default async function OwnerMortgagesPage() {
  const cookieStore = cookies();
  const token = cookieStore.get("session")?.value;

  const session = await getSession(token);
  if (!session) throw new Error("Not authenticated");
  if (session.role !== "owner") throw new Error("Unauthorized");

  const user = await prisma.user.findUnique({
    where: { id: Number(session.userId) },
  });

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
    <main className="px-6 md:px-12 lg:px-20 py-16 text-white bg-slate-900">
      <h1 className="text-4xl font-bold mb-6">Mortgage Assets</h1>

      {assets.length === 0 ? (
        <p className="text-slate-400">No mortgage assets found.</p>
      ) : (
        <div className="grid md:grid-cols-2 gap-6">
          {assets.map((asset) => (
            <div
              key={asset.id}
              className="bg-slate-800/60 border border-slate-700 p-6 rounded-xl"
            >
              <h2 className="text-xl font-semibold mb-2">
                Loan #{asset.id} — {asset.status}
              </h2>

              <p>
                <strong>Borrower:</strong>{" "}
                {asset.borrower?.fullName ?? "—"}
              </p>
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

              {asset.payments.length > 0 && (
                <div className="mt-4">
                  <h3 className="font-semibold mb-2">Recent Payments</h3>
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
    </main>
  );
}
