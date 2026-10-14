
import { getPrisma } from "@/lib/db/prisma";

export const dynamic = "force-dynamic";

export default async function BorrowerPricingPage() {
  const prisma = await getPrisma();

  // Assume borrower identity resolved via session/middleware
  const borrowerId = "CURRENT_BORROWER_ID";

  const borrower = await prisma.borrower.findUnique({
    where: { id: borrowerId },
    include: { loan: true },
  });

  const loan = borrower.loan;

  const payment = calculatePayment(
    loan.loanAmount,
    loan.finalRate,
    loan.termYears
  );

  const alt30yrRate = loan.finalRate + 0.25;
  const alt15yrRate = loan.finalRate - 0.375;

  const alt30yrPayment = calculatePayment(
    loan.loanAmount,
    alt30yrRate,
    30
  );

  const alt15yrPayment = calculatePayment(
    loan.loanAmount,
    alt15yrRate,
    15
  );

  return (
    <main className="min-h-screen bg-slate-950 text-white p-6 space-y-12">
      <h1 className="text-4xl font-bold text-[#3CF46B]">
        Your Pricing
      </h1>

      {/* Current Pricing */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card title="Loan Amount" value={`$${loan.loanAmount.toLocaleString()}`} />
        <Card title="Rate" value={`${loan.finalRate.toFixed(3)}%`} />
        <Card title="Estimated Payment" value={`$${payment.toLocaleString()}/mo`} />
      </section>

      {/* Breakdown */}
      <Section title="How Your Rate Was Determined">
        <Row primary="Base Rate" right={`${loan.baseRate.toFixed(3)}%`} />
        <Row primary="Credit & LTV Adjustments (LLPA)" right={`${loan.llpaBps} bps`} />
        <Row primary="Overlays" right={`${loan.overlayBps} bps`} />
        <Row primary="Margins" right={`${loan.marginBps} bps`} />
        <Row primary="Delivery" right={`${loan.deliveryBps} bps`} />
        <Row primary="Exceptions" right={`${loan.exceptionBps} bps`} />

        <div className="pt-4 border-t border-neutral-800">
          <Row primary="Final Rate" right={`${loan.finalRate.toFixed(3)}%`} />
        </div>
      </Section>

      {/* Alternatives */}
      <Section title="Compare Other Options">
        <Row
          primary="30‑Year Option"
          secondary={`Rate: ${alt30yrRate.toFixed(3)}%`}
          right={`~$${alt30yrPayment.toLocaleString()}/mo`}
        />
        <Row
          primary="15‑Year Option"
          secondary={`Rate: ${alt15yrRate.toFixed(3)}%`}
          right={`~$${alt15yrPayment.toLocaleString()}/mo`}
        />
      </Section>

      {/* Explanation */}
      <Section title="Simple Explanation">
        <div className="bg-neutral-900 border border-neutral-700 rounded-xl p-6 text-slate-300 text-sm whitespace-pre-line">
          {getBorrowerExplanation(loan)}
        </div>
      </Section>
    </main>
  );
}

function Card({ title, value }: { title: string; value: string }) {
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
      <h2 className="text-xl font-bold text-[#3CF46B]">{title}</h2>
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
        <p className="text-xs text-slate-300 ml-4 whitespace-nowrap">{right}</p>
      )}
    </div>
  );
}

function calculatePayment(amount: number, ratePercent: number, termYears: number) {
  const r = ratePercent / 100 / 12;
  const n = termYears * 12;
  if (r === 0) return amount / n;
  return (amount * r) / (1 - Math.pow(1 + r, -n));
}

function getBorrowerExplanation(loan: any) {
  return `Your rate of ${loan.finalRate.toFixed(
    3
  )}% is based on your loan type, term, credit profile, loan‑to‑value, and current market conditions.

We start with a base rate for your product and term, then apply small adjustments for things like credit score, down payment, and risk factors. We also factor in how investors price loans in the secondary market and any special exceptions that apply to your situation.

The goal is to give you pricing that is accurate, fair, and competitive while keeping your approval strong and your monthly payment manageable.

If you’d like to explore different options (shorter term, different product, or lower payment), your Loan Officer can walk you through scenarios tailored to you.`;
}
