import { auth } from "@/lib/auth";
import { getPrisma } from "@/lib/db/prisma";
import { InvestorTransactionsTimeline } from "../_components/InvestorTransactionsTimeline";

export default async function InvestorTransactionsPage() {
  // 🔐 Read verified session from auth_token
  const session = await auth();
  if (!session?.user) {
    throw new Error("Not authenticated");
  }

  const prisma = await getPrisma();

  // Fetch all transactions (contributions, distributions, reinvestments, transfers)
  const tx = await prisma.investorTransaction.findMany({
    where: { investorId: session.user.id },
    orderBy: { createdAt: "asc" },
    take: 50,
  });

  // Timeline chart data
  const chartData = tx.map((t) => ({
    label: t.createdAt.toLocaleDateString(),
    amount: t.amount,
  }));

  return (
    <div className="space-y-10">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold mb-4">Transactions</h1>
        <p className="text-slate-300 text-lg">
          Contributions, distributions, reinvestments, and transfers over time.
        </p>
      </div>

      {/* Timeline Chart */}
      <InvestorTransactionsTimeline data={chartData} />

      {/* Transaction Cards */}
      <div className="space-y-4">
        {tx
          .slice()
          .reverse()
          .map((t) => (
            <div
              key={t.id}
              className="bg-slate-800/60 p-6 rounded-xl border border-slate-700"
            >
              <h3 className="text-xl font-semibold">{t.type}</h3>
              <p className="text-3xl font-bold mt-2">
                {`$${t.amount.toLocaleString()}`}
              </p>
              <p className="text-slate-400 text-sm">
                {t.createdAt.toDateString()}
              </p>
            </div>
          ))}
      </div>
    </div>
  );
}
