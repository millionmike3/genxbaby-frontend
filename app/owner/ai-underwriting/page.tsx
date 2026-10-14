
import { getPrisma } from "@/lib/db/prisma";

export const dynamic = "force-dynamic";

export default async function AIUnderwritingAssistant() {
  const prisma = await getPrisma();

  // Pull loans needing underwriting review
  const loans = await prisma.loan.findMany({
    where: { status: { in: ["IN_PROCESS", "UW_REVIEW"] } },
    include: {
      borrower: true,
      documents: true,
      behaviorSessions: true,
      fraudEvents: true,
      pricingSummary: true,
      aiUnderwritingRecommendation: true,
    },
    orderBy: { createdAt: "desc" },
    take: 100,
  });

  return (
    <main className="min-h-screen bg-slate-950 text-white p-6 space-y-16">
      <h1 className="text-5xl font-bold text-[#3CF46B]">
        AI Underwriting Assistant
      </h1>

      <p className="text-slate-300 text-sm">
        Automated underwriting intelligence combining documents, pricing, behavior, and fraud signals.
      </p>

      {/* Loan Cards */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {loans.map((loan) => (
          <LoanCard key={loan.id} loan={loan} />
        ))}
      </section>
    </main>
  );
}

function LoanCard({ loan }) {
  const borrower = loan.borrower;

  const docCompletion = calculateDocCompletion(loan.documents);
  const behaviorRisk = calculateBehaviorRisk(loan.behaviorSessions);
  const fraudRisk = calculateFraudRisk(loan.fraudEvents);
  const pricingRisk = calculatePricingRisk(loan.pricingSummary);

  const finalRecommendation = generateFinalRecommendation({
    docCompletion,
    behaviorRisk,
    fraudRisk,
    pricingRisk,
  });

  return (
    <div className="bg-neutral-900 border border-neutral-700 rounded-xl p-6 space-y-4">
      <h2 className="text-xl font-bold text-[#3CF46B]">
        Loan {loan.id}
      </h2>

      <p className="text-sm text-slate-300">
        {borrower.firstName} {borrower.lastName} • ${loan.loanAmount.toLocaleString()}
      </p>

      {/* Scores */}
      <div className="grid grid-cols-4 gap-4 pt-4">
        <Score label="Docs" value={`${docCompletion}%`} />
        <Score label="Behavior" value={behaviorRisk} />
        <Score label="Fraud" value={fraudRisk} />
        <Score label="Pricing" value={pricingRisk} />
      </div>

      {/* Recommendation */}
      <div className="pt-4 border-t border-neutral-800">
        <p className="text-lg font-semibold">{finalRecommendation.label}</p>
        <p className="text-xs text-slate-400 mt-1 whitespace-pre-line">
          {finalRecommendation.reason}
        </p>
      </div>

      {/* Conditions */}
      {finalRecommendation.conditions.length > 0 && (
        <div className="pt-4">
          <p className="text-sm font-semibold mb-2">AI‑Generated Conditions</p>
          <ul className="text-xs text-slate-300 space-y-1">
            {finalRecommendation.conditions.map((c, idx) => (
              <li key={idx}>• {c}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

function Score({ label, value }) {
  return (
    <div className="bg-slate-800 rounded-lg p-3 text-center">
      <p className="text-xs text-slate-400">{label}</p>
      <p className="text-lg font-bold">{value}</p>
    </div>
  );
}

function calculateDocCompletion(docs) {
  if (!docs || docs.length === 0) return 0;
  const completed = docs.filter((d) => d.uploadedAt).length;
  return Math.round((completed / docs.length) * 100);
}

function calculateBehaviorRisk(sessions) {
  if (!sessions || sessions.length === 0) return "Low";
  const avgStress =
    sessions.reduce((sum, s) => sum + (s.stressScore ?? 0), 0) /
    sessions.length;
  return avgStress >= 70 ? "High" : avgStress >= 40 ? "Medium" : "Low";
}

function calculateFraudRisk(events) {
  if (!events || events.length === 0) return "Low";
  const highRisk = events.filter((e) => e.riskScore >= 80).length;
  return highRisk > 0 ? "High" : "Medium";
}

function calculatePricingRisk(summary) {
  if (!summary) return "Unknown";
  const { llpaBps, overlayBps, exceptionBps } = summary;
  const total = llpaBps + overlayBps + exceptionBps;
  return total >= 200 ? "High" : total >= 100 ? "Medium" : "Low";
}

function generateFinalRecommendation({ docCompletion, behaviorRisk, fraudRisk, pricingRisk }) {
  const conditions = [];

  if (docCompletion < 100) {
    conditions.push("Upload all required documents.");
  }
  if (behaviorRisk === "High") {
    conditions.push("Borrower behavioral risk requires manual review.");
  }
  if (fraudRisk === "High") {
    conditions.push("Fraud signals detected — escalate to fraud team.");
  }
  if (pricingRisk === "High") {
    conditions.push("Pricing overlays exceed threshold — verify eligibility.");
  }

  if (fraudRisk === "High") {
    return {
      label: "DECLINE — Fraud Risk",
      reason: "High‑risk fraud signals detected. Manual review required.",
      conditions,
    };
  }

  if (docCompletion < 100 || behaviorRisk !== "Low" || pricingRisk !== "Low") {
    return {
      label: "CONDITIONAL APPROVAL",
      reason: "Loan requires additional documents or risk review.",
      conditions,
    };
  }

  return {
    label: "APPROVE",
    reason: "Loan meets all underwriting criteria.",
    conditions: [],
  };
}
