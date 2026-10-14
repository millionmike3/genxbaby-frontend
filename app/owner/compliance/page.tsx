
import { getPrisma } from "@/lib/db/prisma";

export const dynamic = "force-dynamic";

export default async function OwnerComplianceDashboard() {
  const prisma = await getPrisma();

  // Compliance Alerts
  const alerts = await prisma.complianceAlert.findMany({
    orderBy: { createdAt: "desc" },
    take: 200,
  });

  // Pricing Violations
  const pricingViolations = await prisma.pricingViolation.findMany({
    orderBy: { createdAt: "desc" },
    take: 100,
  });

  // Rate Lock Violations
  const lockViolations = await prisma.rateLockViolation.findMany({
    orderBy: { createdAt: "desc" },
    take: 100,
  });

  // Delivery Violations
  const deliveryViolations = await prisma.deliveryViolation.findMany({
    orderBy: { createdAt: "desc" },
    take: 100,
  });

  // Investor Rule Violations
  const investorViolations = await prisma.investorRuleViolation.findMany({
    orderBy: { createdAt: "desc" },
    take: 100,
  });

  // Exceptions & LO Concessions
  const exceptions = await prisma.pricingExceptionAudit.findMany({
    orderBy: { createdAt: "desc" },
    take: 100,
  });

  const concessions = await prisma.loConcession.findMany({
    orderBy: { createdAt: "desc" },
    take: 100,
  });

  // Document Compliance
  const docIssues = await prisma.documentComplianceIssue.findMany({
    orderBy: { createdAt: "desc" },
    take: 100,
  });

  // HMDA / Fair Lending Signals
  const fairLendingSignals = await prisma.fairLendingSignal.findMany({
    orderBy: { createdAt: "desc" },
    take: 100,
  });

  // Audit Logs
  const auditLogs = await prisma.auditLog.findMany({
    orderBy: { createdAt: "desc" },
    take: 200,
  });

  return (
    <main className="min-h-screen bg-slate-950 text-white p-6 space-y-16">
      <h1 className="text-5xl font-bold text-[#3CF46B]">
        Owner Compliance Dashboard
      </h1>

      {/* TOP SUMMARY GRID */}
      <section className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card title="Compliance Alerts" value={alerts.length} />
        <Card title="Pricing Violations" value={pricingViolations.length} />
        <Card title="Rate Lock Violations" value={lockViolations.length} />
        <Card title="Investor Rule Violations" value={investorViolations.length} />
      </section>

      {/* PRICING VIOLATIONS */}
      <Section title="Pricing Violations">
        {pricingViolations.length === 0 && <Empty label="No pricing violations." />}
        {pricingViolations.map((v) => (
          <Row
            key={v.id}
            primary={`${v.loanId} — ${v.type}`}
            secondary={v.details}
            right={new Date(v.createdAt).toLocaleString()}
          />
        ))}
      </Section>

      {/* RATE LOCK VIOLATIONS */}
      <Section title="Rate Lock Violations">
        {lockViolations.length === 0 && <Empty label="No rate lock violations." />}
        {lockViolations.map((v) => (
          <Row
            key={v.id}
            primary={`Loan ${v.loanId}`}
            secondary={v.reason}
            right={new Date(v.createdAt).toLocaleString()}
          />
        ))}
      </Section>

      {/* DELIVERY VIOLATIONS */}
      <Section title="Delivery Violations">
        {deliveryViolations.length === 0 && <Empty label="No delivery violations." />}
        {deliveryViolations.map((v) => (
          <Row
            key={v.id}
            primary={`Loan ${v.loanId}`}
            secondary={v.description}
            right={`${v.deliveryWindowDays} days`}
          />
        ))}
      </Section>

      {/* INVESTOR RULE VIOLATIONS */}
      <Section title="Investor Rule Violations">
        {investorViolations.length === 0 && <Empty label="No investor rule violations." />}
        {investorViolations.map((v) => (
          <Row
            key={v.id}
            primary={`${v.investorName}`}
            secondary={v.ruleViolated}
            right={new Date(v.createdAt).toLocaleString()}
          />
        ))}
      </Section>

      {/* EXCEPTIONS */}
      <Section title="Pricing Exceptions">
        {exceptions.length === 0 && <Empty label="No pricing exceptions." />}
        {exceptions.map((e) => (
          <Row
            key={e.id}
            primary={e.exceptionName}
            secondary={`Loan ${e.loanId} — ${e.reason}`}
            right={new Date(e.createdAt).toLocaleString()}
          />
        ))}
      </Section>

      {/* LO CONCESSIONS */}
      <Section title="Loan Officer Concessions">
        {concessions.length === 0 && <Empty label="No LO concessions." />}
        {concessions.map((c) => (
          <Row
            key={c.id}
            primary={`Loan ${c.loanId}`}
            secondary={`${c.amountBps} bps concession`}
            right={new Date(c.createdAt).toLocaleString()}
          />
        ))}
      </Section>

      {/* DOCUMENT COMPLIANCE */}
      <Section title="Document Compliance Issues">
        {docIssues.length === 0 && <Empty label="No document compliance issues." />}
        {docIssues.map((d) => (
          <Row
            key={d.id}
            primary={d.documentName}
            secondary={d.issue}
            right={new Date(d.createdAt).toLocaleString()}
          />
        ))}
      </Section>

      {/* FAIR LENDING */}
      <Section title="HMDA / Fair Lending Signals">
        {fairLendingSignals.length === 0 && <Empty label="No fair lending signals." />}
        {fairLendingSignals.map((f) => (
          <Row
            key={f.id}
            primary={f.signalType}
            secondary={f.details}
            right={new Date(f.createdAt).toLocaleString()}
          />
        ))}
      </Section>

      {/* AUDIT LOGS */}
      <Section title="Audit Logs">
        {auditLogs.map((log) => (
          <Row
            key={log.id}
            primary={log.action}
            secondary={log.actor}
            right={new Date(log.createdAt).toLocaleString()}
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
        {secondary && <p className="text-xs text-slate-400 mt-1">{secondary}</p>}
      </div>
      {right && <p className="text-xs text-slate-300 ml-4 whitespace-nowrap">{right}</p>}
    </div>
  );
}

function Empty({ label }) {
  return <p className="text-xs text-slate-400">{label}</p>;
}
