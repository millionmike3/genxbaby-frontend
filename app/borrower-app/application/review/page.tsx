"use client";

import { Suspense } from "react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

function ReviewForm() {
  const router = useRouter();
  const [form, setForm] = useState<any>({});
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const saved = localStorage.getItem("1003");
    if (saved) setForm(JSON.parse(saved));
  }, []);

  function edit(path: string) {
    router.push(`/borrower-app/application/${path}`);
  }

  async function submit() {
    setSubmitting(true);
    setError("");

    try {
      const res = await fetch("/api/borrower-app/application/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const json = await res.json();

      if (!json.success) {
        setError(json.error || "Application submission failed");
        setSubmitting(false);
        return;
      }

      localStorage.removeItem("1003");
      router.push("/borrower-app/borrower-app/application/success");
    } catch (err) {
      console.error(err);
      setError("Unexpected error submitting application.");
      setSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen bg-black text-white p-8 space-y-10">
      <h1 className="text-3xl font-bold text-[#3CF46B]">Review Your Application</h1>

      <p className="text-slate-400">
        Please review all information below. If anything needs correction, click the edit button for that section.
      </p>

      {/* SECTION COMPONENT */}
      <ReviewSection
        title="Loan & Property Information"
        onEdit={() => edit("start")}
        fields={[
          ["Loan Amount", form.loanAmount],
          ["Loan Purpose", form.loanPurpose],
          ["Property Address", form.propertyAddress],
          ["City", form.propertyCity],
          ["State", form.propertyState],
          ["ZIP", form.propertyZip],
          ["County", form.propertyCounty],
          ["Units", form.units],
          ["Occupancy", form.occupancy],
          ["Property Type", form.propertyType],
        ]}
      />

      <ReviewSection
        title="Borrower Information"
        onEdit={() => edit("borrower")}
        fields={[
          ["Name", `${form.firstName || ""} ${form.middleName || ""} ${form.lastName || ""}`],
          ["Alternate Names", form.altNames],
          ["SSN", form.ssn],
          ["Date of Birth", form.dob],
          ["Citizenship", form.citizenship],
          ["Email", form.email],
          ["Home Phone", form.homePhone],
          ["Cell Phone", form.cellPhone],
          ["Work Phone", form.workPhone],
        ]}
      />

      <ReviewSection
        title="Employment & Income"
        onEdit={() => edit("employment")}
        fields={[
          ["Employer Name", form.empName],
          ["Position", form.empTitle],
          ["Start Date", form.empStart],
          ["Years in Line of Work", form.empYears],
          ["Base Income", form.empBase],
          ["Bonus", form.empBonus],
          ["Commission", form.empCommission],
          ["Other Income", form.empOther],
        ]}
      />

      <ReviewSection
        title="Assets & Liabilities"
        onEdit={() => edit("assets")}
        fields={[
          ["Accounts", form.accounts?.length || 0],
          ["Other Assets", form.otherAssets?.length || 0],
          ["Liabilities", form.liabilities?.length || 0],
          ["Other Expenses", form.otherExpenses?.length || 0],
        ]}
      />

      <ReviewSection
        title="Real Estate Owned"
        onEdit={() => edit("real-estate")}
        fields={[
          ["Owns Real Estate", form.noRealEstate ? "No" : "Yes"],
          ["Properties Count", form.properties?.length || 0],
        ]}
      />

      <ReviewSection
        title="Declarations"
        onEdit={() => edit("declarations")}
        fields={[
          ["Occupy Property", form.decOccupy ? "Yes" : "No"],
          ["Undisclosed Funds", form.decUndisclosedFunds ? "Yes" : "No"],
          ["Judgments", form.decJudgments ? "Yes" : "No"],
          ["Federal Debt", form.decFederalDebt ? "Yes" : "No"],
          ["Foreclosure", form.decForeclosure ? "Yes" : "No"],
          ["Bankruptcy", form.decBankruptcy ? "Yes" : "No"],
          ["Bankruptcy Type", form.decBankruptcyType],
        ]}
      />

      <ReviewSection
        title="Military Service"
        onEdit={() => edit("military")}
        fields={[
          ["Military Service", form.militaryService ? "Yes" : "No"],
          ["Active Duty", form.militaryActiveDuty ? "Yes" : "No"],
          ["Expiration Date", form.militaryExpiration],
          ["Retired / Discharged", form.militaryRetired ? "Yes" : "No"],
          ["Reserve / Guard", form.militaryReserve ? "Yes" : "No"],
          ["Surviving Spouse", form.militarySurvivingSpouse ? "Yes" : "No"],
        ]}
      />

      <ReviewSection
        title="Demographic Information"
        onEdit={() => edit("demographics")}
        fields={[
          ["Ethnicity", form.ethnicity],
          ["Ethnicity Sub", form.ethnicitySub],
          ["Sex", form.sex],
          ["Race", form.race],
          ["Race Sub", form.raceAsianSub || form.racePacificSub],
          ["Method Provided", form.demographicMethod],
        ]}
      />

      {error && <p className="text-red-500">{error}</p>}

      <button
        onClick={submit}
        disabled={submitting}
        className="bg-[#3CF46B] text-black px-6 py-4 rounded-lg font-bold text-lg hover:bg-[#32d05f] transition"
      >
        {submitting ? "Submitting..." : "Submit Application"}
      </button>
    </div>
  );
}

function ReviewSection({ title, fields, onEdit }: any) {
  return (
    <section className="bg-neutral-900 p-6 rounded-xl border border-neutral-700 space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-[#3CF46B]">{title}</h2>
        <button
          onClick={onEdit}
          className="text-black bg-[#3CF46B] px-3 py-1 rounded-md font-semibold"
        >
          Edit
        </button>
      </div>

      <div className="space-y-2">
        {fields.map(([label, value]: any, idx: number) => (
          <p key={idx} className="text-slate-300">
            <span className="font-semibold">{label}:</span>{" "}
            {value !== undefined && value !== "" ? value.toString() : "—"}
          </p>
        ))}
      </div>
    </section>
  );
}

export default function ReviewPage() {
  return (
    <Suspense fallback={<div className="text-white p-8">Loading...</div>}>
      <ReviewForm />
    </Suspense>
  );
}
