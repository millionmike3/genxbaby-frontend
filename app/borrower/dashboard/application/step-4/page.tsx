import { getPrisma } from "@/lib/db/prisma";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function Step4Assets() {
  const prisma = await getPrisma();

  // TODO: Replace with authenticated borrower userId
  const userId = 0;

  const borrower = await prisma.borrower.findFirst({
    where: { userId },
    include: {
      assets: true,
    },
  });

  const assets = borrower?.assets ?? [];

  return (
    <main className="min-h-screen bg-slate-950 text-white p-6 space-y-10">
      {/* HEADER */}
      <header>
        <h1 className="text-2xl font-bold text-[#3CF46B]">
          Step 4 — Assets
        </h1>
        <p className="text-slate-400 text-sm">
          Tell us about your financial assets.
        </p>
      </header>

      {/* EXISTING ASSETS LIST */}
      {assets.length > 0 && (
        <section className="space-y-4">
          <h2 className="text-lg font-semibold">Your Assets</h2>

          {assets.map((asset) => (
            <div
              key={asset.id}
              className="bg-neutral-900 border border-neutral-700 rounded-xl p-4 space-y-2"
            >
              <p className="text-slate-100 text-sm">
                <strong>Type:</strong> {asset.type}
              </p>

              <p className="text-slate-300 text-sm">
                <strong>Amount:</strong>{" "}
                ${asset.amount.toLocaleString()}
              </p>

              {asset.institution && (
                <p className="text-slate-400 text-xs">
                  <strong>Institution:</strong> {asset.institution}
                </p>
              )}
            </div>
          ))}
        </section>
      )}

      {/* ADD ASSET FORM */}
      <section className="bg-neutral-900 border border-neutral-700 rounded-xl p-6 space-y-6">
        <h2 className="text-xl font-semibold mb-3">Add Asset</h2>

        <form
          action="/api/borrower/application/step-4"
          method="POST"
          className="space-y-6"
        >
          {/* Asset Type */}
          <div className="flex flex-col">
            <label className="text-sm text-slate-400 mb-1">Asset Type</label>
            <select
              name="type"
              required
              className="bg-slate-800 text-white px-3 py-2 rounded-md"
            >
              <option value="">Choose type…</option>
              <option value="CHECKING">Checking Account</option>
              <option value="SAVINGS">Savings Account</option>
              <option value="CASH">Cash on Hand</option>
              <option value="RETIREMENT">Retirement Account</option>
              <option value="BROKERAGE">Brokerage Account</option>
              <option value="GIFT_FUNDS">Gift Funds</option>
              <option value="OTHER">Other</option>
            </select>
          </div>

          {/* Institution */}
          <div className="flex flex-col">
            <label className="text-sm text-slate-400 mb-1">
              Institution (optional)
            </label>
            <input
              type="text"
              name="institution"
              className="bg-slate-800 text-white px-3 py-2 rounded-md"
              placeholder="Bank or financial institution"
            />
          </div>

          {/* Amount */}
          <div className="flex flex-col">
            <label className="text-sm text-slate-400 mb-1">Amount</label>
            <input
              type="number"
              name="amount"
              required
              min={0}
              className="bg-slate-800 text-white px-3 py-2 rounded-md"
              placeholder="Enter asset amount"
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
