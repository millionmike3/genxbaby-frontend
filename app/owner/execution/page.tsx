
import { getPrisma } from "@/lib/db/prisma";

export const dynamic = "force-dynamic";

export default async function SecondaryMarketExecutionDashboard() {
  const prisma = await getPrisma();

  const executions = await prisma.secondaryExecution.findMany({
    orderBy: { executedAt: "desc" },
    take: 200,
  });

  const totalExecutions = executions.length;
  const totalPnL = executions.reduce(
    (sum, e) => sum + (e.realizedPnl ?? 0),
    0
  );
  const avgPairOffCost =
    executions.reduce((sum, e) => sum + (e.pairOffCost ?? 0), 0) /
    (totalExecutions || 1);

  const mandatoryCount = executions.filter(
    (e) => e.executionType === "MANDATORY"
  ).length;
  const bestEffortsCount = executions.filter(
    (e) => e.executionType === "BEST_EFFORTS"
  ).length;

  return (
    <main className="min-h-screen bg-slate-950 text-white p-6 space-y-12">
      <h1 className="text-4xl font-bold text-[#3CF46B]">
        Secondary‑Market Execution Dashboard
      </h1>

      <p className="text-slate-300 text-sm">
        Monitor execution performance, pair‑off costs, delivery windows, and investor profitability.
      </p>

      <section className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card title="Total Executions" value={totalExecutions} />
        <Card title="Total Realized P&L" value={`$${totalPnL.toLocaleString()}`} />
        <Card title="Avg Pair‑Off Cost" value={`$${avgPairOffCost.toLocaleString()}`} />
        <Card
          title="Mandatory vs Best Efforts"
          value={`${mandatoryCount} / ${bestEffortsCount}`}
        />
      </section>

      <section className="bg-neutral-900 border border-neutral-700 rounded-xl p-6">
        <h2 className="text-2xl font-bold text-[#3CF46B] mb-4">
          Recent Executions
        </h2>

        <table className="w-full text-sm">
          <thead>
            <tr className="text-slate-400">
              <th className="text-left py-2">Timestamp</th>
              <th className="text-left py-2">Investor</th>
              <th className="text-left py-2">Type</th>
              <th className="text-left py-2">Delivery Window</th>
              <th className="text-left py-2">Pair‑Off Cost</th>
              <th className="text-left py-2">Realized P&L</th>
            </tr>
          </thead>
          <tbody>
            {executions.map((e) => (
              <tr key={e.id} className="border-t border-neutral-800">
                <td className="py-2">
                  {new Date(e.executedAt).toLocaleString()}
                </td>
                <td className="py-2">{e.investorName}</td>
                <td className="py-2">{e.executionType}</td>
                <td className="py-2">{e.deliveryWindowDays} days</td>
                <td className="py-2">
                  ${Number(e.pairOffCost ?? 0).toLocaleString()}
                </td>
                <td className="py-2">
                  <span
                    className={
                      (e.realizedPnl ?? 0) >= 0
                        ? "text-[#3CF46B]"
                        : "text-red-400"
                    }
                  >
                    ${Number(e.realizedPnl ?? 0).toLocaleString()}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </main>
  );
}

function Card({ title, value }: { title: string; value: number | string }) {
  return (
    <div className="bg-neutral-900 border border-neutral-700 rounded-xl p-6">
      <h3 className="text-lg font-semibold text-slate-300">{title}</h3>
      <p className="text-3xl font-bold mt-2">{value}</p>
    </div>
  );
}
