
import { getPrisma } from "@/lib/db/prisma";

export const dynamic = "force-dynamic";

export default async function LoanOfficerPricingViewer() {
  const prisma = await getPrisma();

  const baseRates = await prisma.baseRate.findMany();
  const llpa = await prisma.llpaGrid.findMany();
  const overlays = await prisma.pricingOverlay.findMany();
  const margins = await prisma.marginControl.findMany();
  const delivery = await prisma.deliveryPricing.findMany();
  const exceptions = await prisma.pricingException.findMany();

  // Pricing Confidence Score (0–100)
  const marketVolatility = 12; // placeholder until market API integration
  const confidenceScore = Math.max(0, 100 - marketVolatility * 2);

  // Competitor Rate Comparison (market average)
  const marketAverageRate = 6.75; // placeholder
  const lowestBaseRate = Math.min(...baseRates.map((r) => r.rate));
  const competitivePosition = lowestBaseRate - marketAverageRate;

  // Borrower-Friendly Explanation Mode
  const explanation = `
Your rate is determined by several factors:
• Base rate for your loan type and term
• Adjustments based on credit score and loan-to-value (LLPA)
• Market conditions and investor pricing
• Delivery and margin rules set by the lender
• Any applicable exceptions or overlays

We use these to ensure your pricing is accurate, fair, and competitive.
  `;

  return (
    <main className="min-h-screen bg-slate-950 text-white p-6 space-y-12">
      <h1 className="text-3xl font-bold text-[#3CF46B]">Pricing Viewer</h1>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card title="Pricing Confidence Score" value={`${confidenceScore}%`} />
        <Card
          title="Competitor Comparison"
          value={
            competitivePosition < 0
              ? `${Math.abs(competitivePosition).toFixed(3)}% below market`
              : `${competitivePosition.toFixed(3)}% above market`
          }
        />
        <Card title="Market Average Rate" value={`${marketAverageRate.toFixed(3)}%`} />
      </section>

      <Section title="Borrower-Friendly Explanation">
        <div className="bg-neutral-900 border border-neutral-700 rounded-xl p-6 text-slate-300 text-sm whitespace-pre-line">
          {explanation}
        </div>
      </Section>

      <Section title="Base Rates">
        {baseRates.map((r) => (
          <MiniCard key={r.id} label={`${r.product} ${r.term}yr`} value={`${r.rate.toFixed(3)}%`} />
        ))}
      </Section>

      <Section title="LLPA Grid">
        {llpa.map((row) => (
          <MiniCard
            key={row.id}
            label={`${row.creditBucket} / ${row.ltvBucket}`}
            value={`${row.adjustmentBps} bps`}
          />
        ))}
      </Section>

      <Section title="Overlays">
        {overlays.map((o) => (
          <MiniCard key={o.id} label={o.type} value={`${o.adjustmentBps} bps`} />
        ))}
      </Section>

      <Section title="Margins">
        {margins.map((m) => (
          <MiniCard key={m.id} label={m.scope} value={`${m.marginBps} bps`} />
        ))}
      </Section>

      <Section title="Delivery Pricing">
        {delivery.map((d) => (
          <MiniCard
            key={d.id}
            label={`${d.deliveryWindowDays} days`}
            value={`${d.adjustmentBps} bps`}
          />
        ))}
      </Section>

      <Section title="Exceptions">
        {exceptions.map((ex) => (
          <MiniCard key={ex.id} label={ex.name} value={`${ex.adjustmentBps} bps`} />
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
      <h2 className="text-xl font-bold text-[#3CF46B]">{title}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">{children}</div>
    </section>
  );
}

function MiniCard({ label, value }) {
  return (
    <div className="bg-neutral-900 border border-neutral-700 rounded-xl p-4">
      <p className="text-sm text-slate-400">{label}</p>
      <p className="text-xl font-bold">{value}</p>
    </div>
  );
}
