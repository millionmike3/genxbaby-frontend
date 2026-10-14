import { getPrisma } from "@/lib/db/prisma";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function Step7LoanPurpose() {
  const prisma = await getPrisma();

  // TODO: Replace with authenticated borrower userId
  const userId = 0;

  const borrower = await prisma.borrower.findFirst({
    where: { userId },
    include: {
      applications: true,
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

  return (
    <main className="min-h-screen bg-slate-950 text-white p-6 space-y-10">
      {/* HEADER */}
      <header>
        <h1 className="text-2xl font-bold text-[#3CF46B]">
          Step 7 — Loan Purpose
        </h1>
        <p className="text-slate-400 text-sm">
          Tell us the purpose of your loan.
        </p>
      </header>

      {/* EXISTING PURPOSE */}
      {loan.loanPurpose && (
        <section className="space-y-4">
          <h2 className="text-lg font-semibold">Current Loan Purpose</h2>

          <div className="bg-neutral-900 border border-neutral-700 rounded-xl p-4 space-y-2">
            <p className="text-slate-100 text-sm">
              <strong>Purpose:</strong> {loan.loanPurpose}
            </p>

            {loan.purchasePrice && (
              <p className="text-slate-300 text-sm">
                <strong>Purchase Price:</strong>{" "}
                ${loan.purchasePrice.toLocaleString()}
              </p>
            )}

            {loan.refinanceAmount && (
              <p className="text-slate-300 text-sm">
                <strong>Refinance Amount:</strong>{" "}
                ${loan.refinanceAmount.toLocaleString()}
              </p>
            )}
          </div>
        </section>
      )}

      {/* PURPOSE FORM */}
      <section className="bg-neutral-900 border border-neutral-700 rounded-xl p-6 space-y-6">
        <h2 className="text-xl font-semibold mb-3">Update Loan Purpose</h2>

        <form
          action="/api/borrower/application/step-7"
          method="POST"
          className="space-y-6"
        >
          {/* Purpose */}
          <div className="flex flex-col">
            <label className="text-sm text-slate-400 mb-1">Loan Purpose</label>
            <select
              name="purpose"
              required
              defaultValue={loan.loanPurpose ?? ""}
              className="bg-slate-800 text-white px-3 py-2 rounded-md"
            >
              <option value="">Choose purpose…</option>
              <option value="PURCHASE">Purchase</option>
              <option value="REFINANCE_RATE_TERM">Refinance — Rate/Term</option>
              <option value="REFINANCE_CASH_OUT">Refinance — Cash‑Out</option>
            </select>
          </div>

          {/* Purchase Price */}
          <div className="flex flex-col">
            <label className="text-sm text-slate-400 mb-1">
              Purchase Price (if purchase)
            </label>
            <input
              type="number"
              name="purchasePrice"
              defaultValue={loan.purchasePrice ?? ""}
              min={0}
              className="bg-slate-800 text-white px-3 py-2 rounded-md"
              placeholder="Enter purchase price"
            />
          </div>

          {/* Refinance Amount */}
          <div className="flex flex-col">
            <label className="text-sm text-slate-400 mb-1">
              Refinance Amount (if refinance)
            </label>
            <input
              type="number"
              name="refinanceAmount"
              defaultValue={loan.refinanceAmount ?? ""}
              min={0}
              className="bg-slate-800 text-white px-3 py-2 rounded-md"
              placeholder="Enter refinance amount"
            />
          </div>

          <button className="px-6 py-3 bg-[#3CF46B] text-black font-semibold rounded-lg hover:bg-[#32d05f] transition">
            Save & Continue
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
