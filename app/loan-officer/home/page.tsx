
import { getPrisma } from "@/lib/db/prisma";

export const dynamic = "force-dynamic";

export default async function LoanOfficerHomePage() {
  const prisma = await getPrisma();

  // Assume current LO is resolved upstream (middleware/session)
  const loanOfficerId = "CURRENT_LOAN_OFFICER_ID";

  const [tasks, leads, pipelineLoans, rateLocks] = await Promise.all([
    prisma.loTask.findMany({
      where: { loanOfficerId, status: "OPEN" },
      orderBy: { dueAt: "asc" },
      take: 20,
    }),
    prisma.lead.findMany({
      where: { loanOfficerId, status: { in: ["NEW", "IN_PROGRESS"] } },
      orderBy: { score: "desc" },
      take: 20,
    }),
    prisma.loan.findMany({
      where: { loanOfficerId, status: { in: ["IN_PROCESS", "APPROVED"] } },
      orderBy: { createdAt: "desc" },
      take: 20,
    }),
    prisma.rateLock.findMany({
      where: { loanOfficerId, status: "LOCKED" },
      orderBy: { expiresAt: "asc" },
      take: 20,
    }),
  ]);

  const pipelineValue = pipelineLoans.reduce(
    (sum, l) => sum + (l.loanAmount ?? 0),
    0
  );

  const hotLeads = leads.filter((l) => (l.score ?? 0) >= 80).length;
  const tasksDueToday = tasks.filter((t) => isToday(t.dueAt)).length;
  const locksExpiringSoon = rateLocks.filter((r) =>
    isWithinDays(r.expiresAt, 3)
  ).length;

  return (
    <main className="min-h-screen bg-slate-950 text-white p-6 space-y-12">
      <h1 className="text-4xl font-bold text-[#3CF46B]">
        Loan Officer Command Center
      </h1>

      {/* Top KPIs */}
      <section className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card title="Pipeline Value" value={`$${pipelineValue.toLocaleString()}`} />
        <Card title="Hot Leads" value={hotLeads} />
        <Card title="Tasks Due Today" value={tasksDueToday} />
        <Card title="Locks Expiring (3d)" value={locksExpiringSoon} />
      </section>

      {/* Tasks */}
      <Section title="Today’s Tasks">
        {tasks.length === 0 && (
          <Empty label="No open tasks. Great time to work your leads." />
        )}
        {tasks.map((t) => (
          <Row
            key={t.id}
            primary={t.title}
            secondary={t.description}
            right={formatDue(t.dueAt)}
          />
        ))}
      </Section>

      {/* Leads */}
      <Section title="Priority Leads">
        {leads.length === 0 && (
          <Empty label="No active leads assigned. Check with your manager." />
        )}
        {leads.map((l) => (
          <Row
            key={l.id}
            primary={`${l.name} (${l.source})`}
            secondary={l.email || l.phone}
            right={`Score: ${l.score}`}
          />
        ))}
      </Section>

      {/* Pipeline */}
      <Section title="Active Pipeline">
        {pipelineLoans.length === 0 && (
          <Empty label="No active loans in pipeline." />
        )}
        {pipelineLoans.map((loan) => (
          <Row
            key={loan.id}
            primary={`$${loan.loanAmount.toLocaleString()} • ${loan.product} • ${loan.term}yr`}
            secondary={`Status: ${loan.status}`}
            right={new Date(loan.createdAt).toLocaleDateString()}
          />
        ))}
      </Section>

      {/* Rate locks */}
      <Section title="Rate Locks (Expiring Soon)">
        {rateLocks.length === 0 && (
          <Empty label="No active rate locks." />
        )}
        {rateLocks.map((lock) => (
          <Row
            key={lock.id}
            primary={`Loan ${lock.loanId} • ${lock.rate.toFixed(3)}%`}
            secondary={`Locked: ${new Date(lock.lockedAt).toLocaleDateString()}`}
            right={`Expires: ${new Date(lock.expiresAt).toLocaleDateString()}`}
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

function Section({ title, children }: { title: string; children: React.ReactNode }) {
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
  secondary?: string | null;
  right?: string | number | null;
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
        <p className="text-xs text-slate-300 ml-4 whitespace-nowrap">{right}</p>
      )}
    </div>
  );
}

function Empty({ label }: { label: string }) {
  return <p className="text-xs text-slate-400">{label}</p>;
}

function isToday(date: Date) {
  const d = new Date(date);
  const now = new Date();
  return (
    d.getFullYear() === now.getFullYear() &&
    d.getMonth() === now.getMonth() &&
    d.getDate() === now.getDate()
  );
}

function isWithinDays(date: Date, days: number) {
  const d = new Date(date).getTime();
  const now = Date.now();
  const diffDays = (d - now) / 86400000;
  return diffDays >= 0 && diffDays <= days;
}

function formatDue(date: Date) {
  const d = new Date(date);
  return `Due ${d.toLocaleDateString()} ${d.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  })}`;
}
