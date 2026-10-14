import { getPrisma } from "@/lib/db/prisma";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function Step3Income() {
  const prisma = await getPrisma();

  // TODO: Replace with authenticated borrower userId
  const userId = 0;

  const borrower = await prisma.borrower.findFirst({
    where: { userId },
    include: {
      income: true,
    },
  });

  const incomes = borrower?.income ?? [];

  return (
    <main className="min-h-screen bg-slate-950 text-white p-6 space-y-10">
      {/* HEADER */}
      <header>
        <h1 className="text-2xl font-bold text-[#3CF46B]">
          Step 3 — Income
        </h1>
        <p className="text-slate-400 text-sm">
          Tell us about your income sources.
        </p>
      </header>

      {/* EXISTING INCOME LIST */}
      {incomes.length > 0 && (
        <section className="space-y-4">
          <h2 className="text-lg font-semibold">Your Income Sources</h2>

          {incomes.map((inc) => (
            <div
              key={inc.id}
              className="bg-neutral-900 border border-neutral-700 rounded-xl p-4 space-y-2"
            >
              <p className="text-slate-100 text-sm">
                <strong>Type:</strong> {inc.type}
              </p>

              <p className="text-slate-300 text-sm">
                <strong>Monthly Amount:</strong>{" "}
                ${inc.monthlyAmount.toLocaleString()}
              </p>

              {inc.description && (
                <p className="text-slate-400 text-xs">
                  <strong>Description:</strong> {inc.description}
                </p>
              )}
            </div>
          ))}
        </section>
      )}

      {/* ADD INCOME FORM */}
      <section className="bg-neutral-900 border border-neutral-700 rounded-xl p-6 space-y-6">
        <h2 className="text-xl font-semibold mb-3">Add Income</h2>

        <form
          action="/api/borrower/application/step-3"
          method="POST"
          className="space-y-6"
        >
          {/* Income Type */}
          <div className="flex flex-col">
            <label className="text-sm text-slate-400 mb-1">Income Type</label>
            <select
              name="type"
              required
              className="bg-slate-800 text-white px-3 py-2 rounded-md"
            >
              <option value="">Choose type…</option>
              <option value="W2">W‑2 Employment</option>
              <option value="1099">1099 Contractor</option>
              <option value="SELF_EMPLOYED">Self‑Employed</option>
              <option value="RENTAL">Rental Income</option>
              <option value="RETIREMENT">Retirement Income</option>
              <option value="ALIMONY">Alimony</option>
              <option value="OTHER">Other</option>
            </select>
          </div>

          {/* Monthly Amount */}
          <div className="flex flex-col">
            <label className="text-sm text-slate-400 mb-1">
              Monthly Amount
            </label>
            <input
              type="number"
              name="monthlyAmount"
              required
              min={0}
              className="bg-slate-800 text-white px-3 py-2 rounded-md"
              placeholder="Enter monthly income"
            />
          </div>

          {/* Description */}
          <div className="flex flex-col">
            <label className="text-sm text-slate-400 mb-1">
              Description (optional)
            </label>
            <input
              type="text"
              name="description"
              className="bg-slate-800 text-white px-3 py-2 rounded-md"
              placeholder="Describe this income source"
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
