
import { getPrisma } from "@/lib/db/prisma";

export const dynamic = "force-dynamic";

export default async function OwnerCapitalAllocationEngine() {
  const prisma = await getPrisma();

  // Pipeline loans with execution + hold signals
  const loans = await prisma.loan.findMany({
    where: { status: { in: ["APPROVED", "LOCKED", "CLEAR_TO_CLOSE"] } },
    include: {
      executionSignal: true,
      holdSignal: true,
      investorRecommendations: true,
    },
    orderBy: { createdAt: "desc" },
    take: 200,
  });

  const totalPipeline = loans.reduce(
    (sum, l) => sum + (l.loanAmount ?? 0),
    0
  );

  const holdCount = loans.filter((l) => l.holdSignal?.recommendHold).length;
  const sellCount = loans.filter((l) => l.executionSignal?.recommendSell).length;

  const hedgeFundCount = loans.filter(
    (l) =>
      l.executionSignal?.recommendedChannel === "HEDGE_FUND"
  ).length;

  const agencyCount = loans.filter(
    (l) =>
      l.executionSignal?.recommendedChannel === "AGENCY"
  ).length;

  const wholeLoanCount = loans.filter(
    (l) =>
      l.executionSignal?.recommendedChannel === "WHOLE_LOAN"
  ).length;

  return (
    <main className="min-h-screen bg-slate-950 text-white p-6 space-y-16">
      <h1 className="text-5xl font-bold text-[#3CF46B]">
        Owner Capital Allocation Engine
      </h1>

      {/* Top summary */}
      <section className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card
          title="Total Pipeline"
          value={`$${totalPipeline.toLocaleString()}`}
        />
        <Card title="Recommended Hold" value={holdCount} />
        <Card title="Recommended Sell" value={sellCount} />
        <Card
          title="Hedge / Agency / Whole"
          value={`${hedgeFundCount} / ${agencyCount} / ${wholeLoanCount}`}
        />
      </section>

      {/* Loan‑level allocation table */}
      <Section title="Loan‑Level Capital Allocation">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-slate-400">
              <th className="text-left py-2">Loan</th>
              <th className="text-left py-2">Amount</th>
              <th className="text-left py-2">Channel</th>
              <th className="text-left py-2">Hold / Sell</th>
              <th className="text-left py-2">Expected P&L</th>
              <th className="text-left py-2">Reason</th>
            </tr>
          </thead>
          <tbody>
            {loans.map((l) => {
              const exec = l.executionSignal;
              const hold = l.holdSignal;

              const channelLabel =
                exec?.recommendedChannel || "UNASSIGNED";

              const holdSellLabel = hold?.recommendHold
                ? "HOLD"
                : exec?.recommendSell
                ? "SELL"
                : "REVIEW";

              const pnl =
                exec?.expectedPnl != null
                  ? `$${Number(exec.expectedPnl).toLocaleString()}`
                  : "-";

              const reason =
                exec?.reason ||
                hold?.reason ||
                "No explicit reason recorded.";

              return (
                <tr
                  key={l.id}
                  className="border-t border-neutral-800"
                >
                  <td className="py-2">{l.id}</td>
                  <td className="py-2">
                    ${Number(l.loanAmount ?? 0).toLocaleString()}
                  </td>
                  <td className="py-2">{channelLabel}</td>
                  <td className="py-2">{holdSellLabel}</td>
                  <td className="py-2">{pnl}</td>
                  <td className="py-2 text-slate-300">{reason}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </Section>

      {/* Aggregate signals */}
      <Section title="Aggregate Capital Signals">
        {loans.length === 0 && (
          <Empty label="No active loans with capital signals." />
        )}
        {loans.map((l) => {
          const exec = l.executionSignal;
          const hold = l.holdSignal;

          if (!exec && !hold) return null;

          return (
            <Row
              key={l.id}
              primary={`Loan ${l.id} — $${Number(
                l.loanAmount ?? 0
              ).toLocaleString()}`}
              secondary={
                exec
                  ? `Execution: ${exec.recommendedChannel} • Expected P&L: $${Number(
                      exec.expectedPnl ?? 0
                    ).toLocaleString()}`
                  : hold
                  ? `Hold Signal: ${hold.reason}`
                  : ""
              }
              right={new Date(l.createdAt).toLocaleDateString()}
            />
          );
        })}
      </Section>
    </main>
  );
}

function Card({ title, value }: { title: string; value: string | number }) {
  return (
    <div className="bg-neutral-900 border border-neutral-700 rounded-xl p-6">
      <h3 className="text-lg font-semibold text-slate-300">{title}</h3>
      <p className="text-3xl font-bold mt-2">{value}</p>
    </div>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="space-y-4">
      <h2 className="text-2xl font-bold text-[#3CF46B]">{title}</h2>
      <div className="bg-neutral-900 border border-neutral-700 rounded-xl p-4 space-y-2">
        {children}
      </div>
    </section>
  );
}

function Row({
  primary,
  secondary,
  right,
}: {
  primary: string;
  secondary?: string;
  right?: string;
}) {
  return (
    <div className="flex items-center justify-between py-2 border-b border-neutral-800 last:border-b-0">
      <div>
        <p className="text-sm font-semibold">{primary}</p>
        {secondary && (
          <p className="text-xs text-slate-400 mt-1">{secondary}</p>
        )}
      </div>
      {right && (
        <p className="text-xs text-slate-300 ml-4 whitespace-nowrap">
          {right}
        </p>
      )}
    </div>
  );
}

function Empty({ label }: { label: string }) {
  return <p className="text-xs text-slate-400">{label}</p>;
}
