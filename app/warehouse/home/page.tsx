
import { getPrisma } from "@/lib/db/prisma";

export const dynamic = "force-dynamic";

export default async function WarehouseHomePage() {
  const prisma = await getPrisma();

  // Assume warehouse lender identity resolved via session/middleware
  const warehouseLenderId = "CURRENT_WAREHOUSE_LENDER_ID";

  const lender = await prisma.warehouseLender.findUnique({
    where: { id: warehouseLenderId },
    include: {
      facilities: {
        orderBy: { createdAt: "asc" },
      },
      fundedLoans: {
        orderBy: { fundedAt: "desc" },
        take: 100,
      },
      agingBuckets: {
        orderBy: { bucketDays: "asc" },
      },
      marginCalls: {
        orderBy: { createdAt: "desc" },
        take: 50,
      },
    },
  });

  const facilities = lender.facilities;
  const fundedLoans = lender.fundedLoans;
  const agingBuckets = lender.agingBuckets;
  const marginCalls = lender.marginCalls;

  const totalCapacity = facilities.reduce(
    (sum, f) => sum + (f.limitAmount ?? 0),
    0
  );

  const totalUtilization = facilities.reduce(
    (sum, f) => sum + (f.currentBalance ?? 0),
    0
  );

  const utilizationPercent =
    totalCapacity === 0
      ? 0
      : Math.round((totalUtilization / totalCapacity) * 100);

  const totalAgedExposure = agingBuckets.reduce(
    (sum, b) => sum + (b.exposureAmount ?? 0),
    0
  );

  return (
    <main className="min-h-screen bg-slate-950 text-white p-6 space-y-16">
      <h1 className="text-4xl font-bold text-[#3CF46B]">
        {lender.name} — Warehouse Lender Portal
      </h1>

      {/* Top summary */}
      <section className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card
          title="Total Facility Capacity"
          value={`$${totalCapacity.toLocaleString()}`}
        />
        <Card
          title="Current Utilization"
          value={`$${totalUtilization.toLocaleString()}`}
        />
        <Card
          title="Utilization %"
          value={`${utilizationPercent}%`}
        />
        <Card
          title="Aged Exposure"
          value={`$${totalAgedExposure.toLocaleString()}`}
        />
      </section>

      {/* Facilities */}
      <Section title="Warehouse Facilities">
        {facilities.length === 0 && (
          <Empty label="No facilities configured for this lender." />
        )}
        {facilities.map((f) => (
          <Row
            key={f.id}
            primary={`${f.name} — Limit $${Number(
              f.limitAmount ?? 0
            ).toLocaleString()}`}
            secondary={`Balance $${Number(
              f.currentBalance ?? 0
            ).toLocaleString()} • Margin ${f.marginPercent.toFixed(2)}%`}
            right={`Opened ${new Date(f.createdAt).toLocaleDateString()}`}
          />
        ))}
      </Section>

      {/* Funded loans */}
      <Section title="Funded Loans on Warehouse Line">
        {fundedLoans.length === 0 && (
          <Empty label="No loans currently funded on this warehouse line." />
        )}
        {fundedLoans.map((loan) => (
          <Row
            key={loan.id}
            primary={`Loan ${loan.loanId} — $${Number(
              loan.loanAmount ?? 0
            ).toLocaleString()} • ${loan.product} • ${loan.term}yr`}
            secondary={`Aging: ${loan.agingDays} days • Status: ${loan.status}`}
            right={`Funded ${new Date(loan.fundedAt).toLocaleDateString()}`}
          />
        ))}
      </Section>

      {/* Aging buckets */}
      <Section title="Aging Buckets">
        {agingBuckets.length === 0 && (
          <Empty label="No aging data available." />
        )}
        <table className="w-full text-sm">
          <thead>
            <tr className="text-slate-400">
              <th className="text-left py-2">Bucket</th>
              <th className="text-left py-2">Exposure</th>
              <th className="text-left py-2">Loan Count</th>
            </tr>
          </thead>
          <tbody>
            {agingBuckets.map((b) => (
              <tr
                key={b.id}
                className="border-t border-neutral-800"
              >
                <td className="py-2">{b.bucketLabel}</td>
                <td className="py-2">
                  ${Number(b.exposureAmount ?? 0).toLocaleString()}
                </td>
                <td className="py-2">{b.loanCount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Section>

      {/* Margin calls */}
      <Section title="Margin Calls">
        {marginCalls.length === 0 && (
          <Empty label="No active or recent margin calls." />
        )}
        {marginCalls.map((m) => (
          <Row
            key={m.id}
            primary={`Margin Call $${Number(
              m.callAmount ?? 0
            ).toLocaleString()}`}
            secondary={`Reason: ${m.reason} • Status: ${m.status}`}
            right={new Date(m.createdAt).toLocaleString()}
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
