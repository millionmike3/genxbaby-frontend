
import { getPrisma } from "@/lib/db/prisma";

export const dynamic = "force-dynamic";

export default async function PostClosingQCPage() {
  const prisma = await getPrisma();

  // Assume QC admin identity resolved via session/middleware
  const qcAdminId = "CURRENT_QC_ADMIN_ID";

  const qc = await prisma.qcAdmin.findUnique({
    where: { id: qcAdminId },
    include: {
      qcLoans: {
        orderBy: { createdAt: "desc" },
        take: 200,
        include: {
          borrower: true,
          qcChecklist: true,
          qcFindings: true,
          qcDocuments: true,
          investorRules: true,
          collateralReview: true,
        },
      },
    },
  });

  const loans = qc.qcLoans;

  const totalLoans = loans.length;
  const completedQC = loans.filter((l) => l.qcStatus === "COMPLETE").length;
  const failedQC = loans.filter((l) => l.qcStatus === "FAILED").length;
  const inReview = loans.filter((l) => l.qcStatus === "IN_REVIEW").length;

  const avgDeliveryScore = Math.round(
    loans.reduce((sum, l) => sum + (l.deliveryScore ?? 0), 0) /
      (loans.length || 1)
  );

  return (
    <main className="min-h-screen bg-slate-950 text-white p-6 space-y-16">
      <h1 className="text-4xl font-bold text-[#3CF46B]">
        Post‑Closing QC Portal
      </h1>

      {/* Top summary */}
      <section className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card title="Loans in QC" value={totalLoans} />
        <Card title="QC Completed" value={completedQC} />
        <Card title="QC Failed" value={failedQC} />
        <Card title="Avg Delivery Score" value={`${avgDeliveryScore}%`} />
      </section>

      {/* Loan‑level QC table */}
      <Section title="Loan‑Level QC Review">
        {loans.length === 0 && (
          <Empty label="No loans currently in QC workflow." />
        )}

        <table className="w-full text-sm">
          <thead>
            <tr className="text-slate-400">
              <th className="text-left py-2">Loan</th>
              <th className="text-left py-2">Borrower</th>
              <th className="text-left py-2">QC Status</th>
              <th className="text-left py-2">Findings</th>
              <th className="text-left py-2">Delivery Score</th>
              <th className="text-left py-2">Investor Ready</th>
            </tr>
          </thead>
          <tbody>
            {loans.map((l) => (
              <tr key={l.id} className="border-t border-neutral-800">
                <td className="py-2">{l.loanId}</td>
                <td className="py-2">
                  {l.borrower.firstName} {l.borrower.lastName}
                </td>
                <td className="py-2">{l.qcStatus}</td>
                <td className="py-2">{l.qcFindings.length}</td>
                <td className="py-2">{l.deliveryScore}%</td>
                <td className="py-2">
                  {l.deliveryScore >= 85 ? "YES" : "NO"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Section>

      {/* QC Findings */}
      <Section title="QC Findings">
        {loans.flatMap((l) => l.qcFindings).length === 0 && (
          <Empty label="No QC findings recorded." />
        )}

        {loans.flatMap((l) =>
          l.qcFindings.map((f) => (
            <Row
              key={f.id}
              primary={`Loan ${f.loanId} — ${f.category}`}
              secondary={f.description}
              right={new Date(f.createdAt).toLocaleString()}
            />
          ))
        )}
      </Section>

      {/* QC Checklist */}
      <Section title="QC Checklist Items">
        {loans.flatMap((l) => l.qcChecklist).length === 0 && (
          <Empty label="No checklist items found." />
        )}

        {loans.flatMap((l) =>
          l.qcChecklist.map((c) => (
            <Row
              key={c.id}
              primary={`${c.item}`}
              secondary={`Loan ${c.loanId} • Status: ${c.status}`}
              right={new Date(c.updatedAt).toLocaleDateString()}
            />
          ))
        )}
      </Section>

      {/* Document QC */}
      <Section title="Document QC Review">
        {loans.flatMap((l) => l.qcDocuments).length === 0 && (
          <Empty label="No document QC issues." />
        )}

        {loans.flatMap((l) =>
          l.qcDocuments.map((d) => (
            <Row
              key={d.id}
              primary={`${d.documentName}`}
              secondary={`Loan ${d.loanId} • Issue: ${d.issue}`}
              right={new Date(d.createdAt).toLocaleDateString()}
            />
          ))
        )}
      </Section>

      {/* Investor Rule Checks */}
      <Section title="Investor Rule Checks">
        {loans.flatMap((l) => l.investorRules).length === 0 && (
          <Empty label="No investor rule violations." />
        )}

        {loans.flatMap((l) =>
          l.investorRules.map((r) => (
            <Row
              key={r.id}
              primary={`Loan ${r.loanId} — ${r.ruleName}`}
              secondary={r.description}
              right={new Date(r.createdAt).toLocaleDateString()}
            />
          ))
        )}
      </Section>

      {/* Collateral QC */}
      <Section title="Collateral QC">
        {loans.flatMap((l) => l.collateralReview).length === 0 && (
          <Empty label="No collateral QC issues." />
        )}

        {loans.flatMap((l) =>
          l.collateralReview.map((c) => (
            <Row
              key={c.id}
              primary={`Loan ${c.loanId} — ${c.status}`}
              secondary={c.notes}
              right={new Date(c.updatedAt).toLocaleDateString()}
            />
          ))
        )}
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
      <h2 className="text-2xl font-bold text-[#3CF46B]">{title}</h2>
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
        <p className="text-xs text-slate-300 ml-4 whitespace-nowrap">
          {right}
        </p>
      )}
    </div>
  );
}

function Empty({ label }) {
  return <p className="text-xs text-slate-400">{label}</p>;
}
