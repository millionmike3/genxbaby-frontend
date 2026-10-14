import { getPrisma } from "@/lib/db/prisma";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function AffordabilityCalculatorPage() {
  const prisma = await getPrisma();

  // TODO: Replace with authenticated borrower userId
  const userId = "REPLACE_WITH_AUTH_USER_ID";

  const borrower = await prisma.borrower.findUnique({
    where: { userId },
    include: {
      income: true,
      assets: true,
    },
  });

  const totalMonthlyIncome =
    borrower?.income.reduce((acc, i) => acc + i.monthlyAmount, 0) ?? 0;

  const totalAssets =
    borrower?.assets.reduce((acc, a) => acc + a.amount, 0) ?? 0;

  return (
    <main className="min-h-screen bg-slate-950 text-white p-6 space-y-12">
      {/* HEADER */}
      <header>
        <h1 className="text-3xl font-bold text-[#3CF46B] mb-2">
          Home Affordability Calculator
        </h1>
        <p className="text-sm text-slate-400">
          Calculate how much home you can afford based on your income, assets,
          and loan type.
        </p>
      </header>

      {/* SUMMARY */}
      <section className="bg-neutral-900 border border-neutral-700 rounded-xl p-6 space-y-3">
        <h2 className="text-xl font-semibold mb-3">Your Financial Snapshot</h2>
        <p className="text-slate-300 text-sm">
          <strong>Total Monthly Income:</strong>{" "}
          ${totalMonthlyIncome.toLocaleString()}
        </p>
        <p className="text-slate-300 text-sm">
          <strong>Total Assets:</strong> ${totalAssets.toLocaleString()}
        </p>
      </section>

      {/* CALCULATOR FORM */}
      <section className="bg-neutral-900 border border-neutral-700 rounded-xl p-6 space-y-6">
        <h2 className="text-xl font-semibold mb-3">Affordability Inputs</h2>
        <form
          action="/api/affordability/calc"
          method="POST"
          className="space-y-6"
        >
          {/* Loan Type */}
          <div className="flex flex-col">
            <label className="text-sm text-slate-400 mb-1">Loan Type</label>
            <select
              name="loanType"
              required
              className="bg-slate-800 text-white px-3 py-2 rounded-md"
            >
              <option value="CONVENTIONAL">Conventional</option>
              <option value="FHA">FHA</option>
              <option value="VA">VA</option>
              <option value="NONQM">Non‑QM</option>
            </select>
          </div>

          {/* Interest Rate */}
          <div className="flex flex-col">
            <label className="text-sm text-slate-400 mb-1">
              Interest Rate (%)
            </label>
            <input
              type="number"
              name="rate"
              step="0.01"
              required
              className="bg-slate-800 text-white px-3 py-2 rounded-md"
              placeholder="Enter interest rate"
            />
          </div>

          {/* Down Payment */}
          <div className="flex flex-col">
            <label className="text-sm text-slate-400 mb-1">Down Payment</label>
            <input
              type="number"
              name="downPayment"
              min={0}
              className="bg-slate-800 text-white px-3 py-2 rounded-md"
              placeholder="Enter down payment"
            />
          </div>

          {/* Taxes */}
          <div className="flex flex-col">
            <label className="text-sm text-slate-400 mb-1">
              Annual Property Taxes
            </label>
            <input
              type="number"
              name="taxes"
              min={0}
              className="bg-slate-800 text-white px-3 py-2 rounded-md"
              placeholder="Enter annual taxes"
            />
          </div>

          {/* Insurance */}
          <div className="flex flex-col">
            <label className="text-sm text-slate-400 mb-1">
              Annual Insurance
            </label>
            <input
              type="number"
              name="insurance"
              min={0}
              className="bg-slate-800 text-white px-3 py-2 rounded-md"
              placeholder="Enter annual insurance"
            />
          </div>

          {/* HOA */}
          <div className="flex flex-col">
            <label className="text-sm text-slate-400 mb-1">
              Monthly HOA (optional)
            </label>
            <input
              type="number"
              name="hoa"
              min={0}
              className="bg-slate-800 text-white px-3 py-2 rounded-md"
              placeholder="Enter HOA"
            />
          </div>

          <button className="px-6 py-3 bg-[#3CF46B] text-black font-semibold rounded-lg hover:bg-[#32d05f] transition">
            Calculate Affordability
          </button>
        </form>
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
