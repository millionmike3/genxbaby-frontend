
import { getPrisma } from "@/lib/db/prisma";

export const dynamic = "force-dynamic";

export default async function BorrowerLoanStatusPage() {
  const prisma = await getPrisma();

  // Borrower identity resolved via session/middleware
  const borrowerId = "CURRENT_BORROWER_ID";

  const borrower = await prisma.borrower.findUnique({
    where: { id: borrowerId },
    include: {
      loan: {
        include: {
          milestones: {
            orderBy: { order: "asc" },
          },
          conditions: true,
        },
      },
    },
  });

  const loan = borrower.loan;
  const milestones = loan.milestones || [];
  const conditions = loan.conditions || [];

  const completedMilestones = milestones.filter((m) => m.completedAt);
  const progressPercent =
    milestones.length === 0
      ? 0
      : Math.round((completedMilestones.length / milestones.length) * 100);

  const openConditions = conditions.filter((c) => c.status !== "CLEARED");
  const clearedConditions = conditions.filter((c) => c.status === "CLEARED");

  return (
    <main className="min-h-screen bg-slate-950 text-white p-6 space-y-12">
      <h1 className="text-4xl font-bold text-[#3CF46B]">
        Your Loan Status
      </h1>

      {/* Summary */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card title="Loan Amount" value={`$${loan.loanAmount.toLocaleString()}`} />
        <Card title="Current Status" value={loan.status} />
        <Card title="Rate Lock" value={loan.rateLocked ? "Locked" : "Not Locked"} />
      </section>

      {/* Overall Progress */}
      <section className="bg-neutral-900 border border-neutral-700 rounded-xl p-6">
        <h2 className="text-xl font-bold text-[#3CF46B] mb-2">
          Overall Progress
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

      {/* Milestones */}
      <Section title="Loan Milestones">
        {milestones.length === 0 && (
          <Empty label="Your loan milestones are not yet configured." />
        )}

        {milestones.map((m) => (
          <MilestoneRow
            key={m.id}
            label={m.name}
            description={m.description}
            completed={!!m.completedAt}
            completedAt={m.completedAt}
          />
        ))}
      </Section>

      {/* Conditions */}
      <Section title="Conditions">
        {conditions.length === 0 && (
          <Empty label="No conditions have been added to your loan yet." />
        )}

        {openConditions.map((c) => (
          <ConditionRow
            key={c.id}
            label={c.name}
            description={c.description}
            status={c.status}
          />
        ))}

        {clearedConditions.length > 0 && (
          <div className="mt-4 pt-3 border-t border-neutral-800">
            <p className="text-xs text-slate-400 mb-2">Cleared Conditions</p>
            {clearedConditions.map((c) => (
              <ConditionRow
                key={c.id}
                label={c.name}
                description={c.description}
                status={c.status}
              />
            ))}
          </div>
        )}
      </Section>

      {/* Timeline / Important Dates */}
      <Section title="Important Dates">
        <TimelineRow
          label="Application Submitted"
          date={loan.applicationDate}
        />
        <TimelineRow
          label="Underwriting Started"
          date={loan.underwritingStartDate}
        />
        <TimelineRow
          label="Conditional Approval"
          date={loan.conditionalApprovalDate}
        />
        <TimelineRow
          label="Clear to Close"
          date={loan.clearToCloseDate}
        />
        <TimelineRow
          label="Scheduled Closing"
          date={loan.scheduledClosingDate}
        />
      </Section>
    </main>
  );
}

function Card({ title, value }: { title: string; value: string }) {
  return (
    <div className="bg-neutral-900 border border-neutral-700 rounded-xl p-6">
      <h3 className="text-lg font-semibold text-slate-300">{title}</h3>
      <p className="text-3xl font-bold mt-2">{value}</p>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="space-y-4">
      <h2 className="text-xl font-bold text-[#3CF46B]">{title}</h2>
      <div className="bg-neutral-900 border border-neutral-700 rounded-xl p-4 space-y-2">
        {children}
      </div>
    </section>
  );
}

function Empty({ label }: { label: string }) {
  return <p className="text-xs text-slate-400">{label}</p>;
}

function MilestoneRow({
  label,
  description,
  completed,
  completedAt,
}: {
  label: string;
  description?: string | null;
  completed: boolean;
  completedAt?: Date | null;
}) {
  return (
    <div className="flex items-center justify-between py-2 border-b border-neutral-800 last:border-b-0">
      <div>
        <p className="text-sm font-semibold">{label}</p>
        {description && (
          <p className="text-xs text-slate-400 mt-1">{description}</p>
        )}
      </div>
      <div className="text-right">
        <p
          className={
            completed ? "text-xs text-[#3CF46B]" : "text-xs text-yellow-300"
          }
        >
          {completed ? "Completed" : "In Progress"}
        </p>
        {completedAt && (
          <p className="text-xs text-slate-400 mt-1">
            {new Date(completedAt).toLocaleDateString()}
          </p>
        )}
      </div>
    </div>
  );
}

function ConditionRow({
  label,
  description,
  status,
}: {
  label: string;
  description?: string | null;
  status: string;
}) {
  const color =
    status === "CLEARED"
      ? "text-[#3CF46B]"
      : status === "PENDING"
      ? "text-yellow-300"
      : "text-red-400";

  return (
    <div className="flex items-center justify-between py-2 border-b border-neutral-800 last:border-b-0">
      <div>
        <p className="text-sm font-semibold">{label}</p>
        {description && (
          <p className="text-xs text-slate-400 mt-1">{description}</p>
        )}
      </div>
      <p className={`text-xs ${color} ml-4 whitespace-nowrap`}>{status}</p>
    </div>
  );
}

function TimelineRow({
  label,
  date,
}: {
  label: string;
  date?: Date | null;
}) {
  if (!date) return null;

  return (
    <div className="flex items-center justify-between py-2 border-b border-neutral-800 last:border-b-0">
      <p className="text-sm font-semibold">{label}</p>
      <p className="text-xs text-slate-300 ml-4 whitespace-nowrap">
        {new Date(date).toLocaleDateString()}
      </p>
    </div>
  );
}
