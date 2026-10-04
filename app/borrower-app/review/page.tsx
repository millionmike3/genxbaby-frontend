"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export default function ReviewSubmitPage() {
  const router = useRouter();
  const [form, setForm] = useState<any>({});

  useEffect(() => {
    const saved = localStorage.getItem("1003");
    if (saved) setForm(JSON.parse(saved));
  }, []);

  async function submit() {
    try {
      const res = await fetch("/api/borrower-app/application/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const json = await res.json();

      if (json.success) {
        alert("Your mortgage application has been submitted successfully.");
        localStorage.removeItem("1003");
        router.push("/borrower-app/application/success");
      } else {
        alert("Submission failed. Please try again.");
      }
    } catch (err) {
      console.error(err);
      alert("An error occurred while submitting your application.");
    }
  }

  function goTo(step: string) {
    router.push(`/borrower-app/application/${step}`);
  }

  return (
    <main className="min-h-screen bg-black text-white p-8 space-y-12">
      <h1 className="text-3xl font-bold text-[#3CF46B]">
        Review Your Application
      </h1>

      <p className="text-slate-400">
        Please review all information below. If anything needs correction, click the edit button for that section.
      </p>

      {/* SECTION 1 — Loan & Property */}
      <ReviewSection
        title="Loan & Property Information"
        onEdit={() => goTo("start")}
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

      {form.loanPurpose === "Refinance" && (
        <ReviewSection
          title="Refinance Details"
          onEdit={() => goTo("start")}
          fields={[
            ["Current Property Value", form.refiPropertyValue],
            ["Status", form.refiStatus],
            ["Monthly Mortgage Payment", form.refiMonthlyPayment],
            ["Unpaid Balance", form.refiUnpaidBalance],
            ["Payoff at Closing", form.refiPayoffAtClosing ? "Yes" : "No"],
            ["Loan Type", form.refiLoanType],
            ["Credit Limit (HELOC)", form.refiCreditLimit],
          ]}
        />
      )}

      {/* SECTION 2 — Borrower Info */}
      <ReviewSection
        title="Borrower Information"
        onEdit={() => goTo("borrower")}
        fields={[
          ["Name", `${form.firstName || ""} ${form.middleName || ""} ${form.lastName || ""}`],
          ["Alternate Names", form.altNames],
          ["SSN", form.ssn],
          ["Date of Birth", form.dob],
          ["Citizenship", form.citizenship],
          ["Credit Type", form.creditType],
          ["Other Borrowers", form.otherBorrowers],
          ["Email", form.email],
          ["Home Phone", form.homePhone],
          ["Cell Phone", form.cellPhone],
          ["Work Phone", form.workPhone],
        ]}
      />

      {/* SECTION 3 — Employment */}
      <ReviewSection
        title="Employment & Income"
        onEdit={() => goTo("employment")}
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

      {/* SECTION 4 — Assets & Liabilities */}
      <ReviewSection
        title="Assets & Liabilities"
        onEdit={() => goTo("assets")}
        fields={[
          ["Accounts", form.accounts?.length || 0],
          ["Other Assets", form.otherAssets?.length || 0],
          ["Liabilities", form.liabilities?.length || 0],
          ["Other Expenses", form.otherExpenses?.length || 0],
        ]}
      />

      {/* SECTION 5 — Real Estate Owned */}
      <ReviewSection
        title="Real Estate Owned"
        onEdit={() => goTo("real-estate")}
        fields={[
          ["Owns Real Estate", form.noRealEstate ? "No" : "Yes"],
          ["Properties Count", form.properties?.length || 0],
        ]}
      />

      {/* SECTION 6 — Declarations */}
      <ReviewSection
        title="Declarations"
        onEdit={() => goTo("declarations")}
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

      {/* SECTION 7 — Military */}
      <ReviewSection
        title="Military Service"
        onEdit={() => goTo("military")}
        fields={[
          ["Military Service", form.militaryService ? "Yes" : "No"],
          ["Active Duty", form.militaryActiveDuty ? "Yes" : "No"],
          ["Expiration Date", form.militaryExpiration],
          ["Retired / Discharged", form.militaryRetired ? "Yes" : "No"],
          ["Reserve / Guard", form.militaryReserve ? "Yes" : "No"],
          ["Surviving Spouse", form.militarySurvivingSpouse ? "Yes" : "No"],
        ]}
      />

      {/* SECTION 8 — Demographics */}
      <ReviewSection
        title="Demographic Information"
        onEdit={() => goTo("demographics")}
        fields={[
          ["Ethnicity", form.ethnicity],
          ["Ethnicity Sub", form.ethnicitySub],
          ["Sex", form.sex],
          ["Race", form.race],
          ["Race Sub", form.raceAsianSub || form.racePacificSub],
          ["Method Provided", form.demographicMethod],
        ]}
      />

      {/* SUBMIT BUTTON */}
      <button
        onClick={submit}
        className="bg-[#3CF46B] text-black px-6 py-4 rounded-lg font-bold text-lg"
      >
        Submit Full Application
      </button>
    </main>
  );
}

/* Reusable Components */

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
