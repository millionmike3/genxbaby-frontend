
import { getPrisma } from "@/lib/db/prisma";

export const dynamic = "force-dynamic";

export default async function CorrespondentHomePage() {
  const prisma = await getPrisma();

  // Assume correspondent identity resolved via session/middleware
  const correspondentId = "CURRENT_CORRESPONDENT_ID";

  const correspondent = await prisma.correspondent.findUnique({
    where: { id: correspondentId },
    include: {
      deliveryPricing: {
        orderBy: { effectiveDate: "desc" },
        take: 20,
      },
      submittedLoans: {
        orderBy: { submittedAt: "desc" },
        take: 100,
      },
      purchaseAdvices: {
        orderBy: { createdAt: "desc" },
        take: 50,
      },
      suspenseItems: {
        orderBy: { createdAt: "desc" },
        take: 50,
      },
      collateralStatuses: {
        orderBy: { updatedAt: "desc" },
        take: 50,
      },
    },
  });

  const pricingSheets = correspondent.deliveryPricing;
  const submittedLoans = correspondent.submittedLoans;
  const purchaseAdvices = correspondent.purchaseAdvices;
  const suspenseItems = correspondent.suspenseItems;
  const collateralStatuses = correspondent.collateralStatuses;

  const totalSubmitted = submittedLoans.reduce(
    (sum, l) => sum + (l.loanAmount ?? 0),
    0
  );

  const pendingSuspense = suspenseItems.filter(
    (s) => s.status !== "CLEARED"
  ).length;

  const clearedSuspense = suspenseItems.filter(
    (s) => s.status === "CLEARED"
  ).length;

  const purchasedLoans = purchaseAdvices.length;

  return (
    <main className="min-h-screen bg-slate-950 text-white p-6 space-y-16">
      <h1 className="text-4xl font-bold text-[#3CF46B]">
        {correspondent.name} — Correspondent Lender Portal
      </h1>

      {/* Top summary */}
      <section className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card
          title="Submitted Pipeline"
          value={`$${totalSubmitted.toLocaleString()}`}
        />
        <Card
          title="Loans Submitted"
          value={submittedLoans.length}
        />
        <Card
          title="Purchased Loans"
          value={purchasedLoans}
        />
        <Card
          title="Suspense Items"
          value={`${pendingSuspense} pending / ${clearedSuspense} cleared`}
        />
      </section>

      {/* Delivery Pricing */}
      <Section title="Delivery Pricing Sheets">
        {pricingSheets.length === 0 && (
          <Empty label="No active delivery pricing sheets." />
        )}
        {pricingSheets.map((sheet) => (
          <Row
            key={sheet.id}
            primary={`Sheet ${sheet.id} — ${sheet.productType}`}
            secondary={`Effective ${new Date(
              sheet.effectiveDate
            ).toLocaleDateString()} • Window ${sheet.deliveryWindowDays} days`}
            right={`${sheet.basePrice.toFixed(3)}%`}
          />
        ))}
      </Section>

      {/* Submitted Loans */}
      <Section title="Submitted Loans">
        {submittedLoans.length === 0 && (
          <Empty label="No loans submitted yet." />
        )}
        {submittedLoans.map((loan) => (
          <Row
            key={loan.id}
            primary={`Loan ${loan.id} — $${Number(
              loan.loanAmount ?? 0
            ).toLocaleString()} • ${loan.product} • ${loan.term}yr`}
            secondary={`Status: ${loan.status}`}
            right={new Date(loan.submittedAt).toLocaleDateString()}
          />
        ))}
      </Section>

      {/* Purchase Advices */}
      <Section title="Purchase Advices">
        {purchaseAdvices.length === 0 && (
          <Empty label="No purchase advices issued yet." />
        )}
        {purchaseAdvices.map((pa) => (
          <Row
            key={pa.id}
            primary={`Loan ${pa.loanId} — Purchase $${Number(
              pa.purchaseAmount ?? 0
            ).toLocaleString()}`}
            secondary={`Adjustments: $${Number(
              pa.adjustments ?? 0
            ).toLocaleString()}`}
            right={new Date(pa.createdAt).toLocaleDateString()}
          />
        ))}
      </Section>

      {/* Suspense Items */}
      <Section title="Suspense Items">
        {suspenseItems.length === 0 && (
          <Empty label="No suspense items." />
        )}
        {suspenseItems.map((s) => (
          <Row
            key={s.id}
            primary={`Loan ${s.loanId} — ${s.item}`}
            secondary={`Status: ${s.status}`}
            right={new Date(s.createdAt).toLocaleDateString()}
          />
        ))}
      </Section>

      {/* Collateral Status */}
      <Section title="Collateral Status">
        {collateralStatuses.length === 0 && (
          <Empty label="No collateral updates." />
        )}
        {collateralStatuses.map((c) => (
          <Row
            key={c.id}
            primary={`Loan ${c.loanId} — ${c.status}`}
            secondary={`Notes: ${c.notes}`}
            right={new Date(c.updatedAt).toLocaleDateString()}
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
