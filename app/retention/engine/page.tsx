
import { getPrisma } from "@/lib/db/prisma";

export const dynamic = "force-dynamic";

export default async function BorrowerRetentionEnginePage() {
  const prisma = await getPrisma();

  // Assume retention admin identity resolved via session/middleware
  const retentionAdminId = "CURRENT_RETENTION_ADMIN_ID";

  const context = await prisma.retentionAdmin.findUnique({
    where: { id: retentionAdminId },
    include: {
      retentionLoans: {
        orderBy: { updatedAt: "desc" },
        take: 200,
        include: {
          borrower: true,
          retentionSignals: true,
          retentionOffers: true,
          behaviorSessions: true,
          pricingSummary: true,
          servicingData: true,
        },
      },
      retentionCampaigns: {
        orderBy: { createdAt: "desc" },
        take: 50,
      },
    },
  });

  const loans = context.retentionLoans;
  const campaigns = context.retentionCampaigns;

  const avgRetentionScore = Math.round(
    loans.reduce((sum, l) => sum + (l.retentionScore ?? 0), 0) /
      (loans.length || 1)
  );

  const highRiskChurn = loans.filter((l) => l.churnRisk === "HIGH").length;
  const mediumRiskChurn = loans.filter((l) => l.churnRisk === "MEDIUM").length;
  const lowRiskChurn = loans.filter((l) => l.churnRisk === "LOW").length;

  const activeOffers = loans.reduce(
    (sum, l) => sum + (l.retentionOffers?.length ?? 0),
    0
  );

  return (
    <main className="min-h-screen bg-slate-950 text-white p-6 space-y-16">
      <h1 className="text-4xl font-bold text-[#3CF46B]">
        Borrower Retention Engine
      </h1>

      {/* Top summary */}
      <section className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card title="Loans in Retention" value={loans.length} />
        <Card title="Avg Retention Score" value={`${avgRetentionScore}%`} />
        <Card
          title="Churn Risk (H/M/L)"
          value={`${highRiskChurn}/${mediumRiskChurn}/${lowRiskChurn}`}
        />
        <Card title="Active Offers" value={activeOffers} />
      </section>

      {/* Campaigns */}
      <Section title="Retention Campaigns">
        {campaigns.length === 0 && (
          <Empty label="No retention campaigns created yet." />
        )}
        {campaigns.map((c) => (
          <Row
            key={c.id}
            primary={`${c.name} — ${c.type}`}
            secondary={`Target: ${c.targetSegment} • Status: ${c.status}`}
            right={`Created ${new Date(c.createdAt).toLocaleDateString()}`}
          />
        ))}
      </Section>

      {/* Loan‑level retention table */}
      <Section title="Loan‑Level Retention Intelligence">
        {loans.length === 0 && (
          <Empty label="No loans currently in retention workflow." />
        )}

        <table className="w-full text-sm">
          <thead>
            <tr className="text-slate-400">
              <th className="text-left py-2">Loan</th>
              <th className="text-left py-2">Borrower</th>
              <th className="text-left py-2">Retention Score</th>
              <th className="text-left py-2">Churn Risk</th>
              <th className="text-left py-2">Offers</th>
              <th className="text-left py-2">Recommended Action</th>
            </tr>
          </thead>
          <tbody>
            {loans.map((l) => {
              const offers = l.retentionOffers?.length ?? 0;
              const action = l.recommendedAction ?? "REVIEW";

              return (
                <tr key={l.id} className="border-t border-neutral-800">
                  <td className="py-2">{l.loanId}</td>
                  <td className="py-2">
                    {l.borrower.firstName} {l.borrower.lastName}
                  </td>
                  <td className="py-2">{l.retentionScore}%</td>
                  <td className="py-2">{l.churnRisk}</td>
                  <td className="py-2">{offers}</td>
                  <td className="py-2">{action}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </Section>

      {/* Retention Signals */}
      <Section title="Retention Signals">
        {loans.flatMap((l) => l.retentionSignals).length === 0 && (
          <Empty label="No retention signals generated yet." />
        )}

        {loans.flatMap((l) =>
          l.retentionSignals.map((s) => (
            <Row
              key={s.id}
              primary={`Loan ${s.loanId} — ${s.signalType}`}
              secondary={s.description}
              right={new Date(s.createdAt).toLocaleString()}
            />
          ))
        )}
      </Section>

      {/* Offers */}
      <Section title="Retention Offers">
        {loans.flatMap((l) => l.retentionOffers).length === 0 && (
          <Empty label="No retention offers created yet." />
        )}

        {loans.flatMap((l) =>
          l.retentionOffers.map((o) => (
            <Row
              key={o.id}
              primary={`${o.offerType} — Loan ${o.loanId}`}
              secondary={`APR: ${o.apr.toFixed(3)}% • Payment: $${Number(
                o.payment ?? 0
              ).toLocaleString()}`}
              right={new Date(o.createdAt).toLocaleDateString()}
            />
          ))
        )}
      </Section>

      {/* Behavioral Signals */}
      <Section title="Behavioral Signals">
        {loans.flatMap((l) => l.behaviorSessions).length === 0 && (
          <Empty label="No behavioral signals recorded." />
        )}

        {loans.flatMap((l) =>
          l.behaviorSessions.map((b) => (
            <Row
              key={b.id}
              primary={`Loan ${b.loanId} — Engagement ${b.engagementScore}`}
              secondary={`Stress ${b.stressScore}`}
              right={new Date(b.startedAt).toLocaleString()}
            />
          ))
        )}
      </Section>

      {/* Servicing Signals */}
      <Section title="Servicing Signals">
        {loans.flatMap((l) => l.servicingData).length === 0 && (
          <Empty label="No servicing signals available." />
        )}

        {loans.flatMap((l) =>
          l.servicingData.map((s) => (
            <Row
              key={s.id}
              primary={`Loan ${s.loanId} — ${s.signalType}`}
              secondary={s.details}
              right={new Date(s.updatedAt).toLocaleDateString()}
            />
          ))
        )}
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
        <p className="text-xs text-slate-300 ml-4 whitespace-nowrap">
          {right}
        </p>
      )}
    </div>
  );
}

function Empty({ label }) {
  return <p className="text-xs text-slate-400">{label}</p>;
}
