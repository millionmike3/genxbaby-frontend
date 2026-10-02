import { getPrisma } from "@/lib/db/prisma";
import { cookies } from "next/headers";
import { getSession } from "@/lib/session";
import { InvestorCashflowChart } from "../_components/InvestorCharts";

export default async function InvestorCashflowPage() {
  const cookieStore = cookies();
  const token = cookieStore.get("session")?.value;
  const session = await getSession(token);
  const prisma = await getPrisma();

  // Fetch last 12 capital flow events (distributions, reinvestments, contributions)
  const flows = await prisma.investorCapitalFlow.findMany({
    where: { investorId: Number(session.userId) },
    orderBy: { createdAt: "asc" },
    take: 12,
  });

  // Chart data (ascending order for time-series)
  const chartData = flows.map((f) => ({
    label: f.createdAt.toLocaleDateString(),
    amount: f.amount,
  }));

  return (
    <div className="space-y-10">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold mb-4">Cashflow</h1>
        <p className="text-slate-300 text-lg">
          Your distributions, reinvestments, and contributions over time.
        </p>
      </div>

      {/* Chart */}
      <InvestorCashflowChart data={chartData} />

      {/* Cashflow Cards */}
      <div className="space-y-4">
        {flows
          .slice() // copy array
          .reverse() // show newest first in cards
          .map((f) => (
            <div
              key={f.id}
              className="bg-slate-800/60 p-6 rounded-xl border border-slate-700"
            >
              <h3 className="text-xl font-semibold">{f.type}</h3>
              <p className="text-3xl font-bold mt-2">
                {`$${f.amount.toLocaleString()}`}
              </p>
              <p className="text-slate-400 text-sm">
                {f.createdAt.toDateString()}
              </p>
            </div>
          ))}
      </div>
    </div>
  );
}
