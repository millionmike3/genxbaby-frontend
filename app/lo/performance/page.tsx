
import { getPrisma } from "@/lib/db/prisma";

export const dynamic = "force-dynamic";

export default async function LOCoachingPerformancePage() {
  const prisma = await getPrisma();

  const context = await prisma.loPerformanceAdmin.findFirst({
    include: {
      loanOfficers: {
        orderBy: { name: "asc" },
        include: {
          performanceMetrics: true,
          coachingPlans: true,
          productionLoans: true,
        },
      },
    },
  });

  const los = context.loanOfficers;

  return (
    <main className="min-h-screen bg-slate-950 text-white p-6 space-y-16">
      <h1 className="text-4xl font-bold text-[#3CF46B]">
        LO Coaching & Performance Engine
      </h1>

      <Section title="Loan Officer Performance">
        {los.length === 0 && <Empty label="No loan officers found." />}
        <table className="w-full text-sm">
          <thead>
            <tr className="text-slate-400">
              <th className="text-left py-2">LO</th>
              <th className="text-left py-2">Funded Volume</th>
              <th className="text-left py-2">Pull‑Through</th>
              <th className="text-left py-2">Cycle Time</th>
              <th className="text-left py-2">Coaching Status</th>
            </tr>
          </thead>
          <tbody>
            {los.map((lo) => {
              const m = lo.performanceMetrics;
              const funded = m?.fundedVolume ?? 0;
              const pullThrough = m?.pullThroughPercent ?? 0;
              const cycleTime = m?.avgCycleDays ?? 0;
              const coachingStatus = lo.coachingPlans?.[0]?.status ?? "NONE";

              return (
                <tr key={lo.id} className="border-t border-neutral-800">
                  <td className="py-2">{lo.name}</td>
                  <td className="py-2">${Number(funded).toLocaleString()}</td>
                  <td className="py-2">{pullThrough}%</td>
                  <td className="py-2">{cycleTime} days</td>
                  <td className="py-2">{coachingStatus}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </Section>

      <Section title="Coaching Plans">
        {los.flatMap((lo) => lo.coachingPlans).length === 0 && (
          <Empty label="No coaching plans created." />
        )}
        {los.flatMap((lo) =>
          lo.coachingPlans.map((c) => (
            <Row
              key={c.id}
              primary={`${c.loanOfficerName} — ${c.focusArea}`}
              secondary={`Status: ${c.status} • Target Metric: ${c.targetMetric}`}
              right={new Date(c.createdAt).toLocaleDateString()}
            />
          ))
        )}
      </Section>

      <Section title="Production Loans by LO">
        {los.flatMap((lo) => lo.productionLoans).length === 0 && (
          <Empty label="No production loans." />
        )}
        {los.flatMap((lo) =>
          lo.productionLoans.map((pl) => (
            <Row
              key={pl.id}
              primary={`LO ${pl.loanOfficerName} — Loan ${pl.loanId}`}
              secondary={`Amount: $${Number(
                pl.loanAmount ?? 0
              ).toLocaleString()} • Status: ${pl.status}`}
              right={new Date(pl.createdAt).toLocaleDateString()}
            />
          ))
        )}
      </Section>
    </main>
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
