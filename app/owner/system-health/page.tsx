
import { getPrisma } from "@/lib/db/prisma";

export const dynamic = "force-dynamic";

export default async function OwnerSystemHealthDashboard() {
  const prisma = await getPrisma();

  const systemEvents = await prisma.systemEvent.findMany({
    orderBy: { createdAt: "desc" },
    take: 200,
  });

  const pricingEvents = await prisma.pricingAuditLog.findMany({
    orderBy: { createdAt: "desc" },
    take: 100,
  });

  const underwritingTasks = await prisma.underwritingTask.findMany({
    orderBy: { createdAt: "desc" },
    take: 100,
  });

  const fraudEvents = await prisma.fraudEvent.findMany({
    orderBy: { createdAt: "desc" },
    take: 100,
  });

  const behaviorSessions = await prisma.behaviorSession.findMany({
    orderBy: { startedAt: "desc" },
    take: 100,
  });

  const secondaryExecutions = await prisma.secondaryExecution.findMany({
    orderBy: { executedAt: "desc" },
    take: 50,
  });

  const uptime = calculateUptime(systemEvents);
  const errorCount = systemEvents.filter((e) => e.level === "ERROR").length;

  return (
    <main className="min-h-screen bg-slate-950 text-white p-6 space-y-16">
      <h1 className="text-5xl font-bold text-[#3CF46B]">
        Owner System Health Dashboard
      </h1>

      <section className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card title="System Uptime" value={`${uptime}%`} />
        <Card title="System Errors (Recent)" value={errorCount} />
        <Card title="Pricing Events (Recent)" value={pricingEvents.length} />
        <Card title="Underwriting Tasks (Recent)" value={underwritingTasks.length} />
      </section>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card title="Fraud Events (Recent)" value={fraudEvents.length} />
        <Card title="Behavior Sessions (Recent)" value={behaviorSessions.length} />
        <Card title="Secondary Executions (Recent)" value={secondaryExecutions.length} />
      </section>

      <Section title="System Events">
        {systemEvents.map((e) => (
          <Row
            key={e.id}
            primary={e.message}
            secondary={e.level}
            right={new Date(e.createdAt).toLocaleString()}
          />
        ))}
      </Section>

      <Section title="Pricing Engine Events">
        {pricingEvents.map((p) => (
          <Row
            key={p.id}
            primary={p.action}
            secondary={p.details}
            right={new Date(p.createdAt).toLocaleString()}
          />
        ))}
      </Section>

      <Section title="Underwriting Engine Tasks">
        {underwritingTasks.map((t) => (
          <Row
            key={t.id}
            primary={t.type}
            secondary={t.status}
            right={new Date(t.createdAt).toLocaleString()}
          />
        ))}
      </Section>

      <Section title="Fraud Engine Events">
        {fraudEvents.map((f) => (
          <Row
            key={f.id}
            primary={`Loan ${f.loanId} • Risk ${f.riskScore}`}
            secondary={f.description}
            right={new Date(f.createdAt).toLocaleString()}
          />
        ))}
      </Section>

      <Section title="Behavioral Engine Sessions">
        {behaviorSessions.map((s) => (
          <Row
            key={s.id}
            primary={`Loan ${s.loanId} • Engagement ${s.engagementScore}`}
            secondary={`Stress ${s.stressScore}`}
            right={new Date(s.startedAt).toLocaleString()}
          />
        ))}
      </Section>

      <Section title="Secondary‑Market Executions">
        {secondaryExecutions.map((e) => (
          <Row
            key={e.id}
            primary={`Investor ${e.investorName} • ${e.executionType}`}
            secondary={`P&L $${Number(e.realizedPnl ?? 0).toLocaleString()}`}
            right={new Date(e.executedAt).toLocaleString()}
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

function calculateUptime(events: any[]) {
  const total = events.length;
  const errors = events.filter((e) => e.level === "ERROR").length;
  if (total === 0) return 100;
  return Math.max(0, Math.round(((total - errors) / total) * 100));
}
