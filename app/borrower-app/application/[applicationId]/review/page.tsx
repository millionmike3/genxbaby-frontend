import { getPrisma } from "@/lib/prisma";
import Link from "next/link";

export default async function ReviewPage({ params }: { params: { applicationId: string } }) {
  const prisma = getPrisma();
  const applicationId = params.applicationId;

  const application = await prisma.application.findUnique({
    where: { id: applicationId },
    select: {
      borrowerId: true,
      status: true,
    },
  });

  if (!application || !application.borrowerId) {
    return <div className="text-red-400">Application not found.</div>;
  }

  const borrowerId = application.borrowerId;

  // Load all 1003 sections
  const [
    personal,
    employment,
    income,
    assets,
    liabilities,
    property,
    declarations,
    demographics,
  ] = await Promise.all([
    prisma.borrowerProfile.findUnique({ where: { id: `${applicationId}-${borrowerId}` } }),
    prisma.borrowerEmployment.findUnique({ where: { id: `${applicationId}-${borrowerId}` } }),
    prisma.borrowerIncome.findUnique({ where: { id: `${applicationId}-${borrowerId}` } }),
    prisma.borrowerAssets.findUnique({ where: { id: `${applicationId}-${borrowerId}` } }),
    prisma.borrowerLiabilities.findUnique({ where: { id: `${applicationId}-${borrowerId}` } }),
    prisma.borrowerProperty.findUnique({ where: { id: `${applicationId}-${borrowerId}` } }),
    prisma.borrowerDeclarations.findUnique({ where: { id: `${applicationId}-${borrowerId}` } }),
    prisma.borrowerDemographics.findUnique({ where: { id: `${applicationId}-${borrowerId}` } }),
  ]);

  const section = (title: string, href: string, content: JSX.Element) => (
    <div className="border border-slate-700 rounded-lg p-6 bg-slate-800 mb-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-slate-100">{title}</h2>

        {application.status === "returned" ? (
          <Link
            href={href}
            className="text-yellow-400 hover:text-yellow-300 text-sm font-medium"
          >
            Fix Section
          </Link>
        ) : (
          <Link
            href={href}
            className="text-[#4EE38A] hover:text-[#3bc978] text-sm font-medium"
          >
            Edit
          </Link>
        )}
      </div>

      {content}
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">

      {/* Returned Banner */}
      {application.status === "returned" && (
        <div className="bg-yellow-400 text-black px-4 py-3 rounded-md mb-6">
          <p className="font-semibold">Updates Required</p>
          <p className="text-sm">
            Your lender has requested changes. Please review your information and make corrections.
          </p>
        </div>
      )}

      <h1 className="text-2xl font-bold text-slate-100 mb-6">
        Review Your Application
      </h1>

      {/* PERSONAL */}
      {section(
        "Personal Information",
        `/borrower-app/application/${applicationId}/personal`,
        personal ? (
          <div className="text-slate-300 space-y-1">
            <p>{personal.firstName} {personal.middleInitial} {personal.lastName} {personal.suffix}</p>
            <p>DOB: {personal.dob?.toLocaleDateString()}</p>
            <p>Phone: {personal.phone}</p>
            <p>Email: {personal.email}</p>
            <p>Address: {personal.address}, {personal.city}, {personal.state} {personal.zip}</p>
          </div>
        ) : <p className="text-slate-500">No data entered.</p>
      )}

      {/* EMPLOYMENT */}
      {section(
        "Employment",
        `/borrower-app/application/${applicationId}/employment`,
        employment ? (
          <div className="text-slate-300 space-y-1">
            <p>Employer: {employment.employerName}</p>
            <p>Job Title: {employment.jobTitle}</p>
            <p>Employment Type: {employment.employmentType}</p>
            <p>Start Date: {employment.startDate?.toLocaleDateString()}</p>
            <p>Years in Profession: {employment.yearsInProfession}</p>
          </div>
        ) : <p className="text-slate-500">No data entered.</p>
      )}

      {/* INCOME */}
      {section(
        "Income",
        `/borrower-app/application/${applicationId}/income`,
        income ? (
          <div className="text-slate-300 space-y-1">
            <p>Total Monthly Income: ${income.totalIncomeMonthly}</p>
          </div>
        ) : <p className="text-slate-500">No data entered.</p>
      )}

      {/* ASSETS */}
      {section(
        "Assets",
        `/borrower-app/application/${applicationId}/assets`,
        assets ? (
          <div className="text-slate-300 space-y-1">
            <p>Total Assets: ${assets.totalAssets}</p>
          </div>
        ) : <p className="text-slate-500">No data entered.</p>
      )}

      {/* LIABILITIES */}
      {section(
        "Liabilities",
        `/borrower-app/application/${applicationId}/liabilities`,
        liabilities ? (
          <div className="text-slate-300 space-y-1">
            <p>Total Monthly Debt: ${liabilities.totalMonthlyDebt}</p>
          </div>
        ) : <p className="text-slate-500">No data entered.</p>
      )}

      {/* PROPERTY */}
      {section(
        "Subject Property",
        `/borrower-app/application/${applicationId}/property`,
        property ? (
          <div className="text-slate-300 space-y-1">
            <p>{property.propertyAddress}, {property.propertyCity}, {property.propertyState} {property.propertyZip}</p>
            <p>Purchase Price: ${property.purchasePrice}</p>
            <p>Estimated Value: ${property.estimatedValue}</p>
            <p>Loan Amount: ${property.loanAmount}</p>
          </div>
        ) : <p className="text-slate-500">No data entered.</p>
      )}

      {/* DECLARATIONS */}
      {section(
        "Declarations",
        `/borrower-app/application/${applicationId}/declarations`,
        declarations ? (
          <div className="text-slate-300 space-y-1">
            <p>Bankruptcy: {String(declarations.bankruptcy)}</p>
            <p>Foreclosure: {String(declarations.foreclosure)}</p>
            <p>Judgments: {String(declarations.judgments)}</p>
            <p>Federal Debt: {String(declarations.delinquentFederalDebt)}</p>
            <p>Military Service: {String(declarations.militaryService)}</p>
          </div>
        ) : <p className="text-slate-500">No data entered.</p>
      )}

      {/* DEMOGRAPHICS */}
      {section(
        "Demographics",
        `/borrower-app/application/${applicationId}/demographics`,
        demographics ? (
          <div className="text-slate-300 space-y-1">
            <p>Ethnicity: {demographics.ethnicity || "N/A"}</p>
            <p>Race: {demographics.race || "N/A"}</p>
            <p>Sex: {demographics.sex || "N/A"}</p>
            <p>Collection Method: {demographics.collectionMethod || "N/A"}</p>
          </div>
        ) : <p className="text-slate-500">No data entered.</p>
      )}

      {/* Continue */}
      <div className="flex justify-end mt-10">
        <Link
          href={`/borrower-app/application/${applicationId}/submit`}
          className="
            bg-[#4EE38A] 
            text-black 
            font-semibold 
            px-8 py-3 
            rounded-md 
            hover:bg-[#3bc978] 
            transition
          "
        >
          Continue to Submit
        </Link>
      </div>

      {/* Resubmit Button */}
      {application.status === "returned" && (
        <div className="flex justify-end mt-10">
          <Link
            href={`/borrower-app/application/${applicationId}/submit`}
            className="
              bg-yellow-400
              text-black
              font-semibold
              px-8 py-3
              rounded-md
              hover:bg-yellow-500
              transition
            "
          >
            Resubmit Application
          </Link>
        </div>
      )}

    </div>
  );
}
