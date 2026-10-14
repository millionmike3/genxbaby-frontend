import { getPrisma } from "@/lib/db/prisma";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function BorrowerDashboard() {
  const prisma = await getPrisma();

  // TODO: Replace with authenticated borrower userId
  const userId = 0;

  const borrower = await prisma.borrower.findFirst({
    where: { userId },
    include: {
      applications: {
        include: {
          borrowerProperty: true,
          documents: true,
          underwriting: true,
          fraudEvents: true,
          pricing: true,
          milestones: true,
          timeline: true,
          // funding-related models
          servicingEvents: true,
          ServicingRiskSignal: true,
        },
      },
    },
  });

  if (!borrower || borrower.applications.length === 0) {
    return (
      <main className="min-h-screen bg-slate-950 text-white p-6">
        <h1 className="text-xl font-semibold">No active application found</h1>
      </main>
    );
  }

  // Active loan = most recent application
  const loan = borrower.applications[0];

  return (
    <main className="min-h-screen bg-slate-950 text-white p-6 space-y-12">
      {/* HEADER */}
      <header>
        <h1 className="text-3xl font-bold text-[#3CF46B]">
          Welcome, {borrower.fullName}
        </h1>
        <p className="text-slate-400 text-sm">
          Track your loan progress, upload documents, and complete required tasks.
        </p>
      </header>

      {/* APPLICATION STATUS */}
      <section className="bg-neutral-900 border border-neutral-700 rounded-xl p-6">
        <h2 className="text-xl font-semibold mb-3">Application Status</h2>

        <p className="text-slate-300 text-sm mb-2">
          <strong>Loan ID:</strong> {loan.id}
        </p>

        <p className="text-slate-300 text-sm mb-2">
          <strong>Status:</strong> {loan.status}
        </p>

        <p className="text-slate-300 text-sm">
          <strong>Property:</strong>{" "}
          {loan.borrowerProperty?.[0]?.address ?? "No property entered yet"}
        </p>
      </section>

      {/* DOCUMENTS */}
      <section className="bg-neutral-900 border border-neutral-700 rounded-xl p-6">
        <h2 className="text-xl font-semibold mb-4">Your Documents</h2>

        <div className="space-y-3">
          {loan.documents.map((doc) => (
            <div
              key={doc.id}
              className="flex justify-between items-center border-b border-neutral-800 pb-3"
            >
              <div>
                <p className="text-slate-100">{doc.type}</p>
                <p className="text-slate-500 text-xs">
                  {doc.complianceScore?.score ?? "Pending"}
                </p>
              </div>

              <a
                href={doc.url}
                target="_blank"
                className="px-3 py-1 bg-neutral-700 rounded-md text-sm hover:bg-neutral-600 transition"
              >
                View
              </a>
            </div>
          ))}
        </div>

        <Link
          href="/borrower/upload"
          className="inline-block mt-4 px-4 py-2 bg-[#3CF46B] text-black rounded-md font-semibold hover:bg-[#32d05f]"
        >
          Upload Documents
        </Link>
      </section>

      {/* CONDITIONS */}
      <section className="bg-neutral-900 border border-neutral-700 rounded-xl p-6">
        <h2 className="text-xl font-semibold mb-4">Conditions</h2>

        {loan.milestones.length === 0 ? (
          <p className="text-slate-400 text-sm">No conditions at this time.</p>
        ) : (
          <div className="space-y-3">
            {loan.milestones.map((m) => (
              <div
                key={m.id}
                className="border-b border-neutral-800 pb-3 text-sm"
              >
                <p className="text-slate-100">{m.milestone}</p>
                <p className="text-slate-500">
                  {m.timestamp?.toLocaleString() ?? ""}
                </p>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* PRICING PREVIEW */}
      <section className="bg-neutral-900 border border-neutral-700 rounded-xl p-6">
        <h2 className="text-xl font-semibold mb-4">Pricing Preview</h2>

        <p className="text-slate-300 text-sm">
          <strong>Rate:</strong> {loan.pricing?.noteRate ?? "—"}%
        </p>

        <p className="text-slate-300 text-sm">
          <strong>Loan Amount:</strong>{" "}
          ${loan.loanAmount?.toLocaleString() ?? "—"}
        </p>

        <Link
          href="/borrower/pricing"
          className="inline-block mt-4 px-4 py-2 bg-neutral-700 rounded-md text-sm hover:bg-neutral-600 transition"
        >
          View Full Pricing
        </Link>
      </section>

      {/* FUNDING STATUS */}
      <section className="bg-neutral-900 border border-neutral-700 rounded-xl p-6">
        <h2 className="text-xl font-semibold mb-4">Funding Status</h2>

        <p className="text-slate-300 text-sm">
          <strong>CTC:</strong>{" "}
          {loan.servicingEvents?.[0]?.createdAt
            ? new Date(loan.servicingEvents[0].createdAt).toLocaleString()
            : "Not yet"}
        </p>

        <p className="text-slate-300 text-sm">
          <strong>Funded:</strong>{" "}
          {loan.ServicingRiskSignal?.createdAt
            ? new Date(loan.ServicingRiskSignal.createdAt).toLocaleString()
            : "Not yet"}
        </p>
      </section>
    </main>
  );
}
