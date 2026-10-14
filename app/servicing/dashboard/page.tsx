
import { getPrisma } from "@/lib/db/prisma";

export const dynamic = "force-dynamic";

export default async function ServicingDashboardPage() {
  const prisma = await getPrisma();

  const servicing = await prisma.servicingSummary.findFirst({
    include: {
      servicingLoans: {
        orderBy: { updatedAt: "desc" },
        take: 200,
        include: {
          borrower: true,
          delinquencyData: true,
          escrowData: true,
          lossMitigationData: true,
        },
      },
      delinquencyBuckets: {
        orderBy: { bucketDays: "asc" },
      },
      escrowShortages: {
        orderBy: { createdAt: "desc" },
        take: 100,
      },
      lossMitigationCases: {
        orderBy: { createdAt: "desc" },
        take: 100,
      },
    },
  });

  const loans = servicing.servicingLoans;
  const buckets = servicing.delinquencyBuckets;
  const shortages = servicing.escrowShortages;
  const lossMit = servicing.lossMitigationCases;

  const totalUPB = loans.reduce(
    (sum, l) => sum + (l.unpaidPrincipalBalance ?? 0),
    0
  );

  const currentCount = loans.filter((l) => l.delinquencyData?.status === "CURRENT").length;
  const delinquentCount = loans.filter(
    (l) => l.delinquencyData && l.delinquencyData.status !== "CURRENT"
  ).length;

  return (
    <main className="min-h-screen bg-slate-950 text-white p-6 space-y-16">
      <h1 className="text-4xl font-bold text-[#3CF46B]">
        Servicing Dashboard
      </h1>

      <section className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card title="Total Servicing UPB" value={`$${totalUPB.toLocaleString()}`} />
        <Card title="Loans in Servicing" value={loans.length} />
        <Card title="Current Loans" value={currentCount} />
        <Card title="Delinquent Loans" value={delinquentCount} />
      </section>

      <Section title="Delinquency Buckets">
        {buckets.length === 0 && <Empty label="No delinquency data." />}
        <table className="w-full text-sm">
          <thead>
            <tr className="text-slate-400">
              <th className="text-left py-2">Bucket</th>
              <th className="text-left py-2">Loan Count</th>
              <th className="text-left py-2">UPB</th>
            </tr>
          </thead>
          <tbody>
            {buckets.map((b) => (
              <tr key={b.id} className="border-t border-neutral-800">
                <td className="py-2">{b.bucketLabel}</td>
                <td className="py-2">{b.loanCount}</td>
                <td className="py-2">
                  ${Number(b.upbAmount ?? 0).toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Section>

      <Section title="Escrow Shortages">
        {shortages.length === 0 && <Empty label="No escrow shortages." />}
        {shortages.map((s) => (
          <Row
            key={s.id}
            primary={`Loan ${s.loanId} — Shortage $${Number(
              s.shortageAmount ?? 0
            ).toLocaleString()}`}
            secondary={`Reason: ${s.reason}`}
            right={new Date(s.createdAt).toLocaleDateString()}
          />
        ))}
      </Section>

      <Section title="Loss Mitigation Cases">
        {lossMit.length === 0 && <Empty label="No loss mitigation cases." />}
        {lossMit.map((c) => (
          <Row
            key={c.id}
            primary={`Loan ${c.loanId} — ${c.programType}`}
            secondary={`Status: ${c.status}`}
            right={new Date(c.createdAt).toLocaleDateString()}
          />
        ))}
      </Section>

      <Section title="Servicing Loans">
        {loans.length === 0 && <Empty label="No servicing loans." />}
        <table className="w-full text-sm">
          <thead>
            <tr className="text-slate-400">
              <th className="text-left py-2">Loan</th>
              <th className="text-left py-2">Borrower</th>
              <th className="text-left py-2">UPB</th>
              <th className="text-left py-2">Delinquency</th>
              <th className="text-left py-2">Escrow</th>
            </tr>
          </thead>
          <tbody>
            {loans.map((l) => (
              <tr key={l.id} className="border-t border-neutral-800">
                <td className="py-2">{l.loanId}</td>
                <td className="py-2">
                  {l.borrower.firstName} {l.borrower.lastName}
                </td>
                <td className="py-2">
                  ${Number(l.unpaidPrincipalBalance ?? 0).toLocaleString()}
                </td>
                <td className="py-2">
                  {l.delinquencyData?.status ?? "UNKNOWN"}
                </td>
                <td className="py-2">
                  {l.escrowData?.status ?? "OK"}
                </td>
              </tr>
            ))}
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
