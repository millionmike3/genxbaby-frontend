
import { getPrisma } from "@/lib/db/prisma";

export const dynamic = "force-dynamic";

export default async function HedgeFundExecutionOptimizerPage() {
  const prisma = await getPrisma();

  // Assume capital markets admin identity resolved via session/middleware
  const cmAdminId = "CURRENT_CM_ADMIN_ID";

  const context = await prisma.capitalMarketsAdmin.findUnique({
    where: { id: cmAdminId },
    include: {
      hedgeFundStrategies: {
        orderBy: { createdAt: "desc" },
        take: 50,
      },
      hedgeFundExecutions: {
        orderBy: { executedAt: "desc" },
        take: 100,
      },
      hedgeFundSignals: {
        orderBy: { createdAt: "desc" },
        take: 200,
      },
      pipelineLoans: {
        orderBy: { createdAt: "desc" },
        take: 200,
      },
    },
  });

  const strategies = context.hedgeFundStrategies;
  const executions = context.hedgeFundExecutions;
  const signals = context.hedgeFundSignals;
  const pipelineLoans = context.pipelineLoans;

  const totalPipeline = pipelineLoans.reduce(
    (sum, l) => sum + (l.loanAmount ?? 0),
    0
  );

  const totalRealizedPnl = executions.reduce(
    (sum, e) => sum + (e.realizedPnl ?? 0),
    0
  );

  const avgHedgeEfficiency =
    executions.length === 0
      ? 0
      : Math.round(
          executions.reduce(
            (sum, e) => sum + (e.hedgeEfficiencyScore ?? 0),
            0
          ) / executions.length
        );

  const activeSignals = signals.filter((s) => s.status === "ACTIVE").length;

  return (
    <main className="min-h-screen bg-slate-950 text-white p-6 space-y-16">
      <h1 className="text-4xl font-bold text-[#3CF46B]">
        Hedge‑Fund Execution Optimizer
      </h1>

      {/* Top summary */}
      <section className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card
          title="Pipeline Eligible for Hedge‑Fund"
          value={`$${totalPipeline.toLocaleString()}`}
        />
        <Card
          title="Realized P&L (Hedge‑Fund)"
          value={`$${totalRealizedPnl.toLocaleString()}`}
        />
        <Card
          title="Avg Hedge Efficiency"
          value={`${avgHedgeEfficiency}%`}
        />
        <Card
          title="Active Hedge Signals"
          value={activeSignals}
        />
      </section>

      {/* Strategies */}
      <Section title="Hedge‑Fund Strategies">
        {strategies.length === 0 && (
          <Empty label="No hedge‑fund strategies configured." />
        )}
        {strategies.map((s) => (
          <Row
            key={s.id}
            primary={`${s.name} — ${s.style}`}
            secondary={`Target: ${s.targetReturnBps} bps • Volatility: ${s.targetVolatilityBps} bps`}
            right={`Created ${new Date(s.createdAt).toLocaleDateString()}`}
          />
        ))}
      </Section>

      {/* Hedge‑Fund Signals */}
      <Section title="Hedge‑Fund Execution Signals">
        {signals.length === 0 && (
          <Empty label="No hedge‑fund signals generated yet." />
        )}
        {signals.map((sig) => (
          <Row
            key={sig.id}
            primary={`Loan ${sig.loanId} — ${sig.action}`}
            secondary={`Reason: ${sig.reason} • Strategy: ${sig.strategyName}`}
            right={new Date(sig.createdAt).toLocaleString()}
          />
        ))}
      </Section>

      {/* Recent Executions */}
      <Section title="Recent Hedge‑Fund Executions">
        {executions.length === 0 && (
          <Empty label="No hedge‑fund executions recorded." />
        )}
        {executions.map((e) => (
          <Row
            key={e.id}
            primary={`Investor ${e.hedgeFundName} • ${e.executionType}`}
            secondary={`P&L: $${Number(
              e.realizedPnl ?? 0
            ).toLocaleString()} • Hedge Efficiency: ${
              e.hedgeEfficiencyScore ?? 0
            }%`}
            right={new Date(e.executedAt).toLocaleString()}
          />
        ))}
      </Section>

      {/* Pipeline Loans with Hedge‑Fund Eligibility */}
      <Section title="Pipeline Loans — Hedge‑Fund Eligibility">
        {pipelineLoans.length === 0 && (
          <Empty label="No loans currently eligible for hedge‑fund execution." />
        )}
        <table className="w-full text-sm">
          <thead>
            <tr className="text-slate-400">
              <th className="text-left py-2">Loan</th>
              <th className="text-left py-2">Amount</th>
              <th className="text-left py-2">Product</th>
              <th className="text-left py-2">Hedge‑Fund Eligible</th>
              <th className="text-left py-2">Recommended Action</th>
            </tr>
          </thead>
          <tbody>
            {pipelineLoans.map((l) => {
              const eligible = l.hedgeFundEligible;
              const action = l.hedgeFundRecommendedAction || "REVIEW";

              return (
                <tr
                  key={l.id}
                  className="border-t border-neutral-800"
                >
                  <td className="py-2">{l.id}</td>
                  <td className="py-2">
                    ${Number(l.loanAmount ?? 0).toLocaleString()}
                  </td>
                  <td className="py-2">{l.product}</td>
                  <td className="py-2">{eligible ? "YES" : "NO"}</td>
                  <td className="py-2">{action}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
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
