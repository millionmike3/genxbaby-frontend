import { getPrisma } from "@/lib/db/prisma";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function BorrowerPricingPage() {
  const prisma = await getPrisma();

  // TODO: Replace with authenticated borrower userId
  const userId = 0;

  const borrower = await prisma.borrower.findFirst({
    where: { userId },
    include: {
      applications: {
        include: {
          pricing: true,
          underwriting: true,
          fraudEvents: true,
          borrowerProperty: true,
        },
      },
    },
  });

  if (!borrower || borrower.applications.length === 0) {
    return (
      <main className="min-h-screen bg-slate-950 text-white p-6">
        <h1 className="text-xl font-semibold">No active application found</h1>
      </main>
    );
  }

  // Active loan = most recent application
  const loan = borrower.applications[0];
  const pricing = loan.pricing;
  const property = loan.borrowerProperty?.[0];

  return (
    <main className="min-h-screen bg-slate-950 text-white p-6 space-y-12">
      {/* HEADER */}
      <header>
        <h1 className="text-3xl font-bold text-[#3CF46B] mb-2">
          Pricing Details
        </h1>
        <p className="text-sm text-slate-400">
          Your personalized loan pricing based on your application, property, and risk profile.
        </p>
      </header>

      {/* RATE SUMMARY */}
      <section className="bg-neutral-900 border border-neutral-700 rounded-xl p-6 space-y-3">
        <h2 className="text-xl font-semibold mb-3">Your Rate</h2>

        <p className="text-slate-300 text-sm">
          <strong>Adjusted Rate:</strong> {pricing?.adjustedRate ?? "—"}%
        </p>

        <p className="text-slate-300 text-sm">
          <strong>Base Rate:</strong> {pricing?.baseRate ?? "—"}%
        </p>

        <p className="text-slate-300 text-sm">
          <strong>Loan Amount:</strong> ${loan.loanAmount?.toLocaleString() ?? "—"}
        </p>

        <p className="text-slate-300 text-sm">
          <strong>Property:</strong> {property?.address ?? "No property entered"}
        </p>
      </section>

      {/* LLPA BREAKDOWN */}
      <section className="bg-neutral-900 border border-neutral-700 rounded-xl p-6 space-y-4">
        <h2 className="text-xl font-semibold mb-3">Adjustments (LLPA)</h2>

        {pricing?.llpaBreakdown?.length ? (
          <div className="space-y-3">
            {pricing.llpaBreakdown.map((adj: any, idx: number) => (
              <div
                key={idx}
                className="flex justify-between border-b border-neutral-800 pb-2"
              >
                <span className="text-slate-300">{adj.label}</span>
                <span className="text-slate-100">{adj.value}%</span>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-slate-400 text-sm">No LLPA adjustments applied.</p>
        )}
      </section>

      {/* RISK-BASED PRICING */}
      <section className="bg-neutral-900 border border-neutral-700 rounded-xl p-6 space-y-4">
        <h2 className="text-xl font-semibold mb-3">Risk-Based Pricing</h2>

        <p className="text-slate-300 text-sm">
          <strong>Underwriting Risk Tier:</strong>{" "}
          {loan.underwriting?.riskTier ?? "Pending"}
        </p>

        <p className="text-slate-300 text-sm">
          <strong>Fraud Score:</strong>{" "}
          {loan.fraudEvents?.[0]?.riskScore ?? "Pending"}
        </p>

        <p className="text-slate-300 text-sm">
          <strong>Behavioral Score:</strong>{" "}
          {loan.fraudEvents?.[0]?.behaviorScore ?? "Pending"}
        </p>

        <p className="text-slate-400 text-xs mt-2">
          These factors may influence your final rate depending on investor pricing.
        </p>
      </section>

      {/* INVESTOR PRICING */}
      <section className="bg-neutral-900 border border-neutral-700 rounded-xl p-6 space-y-4">
        <h2 className="text-xl font-semibold mb-3">Investor Pricing Influence</h2>

        {pricing?.investorName ? (
          <>
            <p className="text-slate-300 text-sm">
              <strong>Investor:</strong> {pricing.investorName}
            </p>

            <p className="text-slate-300 text-sm">
              <strong>Investor Rate:</strong> {pricing.investorRate ?? "—"}%
            </p>
          </>
        ) : (
          <p className="text-slate-400 text-sm">
            Your loan has not yet been priced by an investor.
          </p>
        )}
      </section>

      {/* SCENARIOS */}
      <section className="bg-neutral-900 border border-neutral-700 rounded-xl p-6 space-y-4">
        <h2 className="text-xl font-semibold mb-3">Compare Scenarios</h2>

        <p className="text-slate-400 text-sm">
          Want to see how your rate changes with different loan amounts or terms?
        </p>

        <Link
          href="/borrower/pricing/scenarios"
          className="inline-block px-4 py-2 bg-neutral-700 rounded-md text-sm hover:bg-neutral-600 transition"
        >
          Explore Scenarios
        </Link>
      </section>

      <Link
        href="/borrower"
        className="inline-block px-4 py-2 bg-neutral-700 rounded-md text-sm hover:bg-neutral-600 transition"
      >
        Back to Dashboard
      </Link>
    </main>
  );
}
