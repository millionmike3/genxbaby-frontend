import { auth } from "@/lib/auth";
import { getPrisma } from "@/lib/db/prisma";

export default async function InvestorCommitmentsPage() {
  // 🔐 Read verified session from auth_token
  const session = await auth();
  if (!session?.user) {
    throw new Error("Not authenticated");
  }

  const prisma = await getPrisma();

  // Fetch commitments using unified session.user.id
  const commitments = await prisma.commitment.findMany({
    where: { investorId: session.user.id },
  });

  return (
    <div className="space-y-10 text-white">
      <h1 className="text-4xl font-bold mb-4">Commitments</h1>
      <p className="text-slate-300 text-lg">
        Review your committed capital across deals.
      </p>

      {commitments.length === 0 ? (
        <p className="text-slate-400">No commitments found.</p>
      ) : (
        <div className="space-y-6">
          {commitments.map((c) => (
            <div
              key={c.id}
              className="bg-slate-800/60 p-6 rounded-xl border border-slate-700"
            >
              <h2 className="text-xl font-semibold">Commitment #{c.id}</h2>
              <p className="text-slate-400 text-sm">
                Amount: ${c.amount.toLocaleString()}
              </p>
              <p className="text-slate-400 text-sm">
                Status: {c.status}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
