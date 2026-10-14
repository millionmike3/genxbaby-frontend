
import { getPrisma } from "@/lib/db/prisma";
import Link from "next/link";

export const dynamic = "force-dynamic";

function statusColor(status: string) {
  switch (status) {
    case "READY_FOR_CTC":
    case "CTC":
      return "text-[#3CF46B] font-semibold";
    case "FUNDED":
      return "text-blue-400 font-semibold";
    case "PENDING":
      return "text-yellow-400 font-semibold";
    case "FAILED":
      return "text-red-500 font-semibold";
    default:
      return "text-slate-300";
  }
}

export default async function AdminFundingPage() {
  const prisma = await getPrisma();

  // Loans in funding pipeline
  const loans = await prisma.mortgage.findMany({
    where: {
      status: {
        in: ["CTC", "READY_FOR_CTC", "FUNDING", "FUNDED"],
      },
    },
    orderBy: { createdAt: "desc" },
    include: {
      borrower: true,
      property: true,
      underwriting: true,
      pricing: true,
      funding: true,
    },
  });

  // Investor funding requests
  const requests = await prisma.fundingRequest.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      investor: true,
    },
  });

  return (
    <main className="min-h-screen bg-slate-950 text-white p-6 space-y-16">
      {/* HEADER */}
      <header>
        <h1 className="text-3xl font-bold text-[#3CF46B] mb-2">
          Funding Engine Dashboard
        </h1>
        <p className="text-sm text-slate-400">
          Loans ready for Clear‑to‑Close, funding status, disbursement history,
          investor funding requests, and workflow actions.
        </p>
      </header>

      {/* =============================== */}
      {/* FUNDING PIPELINE LIST           */}
      {/* =============================== */}
      <section>
        <h2 className="text-xl font-semibold mb-4">Funding Pipeline</h2>

        <div className="bg-neutral-900 border border-neutral-700 rounded-xl overflow-hidden">
          {/* Header */}
          <div className="grid grid-cols-7 gap-3 px-4 py-3 text-xs font-semibold text-slate-300 border-b border-neutral-700">
            <span>Borrower</span>
            <span>Loan</span>
            <span>Status</span>
            <span>CTC / Funding</span>
            <span>Pricing</span>
            <span>Created</span>
            <span>Actions</span>
          </div>

          {loans.length === 0 && (
            <div className="px-4 py-4 text-sm text-slate-400">
              No loans in funding pipeline.
            </div>
          )}

          {loans.map((loan) => {
            const funding = loan.funding;

            return (
              <div
                key={loan.id}
                className="grid grid-cols-7 gap-3 px-4 py-3 text-xs border-b border-neutral-800 hover:bg-neutral-800/60 transition"
              >
                {/* Borrower */}
                <div className="flex flex-col">
                  <span className="text-slate-100">{loan.borrower.fullName}</span>
                  <span className="text-slate-500">{loan.borrower.email}</span>
                </div>

                {/* Loan */}
                <div className="flex flex-col">
                  <span className="text-slate-100">Loan #{loan.id}</span>
                  <span className="text-slate-500">
                    {loan.property.address}
                  </span>
                </div>

                {/* Status */}
                <div className="flex flex-col">
                  <span className={statusColor(loan.status)}>{loan.status}</span>
                  <span className="text-slate-500">
                    {funding?.status ?? "No funding record"}
                  </span>
                </div>

                {/* CTC / Funding */}
                <div className="flex flex-col">
                  <span className="text-slate-100">
                    CTC: {funding?.clearToCloseAt
                      ? new Date(funding.clearToCloseAt).toLocaleString()
                      : "Not marked"}
                  </span>
                  <span className="text-slate-500">
                    Funded: {funding?.fundedAt
                      ? new Date(funding.fundedAt).toLocaleString()
                      : "Not funded"}
                  </span>
                </div>

                {/* Pricing */}
                <div className="flex flex-col">
                  <span className="text-slate-100">
                    Rate: {loan.pricing?.adjustedRate ?? "—"}%
                  </span>
                  <span className="text-slate-500">
                    Amount: ${loan.loanAmount?.toLocaleString() ?? "—"}
                  </span>
                </div>

                {/* Created */}
                <div className="flex flex-col">
                  <span className="text-slate-100">
                    {new Date(loan.createdAt).toLocaleString()}
                  </span>
                </div>

                {/* Actions */}
                <div className="flex flex-col gap-2">
                  {/* MARK CTC */}
                  {loan.status !== "CTC" && (
                    <form action="/api/admin/funding/ctc" method="POST">
                      <input type="hidden" name="id" value={loan.id} />
                      <button className="px-3 py-1 bg-[#3CF46B] text-black rounded-md font-semibold hover:bg-[#32d05f] transition">
                        Mark CTC
                      </button>
                    </form>
                  )}

                  {/* FUND LOAN */}
                  {loan.status !== "FUNDED" && (
                    <form action="/api/admin/funding/fund" method="POST">
                      <input type="hidden" name="id" value={loan.id} />
                      <button className="px-3 py-1 bg-blue-600 text-white rounded-md font-semibold hover:bg-blue-500 transition">
                        Fund Loan
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
      {/* FUNDING REQUESTS                */}
      {/* =============================== */}
      <section>
        <h2 className="text-xl font-semibold mb-4">Funding Requests</h2>

        <div className="space-y-4">
          {requests.length === 0 && (
            <p className="text-sm text-slate-400">No funding requests found.</p>
          )}

          {requests.map((req) => (
            <div
              key={req.id}
              className="bg-slate-800/60 p-6 rounded-xl border border-slate-700 flex flex-col md:flex-row md:justify-between gap-4"
            >
              <div>
                <h3 className="text-xl font-semibold">
                  {req.investor?.name ?? "Investor"} — {req.type}
                </h3>

                <p className="text-slate-300 mt-2">
                  <strong>Amount:</strong> ${req.amount.toLocaleString()}
                </p>
                <p className="text-slate-300">
                  <strong>Status:</strong> {req.status}
                </p>
                <p className="text-slate-500 text-sm mt-1">
                  {req.createdAt.toDateString()}
                </p>
              </div>

              {req.status === "PENDING" && (
                <div className="flex items-center gap-3">
                  <form action="/api/admin/funding/approve" method="POST">
                    <input type="hidden" name="id" value={req.id} />
                    <button className="px-4 py-2 bg-green-600 hover:bg-green-500 text-white rounded-lg">
                      Approve
                    </button>
                  </form>

                  <form action="/api/admin/funding/reject" method="POST">
                    <input type="hidden" name="id" value={req.id} />
                    <button className="px-4 py-2 bg-red-600 hover:bg-red-500 text-white rounded-lg">
                      Reject
                    </button>
                  </form>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* =============================== */}
      {/* FUNDING ENGINE ACTIONS          */}
      {/* =============================== */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold mb-4">Funding Engine Actions</h2>

        <div className="flex gap-4">
          {/* Refresh Funding Status */}
          <form action="/api/admin/funding/refresh" method="POST">
            <button className="px-6 py-3 bg-[#3CF46B] text-black font-semibold rounded-lg hover:bg-[#32d05f] transition">
              Refresh Funding Status
            </button>
          </form>

          {/* Run Funding Audit */}
          <form action="/api/admin/funding/audit" method="POST">
            <button className="px-6 py-3 bg-neutral-700 text-white font-semibold rounded-lg hover:bg-neutral-600 transition">
              Run Funding Audit
            </button>
          </form>
        </div>
      </section>
    </main>
  );
}
