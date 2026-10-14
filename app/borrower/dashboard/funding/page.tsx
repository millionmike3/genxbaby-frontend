import { getPrisma } from "@/lib/db/prisma";
import Link from "next/link";

function statusColor(status: string) {
  switch (status) {
    case "READY_FOR_CTC":
    case "CTC":
      return "text-[#3CF46B] font-semibold";
    case "FUNDED":
      return "text-blue-400 font-semibold";
    case "PENDING":
      return "text-yellow-400 font-semibold";
    default:
      return "text-slate-300";
  }
}

export default async function BorrowerFundingPage() {
  const prisma = await getPrisma();

  // TODO: Replace with authenticated borrower userId
  const userId = 0;

  const borrower = await prisma.borrower.findFirst({
    where: { userId },
    include: {
      applications: {
        include: {
          borrowerProperty: true,
          PricingResult: true,
          underwriting: true,
          servicingEvents: true,
          ServicingRiskSignal: true,
          milestones: true,
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

  const loan = borrower.applications[0];
  const property = loan.borrowerProperty?.[0];
  const servicing = loan.servicingEvents?.[0];
  const riskSignal = loan.ServicingRiskSignal;

  return (
    <main className="min-h-screen bg-slate-950 text-white p-6 space-y-12">
      {/* HEADER */}
      <header>
        <h1 className="text-3xl font-bold text-[#3CF46B] mb-2">
          Funding & Closing
        </h1>
        <p className="text-sm text-slate-400">
          Review your closing status, wire instructions, and final steps before funding.
        </p>
      </header>

      {/* FUNDING STATUS */}
      <section className="bg-neutral-900 border border-neutral-700 rounded-xl p-6 space-y-3">
        <h2 className="text-xl font-semibold mb-3">Funding Status</h2>

        <p className="text-slate-300 text-sm">
          <strong>Status:</strong>{" "}
          <span className={statusColor(loan.status)}>{loan.status}</span>
        </p>

        <p className="text-slate-300 text-sm">
          <strong>Clear‑to‑Close:</strong>{" "}
          {servicing?.createdAt
            ? new Date(servicing.createdAt).toLocaleString()
            : "Not yet"}
        </p>

        <p className="text-slate-300 text-sm">
          <strong>Funded:</strong>{" "}
          {riskSignal?.createdAt
            ? new Date(riskSignal.createdAt).toLocaleString()
            : "Not yet"}
        </p>
      </section>

      {/* CLOSING CHECKLIST */}
      <section className="bg-neutral-900 border border-neutral-700 rounded-xl p-6 space-y-4">
        <h2 className="text-xl font-semibold mb-3">Closing Checklist</h2>

        <ul className="space-y-2 text-sm text-slate-300">
          <li>• All underwriting conditions cleared</li>
          <li>• Final loan documents prepared</li>
          <li>• Closing appointment scheduled</li>
          <li>• Wire instructions provided</li>
          <li>• ID and closing funds ready</li>
        </ul>

        <p className="text-slate-400 text-xs mt-2">
          Your processor or closing agent will confirm your appointment details.
        </p>
      </section>

      {/* WIRE INSTRUCTIONS */}
      <section className="bg-neutral-900 border border-neutral-700 rounded-xl p-6 space-y-4">
        <h2 className="text-xl font-semibold mb-3">Wire Instructions</h2>

        <p className="text-slate-400 text-sm">
          Wire instructions will be provided once your loan reaches Clear‑to‑Close.
        </p>
      </section>

      {/* FINAL NOTES */}
      <section className="bg-neutral-900 border border-neutral-700 rounded-xl p-6 space-y-4">
        <h2 className="text-xl font-semibold mb-3">Final Notes</h2>

        <p className="text-slate-300 text-sm">
          A closing agent will reach out to you with your appointment time and location.
        </p>

        <p className="text-slate-300 text-sm">
          Please bring a valid government‑issued ID and any required closing funds.
        </p>

        <p className="text-slate-400 text-xs">
          If you have questions, your loan officer or processor is available to help.
        </p>
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
