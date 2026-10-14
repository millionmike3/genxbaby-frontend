import { getPrisma } from "@/lib/db/prisma";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function Step8ReviewSubmit() {
  const prisma = await getPrisma();

  // TODO: Replace with authenticated borrower userId
  const userId = 0;

  const borrower = await prisma.borrower.findFirst({
    where: { userId },
    include: {
      applications: {
        include: {
          borrowerProperty: true,
        },
      },
      borrowerEmployment: true,
      borrowerIncome: true,
      borrowerAssets: true,
      borrowerDeclarations: true,
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
  const property = loan.borrowerProperty?.[0] ?? null;

  return (
    <main className="min-h-screen bg-slate-950 text-white p-6 space-y-12">
      <header>
        <h1 className="text-3xl font-bold text-[#3CF46B] mb-2">
          Step 8 — Review & Submit
        </h1>
        <p className="text-sm text-slate-400">
          Review your application details before submitting.
        </p>
      </header>

      {/* Borrower Info */}
      <section className="bg-neutral-900 border border-neutral-700 rounded-xl p-6 space-y-2">
        <h2 className="text-xl font-semibold mb-3">Borrower Information</h2>
        <p className="text-slate-300 text-sm"><strong>Name:</strong> {borrower.fullName}</p>
        <p className="text-slate-300 text-sm"><strong>Email:</strong> {borrower.email}</p>
        <p className="text-slate-300 text-sm"><strong>Phone:</strong> {borrower.phone}</p>
      </section>

      {/* Employment */}
      <section className="bg-neutral-900 border border-neutral-700 rounded-xl p-6 space-y-3">
        <h2 className="text-xl font-semibold mb-3">Employment</h2>
        {borrower.borrowerEmployment.map((job) => (
          <div key={job.id} className="border-b border-neutral-800 pb-3">
            <p className="text-slate-100 text-sm"><strong>Employer:</strong> {job.employer}</p>
            <p className="text-slate-300 text-sm"><strong>Position:</strong> {job.position}</p>
            <p className="text-slate-300 text-sm">
              <strong>Start:</strong> {new Date(job.startDate).toLocaleDateString()}
            </p>
            <p className="text-slate-300 text-sm">
              <strong>End:</strong> {job.endDate ? new Date(job.endDate).toLocaleDateString() : "Present"}
            </p>
          </div>
        ))}
      </section>

      {/* Income */}
      <section className="bg-neutral-900 border border-neutral-700 rounded-xl p-6 space-y-3">
        <h2 className="text-xl font-semibold mb-3">Income</h2>
        {borrower.borrowerIncome.map((inc) => (
          <div key={inc.id} className="border-b border-neutral-800 pb-3">
            <p className="text-slate-100 text-sm"><strong>Type:</strong> {inc.type}</p>
            <p className="text-slate-300 text-sm">
              <strong>Monthly Amount:</strong> ${inc.monthlyAmount.toLocaleString()}
            </p>
            {inc.description && (
              <p className="text-slate-400 text-xs"><strong>Description:</strong> {inc.description}</p>
            )}
          </div>
        ))}
      </section>

      {/* Assets */}
      <section className="bg-neutral-900 border border-neutral-700 rounded-xl p-6 space-y-3">
        <h2 className="text-xl font-semibold mb-3">Assets</h2>
        {borrower.borrowerAssets.map((asset) => (
          <div key={asset.id} className="border-b border-neutral-800 pb-3">
            <p className="text-slate-100 text-sm"><strong>Type:</strong> {asset.type}</p>
            <p className="text-slate-300 text-sm">
              <strong>Amount:</strong> ${asset.amount.toLocaleString()}
            </p>
            {asset.institution && (
              <p className="text-slate-400 text-xs"><strong>Institution:</strong> {asset.institution}</p>
            )}
          </div>
        ))}
      </section>

      {/* Declarations */}
      <section className="bg-neutral-900 border border-neutral-700 rounded-xl p-6 space-y-3">
        <h2 className="text-xl font-semibold mb-3">Declarations</h2>
        {borrower.borrowerDeclarations.map((dec) => (
          <div key={dec.id} className="border-b border-neutral-800 pb-3">
            <p className="text-slate-100 text-sm"><strong>{dec.question}</strong></p>
            <p className="text-slate-300 text-sm">Answer: {dec.answer ? "Yes" : "No"}</p>
          </div>
        ))}
      </section>

      {/* Property */}
      <section className="bg-neutral-900 border border-neutral-700 rounded-xl p-6 space-y-3">
        <h2 className="text-xl font-semibold mb-3">Property Details</h2>
        <p className="text-slate-300 text-sm"><strong>Address:</strong> {property?.address}</p>
        <p className="text-slate-300 text-sm"><strong>Type:</strong> {property?.type}</p>
        <p className="text-slate-300 text-sm"><strong>Occupancy:</strong> {property?.occupancy}</p>
        <p className="text-slate-300 text-sm">
          <strong>Estimated Value:</strong> ${property?.estimatedValue?.toLocaleString()}
        </p>
      </section>

      {/* Purpose */}
      <section className="bg-neutral-900 border border-neutral-700 rounded-xl p-6 space-y-3">
        <h2 className="text-xl font-semibold mb-3">Loan Purpose</h2>
        <p className="text-slate-300 text-sm"><strong>Purpose:</strong> {loan.loanPurpose}</p>

        {loan.purchasePrice && (
          <p className="text-slate-300 text-sm">
            <strong>Purchase Price:</strong> ${loan.purchasePrice.toLocaleString()}
          </p>
        )}

        {loan.refinanceAmount && (
          <p className="text-slate-300 text-sm">
            <strong>Refinance Amount:</strong> ${loan.refinanceAmount.toLocaleString()}
          </p>
        )}
      </section>

      {/* Submit */}
      <section className="bg-neutral-900 border border-neutral-700 rounded-xl p-6">
        <form action="/api/borrower/application/submit" method="POST">
          <button className="px-6 py-3 bg-[#3CF46B] text-black font-semibold rounded-lg hover:bg-[#32d05f] transition w-full">
            Submit Application
          </button>
        </form>
      </section>

      <Link
        href="/borrower/application"
        className="inline-block px-4 py-2 bg-neutral-700 rounded-md text-sm hover:bg-neutral-600 transition"
      >
        Back to Steps
      </Link>
    </main>
  );
}
