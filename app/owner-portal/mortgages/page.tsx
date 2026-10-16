import { getPrisma } from "@/lib/db/prisma";
import { cookies } from "next/headers";
import { getSession } from "@/lib/session";

export default async function OwnerPortalMortgagesPage() {
  // Correct cookie (NOT "session")
  const cookieStore = await cookies();
  const token = cookieStore.get("auth_token")?.value;

  if (!token) throw new Error("Not authenticated");

  // Parse JWT
  const session = await getSession(token);
  if (!session) throw new Error("Not authenticated");

  const prisma = await getPrisma();

  // Fetch user (User.id is Int)
  const user = await prisma.user.findUnique({
    where: { id: session.id },
  });

  if (!user) throw new Error("User not found");

  // Fetch owner (Owner.userId is Int)
  const owner = await prisma.owner.findFirst({
    where: { userId: user.id },
  });

  if (!owner) throw new Error("Owner record not found");

  // Fetch mortgage assets (MortgageAsset.ownerId is String → use owner.id)
  const mortgageAssets = await prisma.mortgageAsset.findMany({
    where: { ownerId: owner.id },
    include: {
      payments: true,
      performance: true,
      borrower: true,
    },
  });

  return (
    <div className="space-y-10 text-white px-6 md:px-12 lg:px-20 py-16 bg-slate-900">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold mb-4">Mortgage Assets</h1>
        <p className="text-slate-300 text-lg">
          View all mortgage assets associated with your ownership profile,
          including balances, payments, performance metrics, and borrower details.
        </p>
      </div>

      {/* Mortgage Assets */}
      {mortgageAssets.length === 0 ? (
        <p className="text-slate-400">No mortgage assets found.</p>
      ) : (
        mortgageAssets.map((asset) => (
          <section
            key={asset.id}
            className="bg-slate-800/60 p-6 rounded-xl border border-slate-700 space-y-6"
          >
            {/* Asset Header */}
            <div>
              <h2 className="text-2xl font-semibold mb-2">
                Mortgage #{asset.id.slice(0, 8)}
              </h2>
              <p className="text-slate-400">
                Status: {asset.status} • Balance: $
                {asset.currentBalance.toLocaleString()}
              </p>
            </div>

            {/* Borrower */}
            {asset.borrower && (
              <div className="text-slate-300 text-sm space-y-1">
                <p>
                  <strong>Borrower:</strong> {asset.borrower.fullName}
                </p>
                <p>
                  <strong>Email:</strong> {asset.borrower.email}
                </p>
              </div>
            )}

            {/* Performance */}
            {asset.performance && (
              <div className="text-sm text-slate-400 space-y-1">
                <p>
                  <strong>Risk Score:</strong>{" "}
                  {asset.performance.riskScore ?? "—"}
                </p>
                <p>
                  <strong>Behavior Score:</strong>{" "}
                  {asset.performance.behaviorScore ?? "—"}
                </p>
                <p>
                  <strong>LTV:</strong> {asset.performance.ltv ?? "—"}
                </p>
                <p>
                  <strong>DTI:</strong> {asset.performance.dti ?? "—"}
                </p>
              </div>
            )}

            {/* Payments */}
            {asset.payments.length > 0 && (
              <div className="space-y-2">
                <h4 className="font-semibold">Payment History</h4>
                <ul className="space-y-2 text-sm text-slate-300">
                  {asset.payments.map((p) => (
                    <li
                      key={p.id}
                      className="border border-slate-700 rounded-lg p-3"
                    >
                      <p>
                        <strong>Date:</strong>{" "}
                        {new Date(p.date).toLocaleDateString()}
                      </p>
                      <p>
                        <strong>Amount:</strong>{" "}
                        {`$${p.amount.toLocaleString()}`}
                      </p>
                      <p>
                        <strong>Principal:</strong>{" "}
                        {p.principal ?? "—"}
                      </p>
                      <p>
                        <strong>Interest:</strong>{" "}
                        {p.interest ?? "—"}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </section>
        ))
      )}
    </div>
  );
}
