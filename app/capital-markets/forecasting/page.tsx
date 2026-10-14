
import { getPrisma } from "@/lib/db/prisma";

export const dynamic = "force-dynamic";

export default async function CapitalMarketsForecastingPage() {
  const prisma = await getPrisma();

  const cm = await prisma.capitalMarketsForecastContext.findFirst({
    include: {
      rateScenarios: {
        orderBy: { createdAt: "desc" },
        take: 50,
      },
      pipelineSnapshots: {
        orderBy: { snapshotDate: "desc" },
        take: 50,
      },
      pnlForecasts: {
        orderBy: { createdAt: "desc" },
        take: 50,
      },
      hedgeProfiles: {
        orderBy: { createdAt: "desc" },
        take: 50,
      },
    },
  });

  const scenarios = cm.rateScenarios;
  const snapshots = cm.pipelineSnapshots;
  const forecasts = cm.pnlForecasts;
  const hedges = cm.hedgeProfiles;

  return (
    <main className="min-h-screen bg-slate-950 text-white p-6 space-y-16">
      <h1 className="text-4xl font-bold text-[#3CF46B]">
        Capital Markets Forecasting Engine
      </h1>

      <section className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card title="Rate Scenarios" value={scenarios.length} />
        <Card title="Pipeline Snapshots" value={snapshots.length} />
        <Card title="P&L Forecasts" value={forecasts.length} />
        <Card title="Hedge Profiles" value={hedges.length} />
      </section>

      <Section title="Rate Scenarios">
        {scenarios.length === 0 && <Empty label="No rate scenarios defined." />}
        {scenarios.map((s) => (
          <Row
            key={s.id}
            primary={`${s.name} — ${s.type}`}
            secondary={`Base: ${s.baseRate.toFixed(3)}% • Shock: ${s.shockBps} bps`}
            right={new Date(s.createdAt).toLocaleDateString()}
          />
        ))}
      </Section>

      <Section title="Pipeline Snapshots">
        {snapshots.length === 0 && <Empty label="No pipeline snapshots." />}
        {snapshots.map((p) => (
          <Row
            key={p.id}
            primary={`Snapshot ${p.id}`}
            secondary={`Loans: ${p.loanCount} • UPB: $${Number(
              p.totalUpb ?? 0
            ).toLocaleString()}`}
            right={new Date(p.snapshotDate).toLocaleDateString()}
          />
        ))}
      </Section>

      <Section title="P&L Forecasts">
        {forecasts.length === 0 && <Empty label="No P&L forecasts." />}
        {forecasts.map((f) => (
          <Row
            key={f.id}
            primary={`${f.scenarioName} — Horizon ${f.horizonDays} days`}
            secondary={`Expected P&L: $${Number(
              f.expectedPnl ?? 0
            ).toLocaleString()} • Range: $${Number(
              f.pnlRangeLow ?? 0
            ).toLocaleString()} - $${Number(
              f.pnlRangeHigh ?? 0
            ).toLocaleString()}`}
            right={new Date(f.createdAt).toLocaleDateString()}
          />
        ))}
      </Section>

      <Section title="Hedge Profiles">
        {hedges.length === 0 && <Empty label="No hedge profiles." />}
        {hedges.map((h) => (
          <Row
            key={h.id}
            primary={`${h.name} — ${h.style}`}
            secondary={`Target Coverage: ${h.targetCoveragePercent}% • Max Basis Risk: ${h.maxBasisRiskBps} bps`}
            right={new Date(h.createdAt).toLocaleDateString()}
          />
        ))}
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
