
import { getPrisma } from "@/lib/prisma";
import Link from "next/link";

export const dynamic = "force-dynamic";

function statusColor(status: string) {
  switch (status) {
    case "VERIFIED":
    case "APPROVED":
      return "text-[#3CF46B] font-semibold";
    case "REJECTED":
      return "text-red-500 font-semibold";
    case "PENDING":
      return "text-yellow-400 font-semibold";
    default:
      return "text-slate-300";
  }
}

export default async function AdminDocumentsPage() {
  const prisma = await getPrisma();

  // Combined document fetch: mortgage + application + investor approvals
  const documents = await prisma.document.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      mortgage: {
        include: {
          borrower: true,
          property: true,
        },
      },
      application: {
        include: {
          borrower: true,
        },
      },
      approvals: {
        include: {
          investor: true,
        },
      },
    },
  });

  return (
    <main className="min-h-screen bg-slate-950 text-white p-6 space-y-16">
      {/* HEADER */}
      <header>
        <h1 className="text-3xl font-bold text-[#3CF46B] mb-2">
          Document Intelligence Dashboard
        </h1>
        <p className="text-sm text-slate-400">
          Mortgage documents, application documents, investor approvals, fraud scans,
          underwriting triggers, and document verification.
        </p>
      </header>

      {/* =============================== */}
      {/* DOCUMENT LIST */}
      {/* =============================== */}
      <section>
        <h2 className="text-xl font-semibold mb-4">All Documents</h2>

        <div className="bg-neutral-900 border border-neutral-700 rounded-xl overflow-hidden">
          {/* Header */}
          <div className="grid grid-cols-7 gap-3 px-4 py-3 text-xs font-semibold text-slate-300 border-b border-neutral-700">
            <span>Borrower</span>
            <span>Document</span>
            <span>Type</span>
            <span>Status</span>
            <span>Uploaded</span>
            <span>Approval</span>
            <span>Actions</span>
          </div>

          {documents.length === 0 && (
            <div className="px-4 py-4 text-sm text-slate-400">
              No documents uploaded.
            </div>
          )}

          {documents.map((doc) => {
            const approval = doc.approvals?.[0];

            const borrowerName =
              doc.mortgage?.borrower?.fullName ??
              doc.application?.borrower?.fullName ??
              "Unknown";

            return (
              <div
                key={doc.id}
                className="grid grid-cols-7 gap-3 px-4 py-3 text-xs border-b border-neutral-800 hover:bg-neutral-800/60 transition"
              >
                {/* Borrower */}
                <div className="flex flex-col">
                  <span className="text-slate-100">{borrowerName}</span>
                  {doc.mortgageId && (
                    <span className="text-slate-500">Loan #{doc.mortgageId}</span>
                  )}
                  {doc.applicationId && (
                    <span className="text-slate-500">App #{doc.applicationId}</span>
                  )}
                </div>

                {/* Document Name */}
                <div className="flex flex-col">
                  <span className="text-slate-100">{doc.name}</span>
                  <span className="text-slate-500 truncate">{doc.url}</span>
                </div>

                {/* Type */}
                <div className="flex flex-col">
                  <span className="text-slate-100">{doc.type ?? "Unclassified"}</span>
                  <span className="text-slate-500">{doc.classification ?? ""}</span>
                </div>

                {/* Status */}
                <div className="flex flex-col">
                  <span className={statusColor(doc.status)}>{doc.status}</span>
                </div>

                {/* Uploaded */}
                <div className="flex flex-col">
                  <span className="text-slate-100">
                    {new Date(doc.createdAt).toLocaleString()}
                  </span>
                </div>

                {/* Approval */}
                <div className="flex flex-col">
                  {approval ? (
                    <>
                      <span className={statusColor(approval.status)}>
                        {approval.status}
                      </span>
                      <span className="text-slate-500">
                        {approval.investor?.name ?? ""}
                      </span>
                    </>
                  ) : (
                    <span className="text-yellow-400">PENDING</span>
                  )}
                </div>

                {/* Actions */}
                <div className="flex flex-col gap-2">
                  {/* VIEW DOCUMENT */}
                  <a
                    href={doc.url}
                    target="_blank"
                    className="px-3 py-1 rounded bg-slate-700 text-white text-xs font-semibold text-center"
                  >
                    View
                  </a>

                  {/* FRAUD SCAN */}
                  <form action="/api/fraud/documents/run" method="post">
                    <input type="hidden" name="documentId" value={doc.id} />
                    <button
                      type="submit"
                      className="px-3 py-1 rounded bg-red-600 text-white text-xs font-semibold w-full"
                    >
                      Fraud Scan
                    </button>
                  </form>

                  {/* AUTO UNDERWRITING */}
                  {doc.applicationId && (
                    <form action="/api/underwriting/run" method="post">
                      <input type="hidden" name="applicationId" value={doc.applicationId} />
                      <button
                        type="submit"
                        className="px-3 py-1 rounded bg-slate-800 text-white text-xs font-semibold w-full"
                      >
                        Auto‑UW
                      </button>
                    </form>
                  )}

                  {/* INVESTOR PRICING */}
                  {doc.applicationId && (
                    <form action="/api/investor/pricing/run" method="post">
                      <input type="hidden" name="applicationId" value={doc.applicationId} />
                      <button
                        type="submit"
                        className="px-3 py-1 rounded bg-blue-600 text-white text-xs font-semibold w-full"
                      >
                        Pricing
                      </button>
                    </form>
                  )}

                  {/* DOCUMENT APPROVAL */}
                  {!approval || approval.status === "PENDING" ? (
                    <div className="flex gap-2 mt-2">
                      {/* APPROVE */}
                      <form action="/api/admin/documents/approve" method="POST">
                        <input type="hidden" name="documentId" value={doc.id} />
                        <button className="px-3 py-1 rounded bg-green-600 text-white text-xs font-semibold w-full">
                          Approve
                        </button>
                      </form>

                      {/* REJECT */}
                      <form action="/api/admin/documents/reject" method="POST">
                        <input type="hidden" name="documentId" value={doc.id} />
                        <button className="px-3 py-1 rounded bg-red-600 text-white text-xs font-semibold w-full">
                          Reject
                        </button>
                      </form>
                    </div>
                  ) : null}

                  {/* VIEW MORTGAGE */}
                  {doc.mortgageId && (
                    <Link
                      href={`/admin/mortgages/${doc.mortgageId}`}
                      className="px-3 py-1 bg-neutral-700 rounded-md text-sm hover:bg-neutral-600 transition text-center"
                    >
                      View Loan
                    </Link>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* =============================== */}
      {/* DOCUMENT ENGINE ACTIONS */}
      {/* =============================== */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold mb-4">Document Engine Actions</h2>

        <div className="flex gap-4">
          {/* Run Document Intelligence */}
          <form action="/api/admin/documents/intelligence" method="POST">
            <button className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-500 transition">
              Run Document Intelligence
            </button>
          </form>

          {/* Refresh Document Classifications */}
          <form action="/api/admin/documents/refresh" method="POST">
            <button className="px-6 py-3 bg-[#3CF46B] text-black font-semibold rounded-lg hover:bg-[#32d05f] transition">
              Refresh Classifications
            </button>
          </form>
        </div>
      </section>
    </main>
  );
}
