
import { getPrisma } from "@/lib/db/prisma";

export const dynamic = "force-dynamic";

export default async function BorrowerHomePage() {
  const prisma = await getPrisma();

  // Assume borrower identity resolved via session/middleware
  const borrowerId = "CURRENT_BORROWER_ID";

  const borrower = await prisma.borrower.findUnique({
    where: { id: borrowerId },
    include: {
      loan: true,
      requiredDocuments: true,
      messages: { orderBy: { createdAt: "desc" }, take: 5 },
    },
  });

  const loan = borrower.loan;

  const completedDocs = borrower.requiredDocuments.filter((d) => d.uploadedAt);
  const pendingDocs = borrower.requiredDocuments.filter((d) => !d.uploadedAt);

  const progressPercent =
    borrower.requiredDocuments.length === 0
      ? 0
      : Math.round(
          (completedDocs.length / borrower.requiredDocuments.length) * 100
        );

  const retentionMessage = getRetentionMessage(loan, borrower);

  return (
    <main className="min-h-screen bg-slate-950 text-white p-6 space-y-12">
      <h1 className="text-4xl font-bold text-[#3CF46B]">
        Welcome Back, {borrower.firstName}
      </h1>

      {/* Loan Summary */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card title="Loan Amount" value={`$${loan.loanAmount.toLocaleString()}`} />
        <Card title="Current Rate" value={`${loan.currentRate.toFixed(3)}%`} />
        <Card title="Loan Status" value={loan.status} />
      </section>

      {/* Progress */}
      <section className="bg-neutral-900 border border-neutral-700 rounded-xl p-6">
        <h2 className="text-2xl font-bold text-[#3CF46B] mb-4">
          Your Progress
        </h2>
        <p className="text-sm text-slate-300 mb-2">
          {progressPercent}% complete
        </p>
        <div className="w-full bg-slate-800 rounded-full h-3">
          <div
            className="bg-[#3CF46B] h-3 rounded-full"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </section>

      {/* Required Documents */}
      <Section title="Required Documents">
        {pendingDocs.length === 0 && (
          <Empty label="All documents uploaded. Great job!" />
        )}
        {pendingDocs.map((doc) => (
          <Row
            key={doc.id}
            primary={doc.name}
            secondary="Required"
            right="Upload"
          />
        ))}
      </Section>

      {/* Pricing Summary */}
      <Section title="Pricing Summary">
        <Row primary="Base Rate" right={`${loan.baseRate.toFixed(3)}%`} />
        <Row primary="LLPA" right={`${loan.llpaBps} bps`} />
        <Row primary="Overlays" right={`${loan.overlayBps} bps`} />
        <Row primary="Margins" right={`${loan.marginBps} bps`} />
        <Row primary="Delivery" right={`${loan.deliveryBps} bps`} />
        <Row primary="Exceptions" right={`${loan.exceptionBps} bps`} />

        <div className="pt-4 border-t border-neutral-800">
          <Row
            primary="Final Rate"
            right={`${loan.finalRate.toFixed(3)}%`}
          />
        </div>
      </Section>

      {/* Rate Lock */}
      <Section title="Rate Lock">
        {loan.rateLocked ? (
          <Row
            primary="Rate Locked"
            secondary={`Locked at ${loan.finalRate.toFixed(3)}%`}
            right={`Expires ${new Date(loan.lockExpiresAt).toLocaleDateString()}`}
          />
        ) : (
          <Empty label="Your rate is not locked yet." />
        )}
      </Section>

      {/* Messages */}
      <Section title="Messages From Your Loan Officer">
        {borrower.messages.length === 0 && (
          <Empty label="No messages yet." />
        )}
        {borrower.messages.map((m) => (
          <Row
            key={m.id}
            primary={m.subject}
            secondary={m.body}
            right={new Date(m.createdAt).toLocaleDateString()}
          />
        ))}
      </Section>

      {/* Retention Message */}
      <Section title="Important Information">
        <div className="bg-neutral-900 border border-neutral-700 rounded-xl p-6 text-slate-300 text-sm whitespace-pre-line">
          {retentionMessage}
        </div>
      </Section>
    </main>
  );
}

function Card({ title, value }) {
  return (
    <div className="bg-neutral-900 border border-neutral-700 rounded-xl p-6">
      <h3 className="text-lg font-semibold text-slate-300">{title}</h3>
      <p className="text-3xl font-bold mt-2">{value}</p>
    </div>
  );
}

function Section({ title, children }) {
  return (
    <section className="space-y-4">
      <h2 className="text-xl font-bold text-[#3CF46B]">{title}</h2>
      <div className="bg-neutral-900 border border-neutral-700 rounded-xl p-4 space-y-2">
        {children}
      </div>
    </section>
  );
}

function Row({ primary, secondary, right }) {
  return (
    <div className="flex items-center justify-between py-2 border-b border-neutral-800 last:border-b-0">
      <div>
        <p className="text-sm font-semibold">{primary}</p>
        {secondary && (
          <p className="text-xs text-slate-400 mt-1">{secondary}</p>
        )}
      </div>
      {right && (
        <p className="text-xs text-slate-300 ml-4 whitespace-nowrap">{right}</p>
      )}
    </div>
  );
}

function Empty({ label }) {
  return <p className="text-xs text-slate-400">{label}</p>;
}

function getRetentionMessage(loan, borrower) {
  if (loan.status === "IN_PROCESS") {
    return `You're doing great, ${borrower.firstName}! Your loan is currently being reviewed. Uploading any remaining documents will help us finalize your approval faster.`;
  }

  if (loan.status === "APPROVED") {
    return `Congratulations, ${borrower.firstName}! Your loan has been approved. Your Loan Officer will reach out shortly with next steps.`;
  }

  if (loan.status === "LOCKED") {
    return `Your rate is locked at ${loan.finalRate.toFixed(3)}%. Make sure to complete any remaining tasks before your lock expires.`;
  }

  return `If you have any questions, your Loan Officer is here to help.`;
}
