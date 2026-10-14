"use server";

import { getPrisma } from "@/lib/db/prisma";
import Link from "next/link";

interface PageProps {
  params: {
    id: string;
  };
}

export default async function InvestorAllocatePage({ params }: PageProps) {
  const prisma = await getPrisma();
  const investorId = params.id;

  const investor = await prisma.investor.findUnique({
    where: { id: investorId },
    include: {
      allocations: true,
    },
  });

  if (!investor) {
    return (
      <main className="min-h-screen bg-slate-950 text-white p-6">
        <h1 className="text-xl font-semibold text-red-500">Investor not found</h1>
      </main>
    );
  }

  const loans = await prisma.mortgage.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      borrower: true,
      property: true,
      pricing: true,
      underwriting: true,
      allocations: true,
    },
  });

  return (
    <main className="min-h-screen bg-slate-950 text-white p-6 space-y-12">
      <header>
        <h1 className="text-3xl font-bold text-[#3CF46B] mb-2">
          Allocate Capital — {investor.name}
        </h1>
        <p className="text-sm text-slate-400">
          Deploy investor capital into active mortgage loans.
        </p>
      </header>

      {/* Allocation Form */}
      <section className="bg-neutral-900 border border-neutral-700 rounded-xl p-6 space-y-6">
        <h2 className="text-xl font-semibold mb-4">New Allocation</h2>

        <form
          action="/api/admin/investors/allocate"
          method="POST"
          className="space-y-4"
        >
          <input type="hidden" name="investorId" value={investorId} />

          {/* Loan Selection */}
          <div className="flex flex-col">
            <label className="text-sm text-slate-400 mb-1">Select Loan</label>
            <select
              name="mortgageId"
              required
              className="bg-slate-800 text-white px-3 py-2 rounded-md"
            >
              <option value="">Choose a loan…</option>
              {loans.map((loan) => (
                <option key={loan.id} value={loan.id}>
                  Loan #{loan.id} — {loan.borrower.fullName} —{" "}
                  {loan.property.address}
                </option>
              ))}
            </select>
          </div>

          {/* Allocation Amount */}
          <div className="flex flex-col">
            <label className="text-sm text-slate-400 mb-1">Amount</label>
            <input
              type="number"
              name="amount"
              required
              min={1}
              className="bg-slate-800 text-white px-3 py-2 rounded-md"
              placeholder="Enter allocation amount"
            />
          </div>

          <button className="px-6 py-3 bg-[#3CF46B] text-black font-semibold rounded-lg hover:bg-[#32d05f] transition">
            Allocate Capital
          </button>
        </form>
      </section>

      {/* Existing Allocations */}
      <section>
        <h2 className="text-xl font-semibold mb-4">Existing Allocations</h2>

        <div className="space-y-4">
          {investor.allocations.length === 0 && (
            <p className="text-sm text-slate-400">No allocations found.</p>
          )}

          {investor.allocations.map((alloc) => (
            <div
              key={alloc.id}
              className="bg-neutral-900 border border-neutral-700 rounded-xl p-6"
            >
              <h3 className="text-lg font-semibold">
                Loan #{alloc.mortgageId}
              </h3>

              <p className="text-slate-300 mt-2">
                <strong>Amount:</strong> ${alloc.amount.toLocaleString()}
              </p>

              <p className="text-slate-500 text-sm mt-1">
                {alloc.createdAt.toDateString()}
              </p>

              <div className="flex gap-3 mt-4">
                <form action="/api/admin/investors/deallocate" method="POST">
                  <input type="hidden" name="id" value={alloc.id} />
                  <button className="px-4 py-2 bg-red-600 hover:bg-red-500 text-white rounded-lg">
                    Remove Allocation
                  </button>
                </form>

                <Link
                  href={`/admin/mortgages/${alloc.mortgageId}`}
                  className="px-4 py-2 bg-neutral-700 rounded-md text-sm hover:bg-neutral-600 transition"
                >
                  View Loan
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
