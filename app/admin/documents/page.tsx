"use server";

import { getPrisma } from "@/lib/prisma";

async function getDocuments() {
  const prisma = await getPrisma();

  return prisma.document.findMany({
    orderBy: { createdAt: "desc" },
    take: 200,
    include: {
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
}

export default async function AdminDocumentsPage() {
  const docs = await getDocuments();

  return (
    <main className="min-h-screen bg-slate-950 text-white p-6">
      <h1 className="text-2xl font-bold mb-4">All Documents</h1>
      <p className="text-sm text-slate-400 mb-6">
        Review borrower documents, run fraud scans, trigger underwriting actions,
        and approve or reject investor documents.
      </p>

      <table className="w-full text-sm text-slate-300">
        <thead>
          <tr className="border-b border-slate-800">
            <th className="py-2 text-left">Document</th>
            <th className="py-2 text-left">Type</th>
            <th className="py-2 text-left">Borrower</th>
            <th className="py-2 text-left">Application</th>
            <th className="py-2 text-left">Uploaded</th>
            <th className="py-2 text-left">Approval Status</th>
            <th className="py-2 text-left">Actions</th>
          </tr>
        </thead>

        <tbody>
          {docs.map((d) => {
            const approval = d.approvals?.[0]; // latest approval record

            return (
              <tr key={d.id} className="border-b border-slate-900">
                <td className="py-2">{d.id}</td>
                <td className="py-2">{d.type}</td>
                <td className="py-2">{d.application?.borrower?.fullName}</td>
                <td className="py-2">{d.applicationId}</td>
                <td className="py-2">
                  {new Date(d.createdAt).toLocaleString()}
                </td>

                {/* APPROVAL STATUS */}
                <td className="py-2">
                  {approval ? (
                    <span
                      className={
                        approval.status === "APPROVED"
                          ? "text-green-400"
                          : approval.status === "REJECTED"
                          ? "text-red-400"
                          : "text-yellow-400"
                      }
                    >
                      {approval.status}
                    </span>
                  ) : (
                    <span className="text-yellow-400">PENDING</span>
                  )}
                </td>

                {/* ACTIONS */}
                <td className="py-2">
                  <div className="flex flex-col gap-2">

                    {/* VIEW DOCUMENT */}
                    <a
                      href={d.url}
                      target="_blank"
                      className="px-3 py-1 rounded bg-slate-700 text-white text-xs font-semibold text-center"
                    >
                      View
                    </a>

                    {/* FRAUD SCAN */}
                    <form action="/api/fraud/documents/run" method="post">
                      <input type="hidden" name="documentId" value={d.id} />
                      <button
                        type="submit"
                        className="px-3 py-1 rounded bg-red-600 text-white text-xs font-semibold w-full"
                      >
                        Fraud Scan
                      </button>
                    </form>

                    {/* AUTO UNDERWRITING */}
                    {d.applicationId && (
                      <form action="/api/underwriting/run" method="post">
                        <input
                          type="hidden"
                          name="applicationId"
                          value={d.applicationId}
                        />
                        <button
                          type="submit"
                          className="px-3 py-1 rounded bg-slate-800 text-white text-xs font-semibold w-full"
                        >
                          Auto‑UW
                        </button>
                      </form>
                    )}

                    {/* INVESTOR PRICING */}
                    {d.applicationId && (
                      <form action="/api/investor/pricing/run" method="post">
                        <input
                          type="hidden"
                          name="applicationId"
                          value={d.applicationId}
                        />
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
                          <input type="hidden" name="documentId" value={d.id} />
                          <button className="px-3 py-1 rounded bg-green-600 text-white text-xs font-semibold w-full">
                            Approve
                          </button>
                        </form>

                        {/* REJECT */}
                        <form action="/api/admin/documents/reject" method="POST">
                          <input type="hidden" name="documentId" value={d.id} />
                          <button className="px-3 py-1 rounded bg-red-600 text-white text-xs font-semibold w-full">
                            Reject
                          </button>
                        </form>
                      </div>
                    ) : null}
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </main>
  );
}
