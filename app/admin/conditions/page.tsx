
import { getPrisma } from "@/lib/prisma";
import Link from "next/link";

export const dynamic = "force-dynamic";

function statusColor(status: string) {
  switch (status) {
    case "OPEN":
      return "text-yellow-400 font-semibold";
    case "CLEARED":
      return "text-[#3CF46B] font-semibold";
    case "WAIVED":
      return "text-blue-400 font-semibold";
    default:
      return "text-slate-300";
  }
}

export default async function AdminConditionsDashboard() {
  const prisma = await getPrisma();

  // Fetch all conditions with mortgage + borrower context
  const conditions = await prisma.condition.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      mortgage: {
        include: {
          borrower: true,
          property: true,
          underwriting: true,
          fraud: true,
          pricing: true,
        },
      },
    },
  });

  return (
    <main className="min-h-screen bg-slate-950 text-white p-6 space-y-16">
      {/* HEADER */}
      <header>
        <h1 className="text-3xl font-bold text-[#3CF46B] mb-2">
          Conditions Engine Dashboard
        </h1>
        <p className="text-sm text-slate-400">
          All underwriting conditions across all loans, with borrower context and
          actionable workflow controls.
        </p>
      </header>

      {/* =============================== */}
      {/* CONDITIONS LIST */}
      {/* =============================== */}
      <section>
        <h2 className="text-xl font-semibold mb-4">All Conditions</h2>

        <div className="bg-neutral-900 border border-neutral-700 rounded-xl overflow-hidden">
          {/* Header */}
          <div className="grid grid-cols-7 gap-3 px-4 py-3 text-xs font-semibold text-slate-300 border-b border-neutral-700">
            <span>Borrower</span>
            <span>Condition</span>
            <span>Status</span>
            <span>Loan</span>
            <span>UW / Fraud</span>
            <span>Created</span>
            <span>Actions</span>
          </div>

          {conditions.length === 0 && (
            <div className="px-4 py-4 text-sm text-slate-400">
              No conditions found.
            </div>
          )}

          {conditions.map((c) => {
            const loan = c.mortgage;
            const borrower = loan.borrower;

            return (
              <div
                key={c.id}
                className="grid grid-cols-7 gap-3 px-4 py-3 text-xs border-b border-neutral-800 hover:bg-neutral-800/60 transition"
              >
                {/* Borrower */}
                <div className="flex flex-col">
                  <span className="text-slate-100">{borrower.fullName}</span>
                  <span className="text-slate-500">{borrower.email}</span>
                </div>

                {/* Condition Text */}
                <div className="flex flex-col">
                  <span className="text-slate-100">{c.text}</span>
                </div>

                {/* Status */}
                <div className="flex flex-col">
                  <span className={statusColor(c.status)}>{c.status}</span>
                </div>

                {/* Loan */}
                <div className="flex flex-col">
                  <span className="text-slate-100">Loan #{loan.id}</span>
                  <span className="text-slate-500">
                    {loan.property.address}
                  </span>
                </div>

                {/* UW / Fraud Snapshot */}
                <div className="flex flex-col">
                  <span className="text-slate-100">
                    UW: {loan.underwriting?.decision ?? "Pending"}
                  </span>
                  <span className="text-slate-500">
                    Fraud: {loan.fraud?.riskScore ?? "—"}
                  </span>
                </div>

                {/* Created */}
                <div className="flex flex-col">
                  <span className="text-slate-100">
                    {new Date(c.createdAt).toLocaleString()}
                  </span>
                </div>

                {/* Actions */}
                <div className="flex flex-col gap-2">
                  {/* CLEAR */}
                  {c.status === "OPEN" && (
                    <form action="/api/admin/conditions/clear" method="POST">
                      <input type="hidden" name="id" value={c.id} />
                      <button className="px-3 py-1 bg-[#3CF46B] text-black rounded-md font-semibold hover:bg-[#32d05f] transition">
                        Clear
                      </button>
                    </form>
                  )}

                  {/* WAIVE */}
                  {c.status === "OPEN" && (
                    <form action="/api/admin/conditions/waive" method="POST">
                      <input type="hidden" name="id" value={c.id} />
                      <button className="px-3 py-1 bg-blue-600 text-white rounded-md font-semibold hover:bg-blue-500 transition">
                        Waive
                      </button>
                    </form>
                  )}

                  {/* VIEW LOAN */}
                  <Link
                    href={`/admin/mortgages/${loan.id}`}
                    className="px-3 py-1 bg-neutral-700 rounded-md text-sm hover:bg-neutral-600 transition text-center"
                  >
                    View Loan
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* =============================== */}
      {/* ADD NEW CONDITION */}
      {/* =============================== */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold mb-4">Add New Condition</h2>

        <form
          action="/api/admin/conditions/add"
          method="POST"
          className="bg-neutral-900 border border-neutral-700 rounded-xl p-6 space-y-4"
        >
          <div className="flex flex-col">
            <label className="text-sm text-slate-400 mb-1">Loan ID</label>
            <input
              type="number"
              name="mortgageId"
              className="bg-slate-800 text-white px-3 py-2 rounded-md"
              placeholder="Enter loan ID"
              required
            />
          </div>

          <div className="flex flex-col">
            <label className="text-sm text-slate-400 mb-1">Condition Text</label>
            <input
              type="text"
              name="text"
              className="bg-slate-800 text-white px-3 py-2 rounded-md"
              placeholder="Enter condition"
              required
            />
          </div>

          <button className="px-6 py-3 bg-[#3CF46B] text-black font-semibold rounded-lg hover:bg-[#32d05f] transition">
            Add Condition
          </button>
        </form>
      </section>
    </main>
  );
}
