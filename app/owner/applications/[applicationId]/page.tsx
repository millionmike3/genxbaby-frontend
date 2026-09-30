import { getPrisma } from "@/lib/prisma";
import OwnerActions from "./OwnerActions";
import Link from "next/link";


export default async function OwnerApplicationReview({ params }: { params: { applicationId: string } }) {
  const prisma = getPrisma();
  const applicationId = params.applicationId;

  const application = await prisma.application.findUnique({
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
    },
  });

  if (!application) {
    return <div className="text-red-400">Application not found.</div>;
  }

  const section = (title: string, content: JSX.Element) => (
    <div className="border border-slate-700 rounded-lg p-6 bg-slate-800 mb-6">
      <h2 className="text-lg font-semibold text-slate-100 mb-4">{title}</h2>
      {content}
    </div>
  );

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold text-slate-100 mb-6">
        Loan File Review — {application.borrower?.fullName}
      </h1>

      {section("Borrower Profile", (
        <div className="text-slate-300 space-y-1">
          {application.borrowerProfiles?.map((p) => (
            <div key={p.id}>
              <p>{p.firstName} {p.lastName}</p>
              <p>DOB: {p.dob?.toLocaleDateString()}</p>
              <p>Phone: {p.phone}</p>
              <p>Email: {p.email}</p>
              <p>Address: {p.address}, {p.city}, {p.state} {p.zip}</p>
            </div>
          ))}
        </div>
      ))}

      {section("Employment", (
        <div className="text-slate-300 space-y-1">
          {application.borrowerEmployment?.map((e) => (
            <div key={e.id}>
              <p>Employer: {e.employerName}</p>
              <p>Job Title: {e.jobTitle}</p>
              <p>Type: {e.employmentType}</p>
              <p>Start Date: {e.startDate?.toLocaleDateString()}</p>
            </div>
          ))}
        </div>
      ))}

      {section("Income", (
        <div className="text-slate-300 space-y-1">
          {application.borrowerIncome?.map((i) => (
            <p key={i.id}>Total Monthly Income: ${i.totalIncomeMonthly}</p>
          ))}
        </div>
      ))}

      {section("Assets", (
        <div className="text-slate-300 space-y-1">
          {application.borrowerAssets?.map((a) => (
            <p key={a.id}>Total Assets: ${a.totalAssets}</p>
          ))}
        </div>
      ))}

      {section("Liabilities", (
        <div className="text-slate-300 space-y-1">
          {application.borrowerLiabilities?.map((l) => (
            <p key={l.id}>Total Monthly Debt: ${l.totalMonthlyDebt}</p>
          ))}
        </div>
      ))}

      {section("Property", (
        <div className="text-slate-300 space-y-1">
          {application.borrowerProperty?.map((p) => (
            <div key={p.id}>
              <p>{p.propertyAddress}, {p.propertyCity}, {p.propertyState} {p.propertyZip}</p>
              <p>Purchase Price: ${p.purchasePrice}</p>
              <p>Loan Amount: ${p.loanAmount}</p>
            </div>
          ))}
        </div>
      ))}

      {section("Declarations", (
        <div className="text-slate-300 space-y-1">
          {application.borrowerDeclarations?.map((d) => (
            <div key={d.id}>
              <p>Bankruptcy: {String(d.bankruptcy)}</p>
              <p>Foreclosure: {String(d.foreclosure)}</p>
              <p>Federal Debt: {String(d.delinquentFederalDebt)}</p>
            </div>
          ))}
        </div>
      ))}

      {section("Demographics (HMDA)", (
        <div className="text-slate-300 space-y-1">
          {application.borrowerDemographics?.map((dm) => (
            <div key={dm.id}>
              <p>Ethnicity: {dm.ethnicity}</p>
              <p>Race: {dm.race}</p>
              <p>Sex: {dm.sex}</p>
            </div>
          ))}
        </div>
      ))}

      {section("Timeline", (
        <div className="text-slate-300 space-y-1">
          {application.timelineEvents?.map((t) => (
            <p key={t.id}>{t.eventType} — {t.createdAt.toLocaleString()}</p>
          ))}
        </div>
      ))}

      {section("Documents", (
        <div className="text-slate-300 space-y-1">
          {application.documents?.map((d) => (
            <p key={d.id}>{d.name} — {d.status}</p>
          ))}
        </div>
      ))}

      {section("Disclosures", (
        <div className="text-slate-300 space-y-1">
          {application.disclosures?.map((ds) => (
            <p key={ds.id}>{ds.type} — {ds.status}</p>
          ))}
        </div>
      ))}

      {section("Underwriting", (
        <div className="text-slate-300 space-y-1">
          {application.underwriting ? (
            <p>Underwriting Status: {application.underwriting.status}</p>
          ) : <p>No underwriting started.</p>}
        </div>
      ))}

      {section("Fraud Signals", (
        <div className="text-slate-300 space-y-1">
          {application.fraudEvents?.map((f) => (
            <p key={f.id}>{f.eventType} — {f.score}</p>
          ))}
        </div>
      ))}

      {section("AI Scoring Pipelines", (
        <div className="text-slate-300 space-y-1">
          {application.scoringPipelines?.map((s) => (
            <p key={s.id}>{s.pipelineName} — {s.score}</p>
          ))}
        </div>
      ))}

      <div className="flex justify-end mt-10">
  <OwnerActions applicationId={applicationId} />
</div>

    </div>
  );
}
