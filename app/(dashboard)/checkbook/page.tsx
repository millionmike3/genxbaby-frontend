import { getPrisma } from "@/lib/db/prisma";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function CheckbookPage() {
  const prisma = await getPrisma();

  // Fetch bank profiles
  const banks = await prisma.bankProfile.findMany({
    orderBy: { bankName: "asc" },
  });

  // Get next check number
  const lastCheck = await prisma.check.findFirst({
    orderBy: { checkNo: "desc" },
  });

  const nextCheckNo = (lastCheck?.checkNo ?? 1000) + 1;

  return (
    <main className="min-h-screen bg-slate-950 text-white p-6 space-y-12">
      {/* HEADER */}
      <header>
        <h1 className="text-3xl font-bold text-[#3CF46B] mb-2">
          Certified Checkbook
        </h1>
        <p className="text-sm text-slate-400">
          Create certified checks with MICR accuracy and QR verification.
        </p>
      </header>

      {/* CHECK CREATION FORM */}
      <section className="bg-neutral-900 border border-neutral-700 rounded-xl p-6 space-y-6">
        <h2 className="text-xl font-semibold mb-3">Create a Check</h2>

        <form
          action="/api/checkbook/create"
          method="POST"
          className="space-y-6"
        >
          {/* Check Number */}
          <div className="flex flex-col">
            <label className="text-sm text-slate-400 mb-1">Check Number</label>
            <input
              type="number"
              name="checkNo"
              defaultValue={nextCheckNo}
              readOnly
              className="bg-slate-800 text-white px-3 py-2 rounded-md opacity-70"
            />
          </div>

          {/* Bank Profile */}
          <div className="flex flex-col">
            <label className="text-sm text-slate-400 mb-1">Bank Profile</label>
            <select
              name="bankId"
              required
              className="bg-slate-800 text-white px-3 py-2 rounded-md"
            >
              <option value="">Choose bank…</option>
              {banks.map((b) => (
                <option key={b.id} value={b.id}>
                  {b.bankName}
                </option>
              ))}
            </select>
          </div>

          {/* Payee */}
          <div className="flex flex-col">
            <label className="text-sm text-slate-400 mb-1">Payee</label>
            <input
              type="text"
              name="payee"
              required
              className="bg-slate-800 text-white px-3 py-2 rounded-md"
              placeholder="Enter payee name"
            />
          </div>

          {/* Amount */}
          <div className="flex flex-col">
            <label className="text-sm text-slate-400 mb-1">Amount</label>
            <input
              type="number"
              name="amount"
              required
              min={1}
              className="bg-slate-800 text-white px-3 py-2 rounded-md"
              placeholder="Enter amount"
            />
          </div>

          {/* Memo */}
          <div className="flex flex-col">
            <label className="text-sm text-slate-400 mb-1">Memo (optional)</label>
            <input
              type="text"
              name="memo"
              className="bg-slate-800 text-white px-3 py-2 rounded-md"
              placeholder="Memo"
            />
          </div>

          <button className="px-6 py-3 bg-[#3CF46B] text-black font-semibold rounded-lg hover:bg-[#32d05f] transition">
            Generate Certified Check
          </button>
        </form>
      </section>

      {/* LINKS */}
      <section className="flex gap-4">
        <Link
          href="/checks"
          className="px-4 py-2 bg-neutral-700 rounded-md text-sm hover:bg-neutral-600 transition"
        >
          View Check Logs
        </Link>

        <Link
          href="/bank-profiles"
          className="px-4 py-2 bg-neutral-700 rounded-md text-sm hover:bg-neutral-600 transition"
        >
          Manage Bank Profiles
        </Link>
      </section>
    </main>
  );
}
