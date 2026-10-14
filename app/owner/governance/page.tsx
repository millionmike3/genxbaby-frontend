
import { getPrisma } from "@/lib/db/prisma";

export const dynamic = "force-dynamic";

export default async function OwnerGovernanceCenter() {
  const prisma = await getPrisma();

  // Pull all audit categories
  const auditLogs = await prisma.auditLog.findMany({
    orderBy: { createdAt: "desc" },
    take: 300,
  });

  const pricingAudits = await prisma.pricingAuditLog.findMany({
    orderBy: { createdAt: "desc" },
    take: 150,
  });

  const underwritingAudits = await prisma.underwritingAudit.findMany({
    orderBy: { createdAt: "desc" },
    take: 150,
  });

  const fraudAudits = await prisma.fraudEvent.findMany({
    orderBy: { createdAt: "desc" },
    take: 150,
  });

  const behaviorAudits = await prisma.behaviorSession.findMany({
    orderBy: { startedAt: "desc" },
    take: 150,
  });

  const executionAudits = await prisma.secondaryExecution.findMany({
    orderBy: { executedAt: "desc" },
    take: 150,
  });

  const complianceAudits = await prisma.complianceAlert.findMany({
    orderBy: { createdAt: "desc" },
    take: 150,
  });

  const documentAudits = await prisma.documentComplianceIssue.findMany({
    orderBy: { createdAt: "desc" },
    take: 150,
  });

  const systemEvents = await prisma.systemEvent.findMany({
    orderBy: { createdAt: "desc" },
    take: 200,
  });

  return (
    <main className="min-h-screen bg-slate-950 text-white p-6 space-y-16">
      <h1 className="text-5xl font-bold text-[#3CF46B]">
        Owner Audit & Governance Center
      </h1>

      <p className="text-slate-300 text-sm">
        Unified audit visibility across pricing, underwriting, fraud, behavior, compliance, execution, documents, and system events.
      </p>

      {/* TOP SUMMARY GRID */}
      <section className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card title="Total Audit Logs" value={auditLogs.length} />
        <Card title="Pricing Audits" value={pricingAudits.length} />
        <Card title="Underwriting Audits" value={underwritingAudits.length} />
        <Card title="Fraud Events" value={fraudAudits.length} />
      </section>

      <section className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card title="Behavior Sessions" value={behaviorAudits.length} />
        <Card title="Execution Records" value={executionAudits.length} />
        <Card title="Compliance Alerts" value={complianceAudits.length} />
        <Card title="Document Issues" value={documentAudits.length} />
      </section>

      {/* AUDIT SECTIONS */}
      <AuditSection title="System Events" items={systemEvents} render={SystemEventRow} />
      <AuditSection title="Pricing Audit Trail" items={pricingAudits} render={PricingRow} />
      <AuditSection title="Underwriting Audit Trail" items={underwritingAudits} render={UnderwritingRow} />
      <AuditSection title="Fraud Audit Trail" items={fraudAudits} render={FraudRow} />
      <AuditSection title="Behavioral Audit Trail" items={behaviorAudits} render={BehaviorRow} />
      <AuditSection title="Secondary‑Market Execution Audit Trail" items={executionAudits} render={ExecutionRow} />
      <AuditSection title="Compliance Audit Trail" items={complianceAudits} render={ComplianceRow} />
      <AuditSection title="Document Audit Trail" items={documentAudits} render={DocumentRow} />
      <AuditSection title="General Audit Logs" items={auditLogs} render={GeneralAuditRow} />
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

function AuditSection({ title, items, render }) {
  return (
    <section className="space-y-4">
      <h2 className="text-2xl font-bold text-[#3CF46B]">{title}</h2>
      <div className="bg-neutral-900 border border-neutral-700 rounded-xl p-4 space-y-2">
        {items.length === 0 ? (
          <p className="text-xs text-slate-400">No records found.</p>
        ) : (
          items.map((item) => render(item))
        )}
      </div>
    </section>
  );
}

function SystemEventRow(e) {
  return (
    <Row
      primary={e.message}
      secondary={e.level}
      right={new Date(e.createdAt).toLocaleString()}
    />
  );
}

function PricingRow(p) {
  return (
    <Row
      primary={p.action}
      secondary={p.details}
      right={new Date(p.createdAt).toLocaleString()}
    />
  );
}

function UnderwritingRow(u) {
  return (
    <Row
      primary={u.action}
      secondary={u.details}
      right={new Date(u.createdAt).toLocaleString()}
    />
  );
}

function FraudRow(f) {
  return (
    <Row
      primary={`Loan ${f.loanId} • Risk ${f.riskScore}`}
      secondary={f.description}
      right={new Date(f.createdAt).toLocaleString()}
    />
  );
}

function BehaviorRow(b) {
  return (
    <Row
      primary={`Loan ${b.loanId} • Engagement ${b.engagementScore}`}
      secondary={`Stress ${b.stressScore}`}
      right={new Date(b.startedAt).toLocaleString()}
    />
  );
}

function ExecutionRow(e) {
  return (
    <Row
      primary={`Investor ${e.investorName} • ${e.executionType}`}
      secondary={`P&L $${Number(e.realizedPnl ?? 0).toLocaleString()}`}
      right={new Date(e.executedAt).toLocaleString()}
    />
  );
}

function ComplianceRow(c) {
  return (
    <Row
      primary={c.title}
      secondary={c.description}
      right={new Date(c.createdAt).toLocaleString()}
    />
  );
}

function DocumentRow(d) {
  return (
    <Row
      primary={d.documentName}
      secondary={d.issue}
      right={new Date(d.createdAt).toLocaleString()}
    />
  );
}

function GeneralAuditRow(a) {
  return (
    <Row
      primary={a.action}
      secondary={a.actor}
      right={new Date(a.createdAt).toLocaleString()}
    />
  );
}

function Row({ primary, secondary, right }) {
  return (
    <div className="flex items-center justify-between py-2 border-b border-neutral-800 last:border-b-0">
      <div>
        <p className="text-sm font-semibold">{primary}</p>
        {secondary && <p className="text-xs text-slate-400 mt-1">{secondary}</p>}
      </div>
      {right && (
        <p className="text-xs text-slate-300 ml-4 whitespace-nowrap">{right}</p>
      )}
    </div>
  );
}
