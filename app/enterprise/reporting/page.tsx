
import { getPrisma } from "@/lib/db/prisma";

export const dynamic = "force-dynamic";

export default async function EnterpriseReportingSuitePage() {
  const prisma = await getPrisma();

  const reports = await prisma.enterpriseReportDefinition.findMany({
    orderBy: { createdAt: "desc" },
    take: 100,
  });

  const runs = await prisma.enterpriseReportRun.findMany({
    orderBy: { executedAt: "desc" },
    take: 200,
  });

  const categories = await prisma.enterpriseReportCategory.findMany({
    orderBy: { name: "asc" },
  });

  return (
    <main className="min-h-screen bg-slate-950 text-white p-6 space-y-16">
      <h1 className="text-4xl font-bold text-[#3CF46B]">
        Enterprise Reporting Suite
      </h1>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card title="Report Definitions" value={reports.length} />
        <Card title="Recent Runs" value={runs.length} />
        <Card title="Categories" value={categories.length} />
      </section>

      <Section title="Report Catalog">
        {reports.length === 0 && <Empty label="No reports defined." />}
        {reports.map((r) => (
          <Row
            key={r.id}
            primary={`${r.name} — ${r.categoryName}`}
            secondary={`Scope: ${r.scope} • Frequency: ${r.frequency}`}
            right={new Date(r.createdAt).toLocaleDateString()}
          />
        ))}
      </Section>

      <Section title="Recent Report Runs">
        {runs.length === 0 && <Empty label="No report runs." />}
        {runs.map((run) => (
          <Row
            key={run.id}
            primary={`${run.reportName} — Status: ${run.status}`}
            secondary={`Rows: ${run.rowCount} • Duration: ${run.durationMs}ms`}
            right={new Date(run.executedAt).toLocaleString()}
          />
        ))}
      </Section>

      <Section title="Report Categories">
        {categories.length === 0 && <Empty label="No categories." />}
        {categories.map((c) => (
          <Row
            key={c.id}
            primary={c.name}
            secondary={c.description}
            right={`Reports: ${c.reportCount}`}
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
