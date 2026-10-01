import { getPrisma } from "@/lib/prisma";
import UnderwritingActions from "./UnderwritingActions";

export default async function OwnerApplicationReview({
  params,
}: {
  params: { applicationId: string };
}) {
  const prisma = getPrisma();
  const applicationId = params.applicationId;

  const app = await prisma.application.findUnique({
    where: { id: applicationId },
    include: {
      borrower: true,
      borrowerProfiles: true,
      borrowerEmployment: true,
      borrowerIncome: true,
      borrowerAssets: true,
      borrowerLiabilities: true,
      borrowerProperty: true,
      borrowerDeclarations: true,
      borrowerDemographics: true,
      timelineEvents: true,
      documents: true,
      disclosures: true,
      underwriting: true,
      fraudEvents: true,
      scoringPipelines: true,
      scoring: true, // enhanced scoring block
      declarations: true,
      liabilities: true,
      
    },
  });

  if (!app) {
    return <div className="text-red-400 p-6">Application not found.</div>;
  }

  const section = (title: string, content: JSX.Element) => (
    <div className="border border-slate-700 rounded-lg p-6 bg-slate-800 mb-6">
      <h2 className="text-lg font-semibold text-slate-100 mb-4">{title}</h2>
      {content}
    </div>
  );

  return (
    <div className="max-w-5xl mx-auto px-4 py-10 space-y-10">
      <h1 className="text-2xl font-bold text-slate-100 mb-6">
        Underwriting Review — {app.borrower?.fullName ?? "Borrower"}
      </h1>

      {/* Borrower Profile */}
      {section(
        "Borrower Profile",
        <div className="text-slate-300 space-y-1">
          {app.borrowerProfiles?.map((p) => (
            <div key={p.id}>
              <p>{p.firstName} {p.lastName}</p>
              <p>DOB: {p.dob?.toLocaleDateString()}</p>
              <p>Phone: {p.phone}</p>
              <p>Email: {p.email}</p>
              <p>Address: {p.address}, {p.city}, {p.state} {p.zip}</p>
            </div>
          ))}
        </div>
      )}

      {/* Employment */}
      {section(
        "Employment",
        <div className="text-slate-300 space-y-1">
          {app.borrowerEmployment?.map((e) => (
            <div key={e.id}>
              <p>Employer: {e.employerName}</p>
              <p>Job Title: {e.jobTitle}</p>
              <p>Type: {e.employmentType}</p>
              <p>Start Date: {e.startDate?.toLocaleDateString()}</p>
            </div>
          ))}
        </div>
      )}

      {/* Income */}
      {section(
        "Income",
        <div className="text-slate-300 space-y-1">
          {app.borrowerIncome?.map((i) => (
            <p key={i.id}>Total Monthly Income: ${i.totalIncomeMonthly}</p>
          ))}
        </div>
      )}

      {/* Assets */}
      {section(
        "Assets",
        <div className="text-slate-300 space-y-1">
          {app.borrowerAssets?.map((a) => (
            <p key={a.id}>Total Assets: ${a.totalAssets}</p>
          ))}
        </div>
      )}

      {/* Liabilities */}
      {section(
        "Liabilities",
        <div className="text-slate-300 space-y-1">
          {app.borrowerLiabilities?.map((l) => (
            <p key={l.id}>Total Monthly Debt: ${l.totalMonthlyDebt}</p>
          ))}
        </div>
      )}

      {/* Property */}
      {section(
        "Subject Property",
        <div className="text-slate-300 space-y-1">
          {app.borrowerProperty?.map((p) => (
            <div key={p.id}>
              <p>{p.propertyAddress}, {p.propertyCity}, {p.propertyState} {p.propertyZip}</p>
              <p>Purchase Price: ${p.purchasePrice}</p>
              <p>Loan Amount: ${p.loanAmount}</p>
            </div>
          ))}
        </div>
      )}

      {/* Loan Details (Enhanced) */}
   {app.borrowerProperty?.length > 0 &&
  section(
    "Loan Details",
    <div className="text-slate-300 space-y-1">
      <p>Purchase Price: ${app.borrowerProperty[0].purchasePrice}</p>
      <p>Estimated Value: ${app.borrowerProperty[0].estimatedValue}</p>
      <p>Loan Amount: ${app.borrowerProperty[0].loanAmount}</p>
      <p>Down Payment: ${app.borrowerProperty[0].downPayment}</p>
      <p>Source: {app.borrowerProperty[0].downPaymentSource}</p>
    </div>
  )
}
      {/* Declarations */}
      {section(
        "Declarations",
        <div className="text-slate-300 space-y-1">
          {app.borrowerDeclarations?.map((d) => (
            <div key={d.id}>
              <p>Bankruptcy: {String(d.bankruptcy)}</p>
              <p>Foreclosure: {String(d.foreclosure)}</p>
              <p>Federal Debt: {String(d.delinquentFederalDebt)}</p>
            </div>
          ))}
        </div>
      )}

      {/* Demographics */}
      {section(
        "Demographics (HMDA)",
        <div className="text-slate-300 space-y-1">
          {app.borrowerDemographics?.map((dm) => (
            <div key={dm.id}>
              <p>Ethnicity: {dm.ethnicity}</p>
              <p>Race: {dm.race}</p>
              <p>Sex: {dm.sex}</p>
            </div>
          ))}
        </div>
      )}

      {/* Timeline */}
      {section(
        "Timeline",
        <div className="text-slate-300 space-y-1">
          {app.timelineEvents?.map((t) => (
            <p key={t.id}>{t.eventType} — {t.createdAt.toLocaleString()}</p>
          ))}
        </div>
      )}

      {/* Documents */}
      {section(
        "Documents",
        <div className="text-slate-300 space-y-1">
          {app.documents?.map((d) => (
            <p key={d.id}>{d.name} — {d.status}</p>
          ))}
        </div>
      )}

      {/* Disclosures */}
      {section(
        "Disclosures",
        <div className="text-slate-300 space-y-1">
          {app.disclosures?.map((ds) => (
            <p key={ds.id}>{ds.type} — {ds.status}</p>
          ))}
        </div>
      )}

      {/* Underwriting Status */}
      {section(
        "Underwriting",
        <div className="text-slate-300 space-y-1">
          {app.underwriting ? (
            <p>Underwriting Status: {app.underwriting.status}</p>
          ) : (
            <p>No underwriting started.</p>
          )}
        </div>
      )}

      {/* Fraud Signals */}
      {section(
        "Fraud Signals",
        <div className="text-slate-300 space-y-1">
          {app.fraudEvents?.map((f) => (
            <p key={f.id}>{f.eventType} — {f.score}</p>
          ))}
        </div>
      )}

      {/* AI Scoring Pipelines */}
      {section(
        "AI Scoring Pipelines",
        <div className="text-slate-300 space-y-1">
          {app.scoringPipelines?.map((s) => (
            <p key={s.id}>{s.pipelineName} — {s.score}</p>
          ))}
        </div>
      )}

      {/* Enhanced Scoring */}
      {section(
        "Scoring",
        <div className="grid grid-cols-3 gap-4 text-slate-300">
          <div>Fraud Score: {app.scoring?.fraudScore ?? "—"}</div>
          <div>Risk Score: {app.scoring?.riskScore ?? "—"}</div>
          <div>Impulsiveness: {app.scoring?.impulsivenessScore ?? "—"}</div>
        </div>
      )}

      {/* Underwriting Actions */}
      <div className="flex justify-end mt-10">
        <UnderwritingActions applicationId={applicationId} />
      </div>
    </div>
  );
}
