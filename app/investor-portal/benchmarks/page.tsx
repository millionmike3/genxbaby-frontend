import { auth } from "@/lib/auth";
import { getPrisma } from "@/lib/db/prisma";
import { InvestorBenchmarkChart } from "../_components/InvestorBenchmarkChart";

export default async function InvestorBenchmarkPage() {
  // 🔐 Read verified session from auth_token
  const session = await auth();
  if (!session?.user) {
    throw new Error("Not authenticated");
  }

  const prisma = await getPrisma();

  // Fetch equity snapshots
  const snapshots = await prisma.investorEquitySnapshot.findMany({
    where: { investorId: session.user.id },
    orderBy: { createdAt: "asc" },
    take: 24,
  });

  // Fetch benchmark snapshots
  const benchmarks = await prisma.investorBenchmarkSnapshot.findMany({
    where: { investorId: session.user.id },
    orderBy: { createdAt: "asc" },
    take: 24,
  });

  // Build chart data
  const chartData = snapshots.map((snap, i) => {
    const b = benchmarks[i];

    return {
      label: snap.createdAt.toLocaleDateString(),
      portfolio: snap.totalEquity ?? 0,
      sp500: b?.sp500 ?? 0,
      reit: b?.reit ?? 0,
      bond: b?.bond ?? 0,
    };
  });

  const latest = benchmarks[benchmarks.length - 1];

  return (
    <div className="space-y-10">
      <div>
        <h1 className="text-4xl font-bold mb-4">Benchmark Comparison</h1>
        <p className="text-slate-300 text-lg">
          Compare your portfolio performance against major market benchmarks.
        </p>
      </div>

      <InvestorBenchmarkChart data={chartData} />

      {latest && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-slate-800/60 p-6 rounded-xl border border-slate-700">
            <h3 className="text-sm text-slate-300">Your Portfolio</h3>
            <p className="text-3xl font-semibold mt-2">
              {`${latest.portfolioReturn.toFixed(2)}%`}
            </p>
          </div>

          <div className="bg-slate-800/60 p-6 rounded-xl border border-slate-700">
            <h3 className="text-sm text-slate-300">S&P 500</h3>
            <p className="text-3xl font-semibold mt-2">
              {`${latest.sp500Return.toFixed(2)}%`}
            </p>
          </div>

          <div className="bg-slate-800/60 p-6 rounded-xl border border-slate-700">
            <h3 className="text-sm text-slate-300">REIT Index</h3>
            <p className="text-3xl font-semibold mt-2">
              {`${latest.reitReturn.toFixed(2)}%`}
            </p>
          </div>

          <div className="bg-slate-800/60 p-6 rounded-xl border border-slate-700">
            <h3 className="text-sm text-slate-300">Bond Index</h3>
            <p className="text-3xl font-semibold mt-2">
              {`${latest.bondReturn.toFixed(2)}%`}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
