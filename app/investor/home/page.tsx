
import { getPrisma } from "@/lib/db/prisma";

export const dynamic = "force-dynamic";

export default async function InvestorHomePage() {
  const prisma = await getPrisma();

  // Assume investor identity resolved via session/middleware
  const investorId = "CURRENT_INVESTOR_ID";

  const investor = await prisma.investor.findUnique({
    where: { id: investorId },
    include: {
      executions: {
        orderBy: { executedAt: "desc" },
        take: 50,
      },
      deliverySheets: {
        orderBy: { effectiveDate: "desc" },
        take: 10,
      },
      pipelineLoans: {
        orderBy: { createdAt: "desc" },
        take: 50,
      },
    },
  });

  const executions = investor.executions;
  const deliverySheets = investor.deliverySheets;
  const pipelineLoans = investor.pipelineLoans;

  const totalPipeline = pipelineLoans.reduce(
    (sum, l) => sum + (l.loanAmount ?? 0),
    0
  );

  const totalPnL = executions.reduce(
    (sum, e) => sum + (e.realizedPnl ?? 0),
    0
  );

  return (
    <main className="min-h-screen bg-slate-950 text-white p-6 space-y-16">
      <h1 className="text-4xl font-bold text-[#3CF46B]">
        {investor.name} — Investor Portal
      </h1>

      {/* Top summary */}
      <section className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card
          title="Pipeline With You"
          value={`$${totalPipeline.toLocaleString()}`}
        />
        <Card title="Recent Executions" value={executions.length} />
        <Card title="Execution P&L (Recent)" value={`$${totalPnL.toLocaleString()}`} />
        <Card
          title="Active Delivery Sheets"
          value={deliverySheets.length}
        />
      </section>

      {/* Delivery pricing */}
      <Section title="Delivery Pricing Sheets">
        {deliverySheets.length === 0 && (
          <Empty label="No active delivery sheets." />
        )}
        {deliverySheets.map((sheet) => (
          <Row
            key={sheet.id}
            primary={`Sheet ${sheet.id} — ${sheet.productType}`}
            secondary={`Effective: ${new Date(
              sheet.effectiveDate
            ).toLocaleDateString()} • Window: ${
              sheet.deliveryWindowDays
            } days`}
            right={`${sheet.basePrice.toFixed(3)}%`}
          />
        ))}
      </Section>

      {/* Pipeline loans */}
      <Section title="Pipeline Loans Assigned To You">
        {pipelineLoans.length === 0 && (
          <Empty label="No loans currently assigned to this investor." />
        )}
        {pipelineLoans.map((loan) => (
          <Row
            key={loan.id}
            primary={`Loan ${loan.id} — $${Number(
              loan.loanAmount ?? 0
            ).toLocaleString()} • ${loan.product} • ${loan.term}yr`}
            secondary={`Status: ${loan.status}`}
            right={new Date(loan.createdAt).toLocaleDateString()}
          />
        ))}
      </Section>

      {/* Recent executions */}
      <Section title="Recent Executions With You">
        {executions.length === 0 && (
          <Empty label="No recent executions." />
        )}
        {executions.map((e) => (
          <Row
            key={e.id}
            primary={`Execution ${e.id} — ${e.executionType}`}
            secondary={`Delivery: ${e.deliveryWindowDays} days • Pair‑off: $${Number(
              e.pairOffCost ?? 0
            ).toLocaleString()}`}
            right={`P&L: $${Number(e.realizedPnl ?? 0).toLocaleString()}`}
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
