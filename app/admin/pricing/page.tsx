import { getPrisma } from "@/lib/prisma";
import Link from "next/link";

export const dynamic = "force-dynamic";

//
// 1. LLPA Grid (REAL MODEL)
//
async function getLLPA() {
  const prisma = await getPrisma();
  return prisma.llpaGrid.findMany({
    orderBy: [
      { productType: "asc" },
      { purpose: "asc" },
      { occupancy: "asc" },
      { ficoMin: "asc" },
      { ltvMin: "asc" },
    ],
  });
}

//
// 2. Investor Pricing Sheets
//
async function getInvestorSheets() {
  const prisma = await getPrisma();
  return prisma.investorPricingSheet.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      investor: true,
    },
  });
}

//
// 3. Pricing Jobs (PricingResult)
//
async function getPricingJobs() {
  const prisma = await getPrisma();
  return prisma.PricingResult.findMany({
    orderBy: { createdAt: "desc" },
    take: 50,
  });
}

export default async function AdminPricingDashboard() {
  const [llpa, sheets, jobs] = await Promise.all([
    getLLPA(),
    getInvestorSheets(),
    getPricingJobs(),
  ]);

  return (
    <main className="min-h-screen bg-slate-950 text-white p-6 space-y-16">
      {/* HEADER */}
      <header>
        <h1 className="text-3xl font-bold text-[#3CF46B] mb-2">
          Pricing Engine Dashboard
        </h1>
        <p className="text-sm text-slate-400">
          LLPA grids, investor sheets, pricing intelligence, and pricing results.
        </p>
      </header>

      {/* ========================= */}
      {/* SECTION 1 — LLPA GRID     */}
      {/* ========================= */}
      <section>
        <h2 className="text-xl font-semibold mb-4">LLPA Grid</h2>

        <div className="bg-neutral-900 border border-neutral-700 rounded-xl overflow-hidden">
          <div className="grid grid-cols-7 gap-3 px-4 py-3 text-xs font-semibold text-slate-300 border-b border-neutral-700">
            <span>Product</span>
            <span>Purpose</span>
            <span>Occupancy</span>
            <span>FICO</span>
            <span>LTV</span>
            <span>LLPA (bps)</span>
            <span>Updated</span>
          </div>

          {llpa.length === 0 && (
            <div className="px-4 py-4 text-sm text-slate-400">
              No LLPA entries found.
            </div>
          )}

          {llpa.map((row) => (
            <div
              key={row.id}
              className="grid grid-cols-7 gap-3 px-4 py-3 text-xs border-b border-neutral-800 hover:bg-neutral-800/60 transition"
            >
              <span>{row.productType}</span>
              <span>{row.purpose}</span>
              <span>{row.occupancy}</span>
              <span>{row.ficoMin}–{row.ficoMax}</span>
              <span>{row.ltvMin}–{row.ltvMax}</span>
              <span>{row.llpaBps}</span>
              <span>{new Date(row.createdAt).toLocaleString()}</span>
            </div>
          ))}
        </div>
      </section>

      {/* =============================== */}
      {/* SECTION 2 — INVESTOR SHEETS     */}
      {/* =============================== */}
      <section>
        <h2 className="text-xl font-semibold mb-4">Investor Pricing Sheets</h2>

        <div className="space-y-4">
          {sheets.map((sheet) => (
            <div
              key={sheet.id}
              className="bg-neutral-900 border border-neutral-700 rounded-xl p-6"
            >
              <h3 className="text-lg font-semibold">
                {sheet.investor?.name ?? "Investor"}
              </h3>

              <p className="text-slate-300 text-sm">
                Uploaded: {new Date(sheet.createdAt).toLocaleString()}
              </p>

              <p className="text-slate-400 text-sm mt-1">
                Rows: {sheet.rowCount}
              </p>

              <div className="flex gap-3 mt-4">
                <form action="/api/admin/pricing/reingest" method="POST">
                  <input type="hidden" name="sheetId" value={sheet.id} />
                  <button className="px-4 py-2 bg-[#3CF46B] text-black rounded-md font-semibold hover:bg-[#32d05f] transition">
                    Re‑Ingest
                  </button>
                </form>

                <Link
                  href={`/admin/pricing/sheets/${sheet.id}`}
                  className="px-4 py-2 bg-neutral-700 rounded-md text-sm hover:bg-neutral-600 transition"
                >
                  View Sheet
                </Link>
              </div>
            </div>
          ))}

          {sheets.length === 0 && (
            <p className="text-slate-400 text-sm">No investor sheets uploaded.</p>
          )}
        </div>
      </section>

      {/* =============================== */}
      {/* SECTION 3 — PRICING JOBS        */}
      {/* =============================== */}
      <section>
        <h2 className="text-xl font-semibold mb-4">Pricing Jobs</h2>

        <div className="bg-neutral-900 border border-neutral-700 rounded-xl overflow-hidden">
          <div className="grid grid-cols-4 gap-3 px-4 py-3 text-xs font-semibold text-slate-300 border-b border-neutral-700">
            <span>Job Type</span>
            <span>Status</span>
            <span>Message</span>
            <span>Timestamp</span>
          </div>

          {jobs.length === 0 && (
            <div className="px-4 py-4 text-sm text-slate-400">
              No pricing jobs found.
            </div>
          )}

          {jobs.map((job) => (
            <div
              key={job.id}
              className="grid grid-cols-4 gap-3 px-4 py-3 text-xs border-b border-neutral-800 hover:bg-neutral-800/60 transition"
            >
              <span>{job.type}</span>
              <span>{job.status}</span>
              <span className="truncate">{job.message ?? "—"}</span>
              <span>{new Date(job.createdAt).toLocaleString()}</span>
            </div>
          ))}
        </div>
      </section>

      {/* =============================== */}
      {/* SECTION 4 — ACTIONS             */}
      {/* =============================== */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold mb-4">Pricing Actions</h2>

        <div className="flex gap-4">
          <form action="/api/admin/pricing/refresh" method="POST">
            <button className="px-6 py-3 bg-[#3CF46B] text-black font-semibold rounded-lg hover:bg-[#32d05f] transition">
              Refresh Pricing
            </button>
          </form>

          <form action="/api/admin/pricing/ingest" method="POST">
            <button className="px-6 py-3 bg-neutral-700 text-white font-semibold rounded-lg hover:bg-neutral-600 transition">
              Ingest Investor Sheet
            </button>
          </form>

          <form action="/api/admin/pricing/intelligence" method="POST">
            <button className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-500 transition">
              Run Pricing Intelligence
            </button>
          </form>
        </div>
      </section>
    </main>
  );
}
