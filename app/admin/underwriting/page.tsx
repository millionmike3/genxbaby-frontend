
import { requireRole } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import Link from "next/link";

export const dynamic = "force-dynamic";

// Formatting helpers
function formatCurrency(value: number | null | undefined) {
  if (value == null) return "-";
  return `$${value.toLocaleString()}`;
}

function formatPercent(value: number | null | undefined) {
  if (value == null) return "-";
  return `${value.toFixed(1)}%`;
}

function decisionColor(decision: string) {
  switch (decision) {
    case "APPROVED":
      return "text-[#3CF46B]";
    case "DECLINED":
    case "DECLINED_FRAUD":
      return "text-red-500";
    case "REVIEW":
      return "text-yellow-400";
    default:
      return "text-slate-300";
  }
}

// Mortgage LOS underwriting decision logic
function computeUWDecision(loan: any) {
  if (!loan.underwriting) return "REVIEW";

  const { dti, ltv, riskTier, decision } = loan.underwriting;

  if (loan.fraud?.riskScore >= 180) return "DECLINED_FRAUD";
  if (decision === "APPROVED") return "APPROVED";
  if (decision === "DECLINED") return "DECLINED";

  if (riskTier === "A" && dti < 40 && ltv < 80) return "APPROVED";
  if (riskTier === "D" || dti > 50 || ltv > 95) return "DECLINED";

  return "REVIEW";
}

export default async function AdminUnderwritingQueuePage() {
  await requireRole(["admin"]);

  // Fetch mortgages needing underwriting
  const loans = await prisma.Application.findMany({
  where: {
    OR: [
      { status: "PRICED" },
      { status: "FRAUD_REVIEW" },
      { status: "UW_REVIEW" },
      { status: "UW_PENDING" },
    ],
  },
  orderBy: { createdAt: "desc" },
  include: {
    borrower: true,
    underwriting: true,
    PricingResult: true,
    FraudResult: true,
    borrowerProperty: true,
    BorrowerDocument: true,
    timelineEvents: true,
    timeline: true,
    documents: true,
    disclosures: true,
    fraudEvents: true,
    milestones: true,
    },
  });

  return (
    <main className="min-h-screen bg-black text-white p-6 pt-20">
      <h1 className="text-3xl font-bold mb-4 text-[#3CF46B]">
        Underwriting Queue
      </h1>

      <p className="text-sm text-slate-400 mb-6">
        All mortgage files requiring underwriting review.
      </p>

      <div className="bg-neutral-900 border border-neutral-700 rounded-xl overflow-hidden">
        {/* Header */}
        <div className="grid grid-cols-6 gap-3 px-4 py-3 text-xs font-semibold text-slate-300 border-b border-neutral-700">
          <span>Borrower</span>
          <span>Loan</span>
          <span>DTI / LTV</span>
          <span>Risk / Fraud</span>
          <span>Status</span>
          <span>Action</span>
        </div>

        {loans.length === 0 && (
          <div className="px-4 py-4 text-sm text-slate-400">
            No loans awaiting underwriting.
          </div>
        )}

        {loans.map((loan) => {
          const uwDecision = computeUWDecision(loan);

          return (
            <div
              key={loan.id}
              className="grid grid-cols-6 gap-3 px-4 py-3 text-xs border-b border-neutral-800 hover:bg-neutral-800/60 transition"
            >
              {/* Borrower */}
              <div className="flex flex-col">
                <span className="text-slate-100">{loan.borrower.fullName}</span>
                <span className="text-slate-500">{loan.borrower.email}</span>
              </div>

              {/* Loan */}
              <div className="flex flex-col">
                <span className="text-slate-100">
                  {formatCurrency(loan.loanAmount)}
                </span>
                <span className="text-slate-500">
                  {loan.property.address}
                </span>
              </div>

              {/* DTI / LTV */}
              <div className="flex flex-col">
                <span className="text-slate-100">
                  {formatPercent(loan.underwriting?.dti)}
                </span>
                <span className="text-slate-500">
                  LTV: {formatPercent(loan.underwriting?.ltv)}
                </span>
              </div>

              {/* Risk / Fraud */}
              <div className="flex flex-col">
                <span className="text-slate-100">
                  {loan.fraud
                    ? `${loan.fraud.riskScore} / ${loan.fraud.flags.length} flags`
                    : "—"}
                </span>
                <span className="text-slate-500">
                  Tier: {loan.underwriting?.riskTier ?? "—"}
                </span>
              </div>

              {/* Status */}
              <div className="flex flex-col">
                <span className="text-slate-100">{loan.status}</span>
                <span className={`font-semibold ${decisionColor(uwDecision)}`}>
                  {uwDecision}
                </span>
              </div>

              {/* Action */}
              <div className="flex items-center">
                <Link
                  href={`/admin/mortgages/${loan.id}`}
                  className="inline-flex items-center justify-center bg-[#3CF46B] text-black font-semibold px-3 py-1 rounded-md hover:bg-[#32d05f] transition"
                >
                  Review
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </main>
  );
}
