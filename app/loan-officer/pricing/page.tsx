
import { getPrisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function LoanOfficerPricingViewer() {
  const prisma = await getPrisma();

  const [baseRates, llpa, overlays, margins, delivery, exceptions] =
    await Promise.all([
      prisma.investorPricingSheet.findMany({
        orderBy: { createdAt: "desc" },
      }),
      prisma.llpaGrid.findMany({
        orderBy: [
          { productType: "asc" },
          { ficoMin: "asc" },
          { ltvMin: "asc" },
        ],
      }),
      prisma.productOverlay.findMany(),
      prisma.pricingMatrix.findMany({
        orderBy: { created_at: "desc" },
        take: 100,
      }),
      prisma.investorRateSheetSnapshot.findMany({
        orderBy: { created_at: "desc" },
        take: 100,
      }),
      prisma.nonQMPricingRule.findMany(),
    ]);

  const marketAverageRate = 6.75;

  const validRates = baseRates
    .map((sheet) => sheet.baseRate)
    .filter((rate): rate is number => rate !== null);

  const lowestBaseRate =
    validRates.length > 0 ? Math.min(...validRates) : null;

  const competitivePosition =
    lowestBaseRate === null
      ? null
      : lowestBaseRate - marketAverageRate;

  const marketVolatility = 12;
  const confidenceScore = Math.max(0, 100 - marketVolatility * 2);

  return (
    <main className="min-h-screen bg-slate-950 text-white p-6 space-y-12">
      <h1 className="text-3xl font-bold text-[#3CF46B]">
        Pricing Viewer
      </h1>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card
          title="Pricing Confidence Score"
          value={`${confidenceScore}%`}
        />
        <Card
          title="Competitor Comparison"
          value={
            competitivePosition === null
              ? "No pricing data"
              : competitivePosition < 0
                ? `${Math.abs(competitivePosition).toFixed(3)}% below market`
                : `${competitivePosition.toFixed(3)}% above market`
          }
        />
        <Card
          title="Market Average Rate"
          value={`${marketAverageRate.toFixed(3)}%`}
        />
      </section>

      <Section title="Borrower-Friendly Explanation">
        <p className="text-slate-300 text-sm">
          Your rate is determined by the investor pricing sheet, loan
          product, credit score, loan-to-value ratio, pricing adjustments,
          and applicable lender rules. Final pricing depends on the
          complete loan scenario and current investor terms.
        </p>
      </Section>

      <Section title="Investor Base Rates">
        {baseRates.map((sheet) => (
          <MiniCard
            key={sheet.id}
            label={sheet.programName ?? "Investor Pricing Sheet"}
            value={
              sheet.baseRate === null
                ? "Not specified"
                : `${sheet.baseRate.toFixed(3)}%`
            }
          />
        ))}
        {baseRates.length === 0 && <Empty />}
      </Section>

      <Section title="LLPA Grid">
        {llpa.map((row) => (
          <MiniCard
            key={row.id}
            label={`${row.investor} · ${row.productType} · FICO ${row.ficoMin}-${row.ficoMax} · LTV ${row.ltvMin}-${row.ltvMax}`}
            value={`${row.llpaBps} bps`}
          />
        ))}
        {llpa.length === 0 && <Empty />}
      </Section>

      <Section title="Product Overlays">
        {overlays.map((item) => (
          <MiniCard
            key={item.id}
            label={item.productType ?? "Product Overlay"}
            value={
              item.overlayRate === null
                ? "Not specified"
                : `${item.overlayRate.toFixed(3)}%`
            }
          />
        ))}
        {overlays.length === 0 && <Empty />}
      </Section>

      <Section title="Pricing Margins">
        {margins.map((item) => (
          <MiniCard
            key={item.id}
            label={`${item.product_type} · ${item.lending_type} · ${item.credit_tier}`}
            value={`${item.margin_bps} bps`}
          />
        ))}
        {margins.length === 0 && <Empty />}
      </Section>

      <Section title="Investor Execution Pricing">
        {delivery.map((item) => (
          <MiniCard
            key={item.id}
            label={`${item.investor} · ${item.product_type}`}
            value={`Execution ${item.execution_adj_bps} bps · Overlay ${item.overlay_adj_bps} bps`}
          />
        ))}
        {delivery.length === 0 && <Empty />}
      </Section>

      <Section title="Non-QM Pricing Rules">
        {exceptions.map((item) => (
          <MiniCard
            key={item.id}
            label={item.ruleName ?? "Non-QM Rule"}
            value={
              item.adjustment === null
                ? "Not specified"
                : `${item.adjustment} adjustment`
            }
          />
        ))}
        {exceptions.length === 0 && <Empty />}
      </Section>
    </main>
  );
}

function Card({
  title,
  value,
}: {
  title: string;
  value: string;
}) {
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
      <h2 className="text-xl font-bold text-[#3CF46B]">{title}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {children}
      </div>
    </section>
  );
}

function MiniCard({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="bg-neutral-900 border border-neutral-700 rounded-xl p-4">
      <p className="text-sm text-slate-400">{label}</p>
      <p className="text-xl font-bold">{value}</p>
    </div>
  );
}

function Empty() {
  return (
    <p className="text-sm text-slate-400">
      No pricing records found.
    </p>
  );
}
