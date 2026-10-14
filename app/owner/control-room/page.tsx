
import { getPrisma } from "@/lib/db/prisma";

export const dynamic = "force-dynamic";

export default async function OwnerControlRoom() {
  const prisma = await getPrisma();

  // SYSTEM HEALTH
  const apiEvents = await prisma.systemEvent.findMany({
    orderBy: { createdAt: "desc" },
    take: 50,
  });

  const uptime = calculateUptime(apiEvents);
  const recentErrors = apiEvents.filter((e) => e.level === "ERROR").length;

  // PRICING ENGINE HEALTH
  const pricingEvents = await prisma.pricingAuditLog.findMany({
    orderBy: { createdAt: "desc" },
    take: 20,
  });

  // UNDERWRITING ENGINE
  const underwritingQueue = await prisma.underwritingTask.count({
    where: { status: "PENDING" },
  });

  // BEHAVIORAL ENGINE
  const behaviorSessions = await prisma.behaviorSession.count({
    where: {
      startedAt: {
        gte: new Date(Date.now() - 24 * 60 * 60 * 1000),
      },
    },
  });

  // FRAUD ENGINE
  const fraudAlerts = await prisma.fraudEvent.count({
    where: { riskScore: { gte: 80 } },
  });

  // SECONDARY MARKET EXECUTION
  const executions = await prisma.secondaryExecution.findMany({
    orderBy: { executedAt: "desc" },
    take: 10,
  });

  const totalPnL = executions.reduce(
    (sum, e) => sum + (e.realizedPnl ?? 0),
    0
  );

  // COMPLIANCE
  const complianceAlerts = await prisma.complianceAlert.findMany({
    orderBy: { createdAt: "desc" },
    take: 20,
  });

  // CAPITAL ALLOCATION SIGNALS
  const allocationSignals = await prisma.capitalSignal.findMany({
    orderBy: { createdAt: "desc" },
    take: 20,
  });

  // AI UNDERWRITING
  const aiUnderwriting = await prisma.aiUnderwritingRecommendation.findMany({
    orderBy: { createdAt: "desc" },
    take: 20,
  });

  return (
    <main className="min-h-screen bg-slate-950 text-white p-6 space-y-16">
      <h1 className="text-5xl font-bold text-[#3CF46B]">
        Owner Control Room
      </h1>

      {/* TOP GRID */}
      <section className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card title="System Uptime" value={`${uptime}%`} />
        <Card title="Pricing Events (24h)" value={pricingEvents.length} />
        <Card title="Underwriting Queue" value={underwritingQueue} />
        <Card title="Behavior Sessions (24h)" value={behaviorSessions} />
      </section>

      {/* FRAUD + EXECUTION */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card title="High‑Risk Fraud Alerts" value={fraudAlerts} />
        <Card title="Recent Executions" value={executions.length} />
        <Card title="Execution P&L (Recent)" value={`$${totalPnL.toLocaleString()}`} />
      </section>

      {/* COMPLIANCE */}
      <Section title="Compliance Alerts">
        {complianceAlerts.length === 0 && (
          <Empty label="No compliance alerts." />
        )}
        {complianceAlerts.map((a) => (
          <Row
            key={a.id}
            primary={a.title}
            secondary={a.description}
            right={new Date(a.createdAt).toLocaleString()}
          />
        ))}
      </Section>

      {/* CAPITAL ALLOCATION */}
      <Section title="Capital Allocation Signals">
        {allocationSignals.length === 0 && (
          <Empty label="No capital allocation signals." />
        )}
        {allocationSignals.map((s) => (
          <Row
            key={s.id}
            primary={s.signal}
            secondary={s.details}
            right={new Date(s.createdAt).toLocaleString()}
          />
        ))}
      </Section>

      {/* AI UNDERWRITING */}
      <Section title="AI Underwriting Recommendations">
        {aiUnderwriting.length === 0 && (
          <Empty label="No AI underwriting recommendations." />
        )}
        {aiUnderwriting.map((r) => (
          <Row
            key={r.id}
            primary={r.recommendation}
            secondary={r.reason}
            right={new Date(r.createdAt).toLocaleString()}
          />
        ))}
      </Section>

      {/* SYSTEM EVENTS */}
      <Section title="System Health Events">
        {apiEvents.map((e) => (
          <Row
            key={e.id}
            primary={e.message}
            secondary={e.level}
            right={new Date(e.createdAt).toLocaleString()}
          />
        ))}
      </Section>
    </main>
  );
}

function Card({ title, value }) {
  return (
    <div className="bg-neutral-900 border border-neutral-700 rounded-xl p-6">
      <h3 className="text-lg font-semibold text-slate-300">{title}</h3>
      <p className="text-3xl font-bold mt-2">{value}</p>
    </div>
  );
}

function Section({ title, children }) {
  return (
    <section className="space-y-4">
      <h2 className="text-2xl font-bold text-[#3CF46B]">{title}</h2>
      <div className="bg-neutral-900 border border-neutral-700 rounded-xl p-4 space-y-2">
        {children}
      </div>
    </section>
  );
}

function Row({ primary, secondary, right }) {
  return (
    <div className="flex items-center justify-between py-2 border-b border-neutral-800 last:border-b-0">
      <div>
        <p className="text-sm font-semibold">{primary}</p>
        {secondary && (
          <p className="text-xs text-slate-400 mt-1">{secondary}</p>
        )}
      </div>
      {right && (
        <p className="text-xs text-slate-300 ml-4 whitespace-nowrap">{right}</p>
      )}
    </div>
  );
}

function Empty({ label }) {
  return <p className="text-xs text-slate-400">{label}</p>;
}

function calculateUptime(events) {
  const total = events.length;
  const errors = events.filter((e) => e.level === "ERROR").length;
  if (total === 0) return 100;
  return Math.max(0, Math.round(((total - errors) / total) * 100));
}
