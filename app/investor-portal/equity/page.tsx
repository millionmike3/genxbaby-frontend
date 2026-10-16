import { auth } from "@/lib/auth";
import { getPrisma } from "@/lib/db/prisma";
import { InvestorEquityGrowthChart } from "../_components/InvestorCharts";

export default async function InvestorEquityPage() {
  // 🔐 Read verified session from auth_token
  const session = await auth();
  if (!session?.user) {
    throw new Error("Not authenticated");
  }

  const prisma = await getPrisma();

  // Fetch 24 months of equity snapshots for chart
  const snapshots = await prisma.investorEquitySnapshot.findMany({
    where: { investorId: session.user.id },
    orderBy: { createdAt: "asc" },
    take: 24,
  });

  // Chart data
  const chartData = snapshots.map((s) => ({
    label: s.createdAt.toLocaleDateString(),
    equity: s.totalEquity ?? 0,
  }));

  // Latest snapshot for KPI cards
  const latest = snapshots[snapshots.length - 1];

  return (
    <div className="space-y-10">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold mb-4">Equity Growth</h1>
        <p className="text-slate-300 text-lg">
          Track your total equity, reinvestment, and appreciation over time.
        </p>
      </div>

      {/* Equity Growth Chart */}
      <InvestorEquityGrowthChart data={chartData} />

      {/* Latest Equity Snapshot */}
      {latest && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-slate-800/60 p-6 rounded-xl border border-slate-700">
            <h3 className="text-sm text-slate-300">Total Investor Equity</h3>
            <p className="text-3xl font-semibold mt-2">
              {`$${latest.totalEquity.toLocaleString()}`}
            </p>
          </div>

          <div className="bg-slate-800/60 p-6 rounded-xl border border-slate-700">
            <h3 className="text-sm text-slate-300">Equity Growth (YTD)</h3>
            <p className="text-3xl font-semibold mt-2">
              {`$${latest.growthYtd.toLocaleString()}`}
            </p>
          </div>

          <div className="bg-slate-800/60 p-6 rounded-xl border border-slate-700">
            <h3 className="text-sm text-slate-300">Reinvested Dividends</h3>
            <p className="text-3xl font-semibold mt-2">
              {`$${latest.reinvested.toLocaleString()}`}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
