"use client";

import { useState } from "react";

export default function BorrowerApplicationStartPage() {
  const [form, setForm] = useState<any>({});

  function update(field: string, value: any) {
    setForm((prev: any) => ({ ...prev, [field]: value }));
  }

  async function submit() {
    const res = await fetch("/api/borrower-app/application/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    const json = await res.json();
    alert(json.success ? "Application submitted!" : "Submission failed");
  }

  return (
    <main className="min-h-screen bg-black text-white px-6 py-12 space-y-12">
      <h1 className="text-3xl font-bold text-[#3CF46B]">
        Uniform Residential Loan Application (1003)
      </h1>

      <p className="text-slate-300">
        Complete your full mortgage application. No login required.
      </p>

      {/* SECTION 4 — Loan & Property Information */}
      <Section title="Loan & Property Information">
        <Input label="Loan Amount Requested" type="number" onChange={(e) => update("loanAmount", e.target.value)} />

        <Select
          label="Loan Purpose"
          options={["Purchase", "Refinance", "Other"]}
          onChange={(e) => update("loanPurpose", e.target.value)}
        />

        <Input label="Property Address" onChange={(e) => update("propertyAddress", e.target.value)} />

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Input label="City" onChange={(e) => update("propertyCity", e.target.value)} />
          <Input label="State" onChange={(e) => update("propertyState", e.target.value)} />
          <Input label="ZIP" onChange={(e) => update("propertyZip", e.target.value)} />
        </div>

        <Input label="County" onChange={(e) => update("propertyCounty", e.target.value)} />

        <Input label="Number of Units" type="number" onChange={(e) => update("units", e.target.value)} />

        <Select
          label="Occupancy"
          options={[
            "Primary Residence",
            "Second Home",
            "Investment Property",
            "FHA Secondary Residence",
          ]}
          onChange={(e) => update("occupancy", e.target.value)}
        />

        <Select
          label="Property Type"
          options={[
            "Single Family",
            "Condo",
            "Townhouse",
            "2-4 Unit",
            "Manufactured Home",
            "Mixed Use",
          ]}
          onChange={(e) => update("propertyType", e.target.value)}
        />
      </Section>

      {/* SECTION 4 — REFINANCE DETAILS */}
      {form.loanPurpose === "Refinance" && (
        <Section title="Refinance Details (Required)">
          <p className="text-slate-400 text-sm">
            Based on your uploaded 1003: “If you are refinancing, list the property you are refinancing FIRST.”
          </p>

          <Input
            label="Current Property Value"
            type="number"
            onChange={(e) => update("refiPropertyValue", e.target.value)}
          />

          <Select
            label="Property Status"
            options={["Retained", "Pending Sale", "Sold"]}
            onChange={(e) => update("refiStatus", e.target.value)}
          />

          <Select
            label="Intended Occupancy"
            options={["Primary Residence", "Second Home", "Investment Property", "Other"]}
            onChange={(e) => update("refiOccupancy", e.target.value)}
          />

          <Input
            label="Monthly Insurance / Taxes / HOA"
            type="number"
            onChange={(e) => update("refiMonthlyEscrow", e.target.value)}
          />

          <h3 className="text-lg font-semibold text-[#3CF46B] mt-6">
            Existing Mortgage Loan(s)
          </h3>

          <Input
            label="Current Lender Name"
            onChange={(e) => update("refiLenderName", e.target.value)}
          />

          <Input
            label="Mortgage Account Number"
            onChange={(e) => update("refiAccountNumber", e.target.value)}
          />

          <Input
            label="Monthly Mortgage Payment"
            type="number"
            onChange={(e) => update("refiMonthlyPayment", e.target.value)}
          />

          <Input
            label="Unpaid Principal Balance"
            type="number"
            onChange={(e) => update("refiUnpaidBalance", e.target.value)}
          />

          <Checkbox
            label="This loan will be paid off at or before closing"
            onChange={(e) => update("refiPayoffAtClosing", e.target.checked)}
          />

          <Select
            label="Loan Type"
            options={["FHA", "VA", "Conventional", "USDA-RD", "Other"]}
            onChange={(e) => update("refiLoanType", e.target.value)}
          />

          <Input
            label="Credit Limit (if HELOC)"
            type="number"
            onChange={(e) => update("refiCreditLimit", e.target.value)}
          />
        </Section>
      )}

      {/* SECTION 1 — Borrower Information */}
      <Section title="Borrower Information">
        <Input label="Full Name" onChange={(e) => update("fullName", e.target.value)} />
        <Input label="Alternate Names" onChange={(e) => update("alternateNames", e.target.value)} />
        <Input label="Email Address" type="email" onChange={(e) => update("email", e.target.value)} />
        <Input label="Phone Number" type="tel" onChange={(e) => update("phone", e.target.value)} />
        <Input label="Date of Birth" type="date" onChange={(e) => update("dob", e.target.value)} />
        <Input label="SSN / ITIN" onChange={(e) => update("ssn", e.target.value)} />

        <Select
          label="Citizenship"
          options={["U.S. Citizen", "Permanent Resident Alien", "Non-Permanent Resident Alien"]}
          onChange={(e) => update("citizenship", e.target.value)}
        />

        <Select
          label="Marital Status"
          options={["Married", "Separated", "Unmarried"]}
          onChange={(e) => update("maritalStatus", e.target.value)}
        />

        <Input label="Dependents (Number)" type="number" onChange={(e) => update("dependents", e.target.value)} />
      </Section>

      {/* SECTION 1b — Employment */}
      <Section title="Current Employment">
        <Input label="Employer Name" onChange={(e) => update("employer", e.target.value)} />
        <Input label="Position / Title" onChange={(e) => update("jobTitle", e.target.value)} />
        <Input label="Start Date" type="date" onChange={(e) => update("jobStart", e.target.value)} />
        <Input label="Years in Line of Work" type="number" onChange={(e) => update("yearsInWork", e.target.value)} />

        <Input label="Base Monthly Income" type="number" onChange={(e) => update("incomeBase", e.target.value)} />
        <Input label="Other Monthly Income" type="number" onChange={(e) => update("incomeOther", e.target.value)} />
      </Section>

      {/* SECTION 2 — Assets & Liabilities */}
      <Section title="Assets & Liabilities">
        <Input label="Checking Balance" type="number" onChange={(e) => update("checking", e.target.value)} />
        <Input label="Savings Balance" type="number" onChange={(e) => update("savings", e.target.value)} />
        <Input label="Retirement Accounts" type="number" onChange={(e) => update("retirement", e.target.value)} />
        <Input label="Monthly Debt Payments" type="number" onChange={(e) => update("debts", e.target.value)} />
      </Section>

      {/* SECTION 5 — Declarations */}
      <Section title="Declarations">
        <Checkbox label="I will occupy the property as my primary residence" onChange={(e) => update("primaryResidence", e.target.checked)} />
        <Checkbox label="I have not declared bankruptcy in the past 7 years" onChange={(e) => update("noBankruptcy", e.target.checked)} />
        <Checkbox label="I am not delinquent on federal debt" onChange={(e) => update("noFederalDebt", e.target.checked)} />
      </Section>

      {/* SECTION 7 — Military Service */}
      <Section title="Military Service">
        <Checkbox label="I have served or am currently serving in the U.S. Armed Forces" onChange={(e) => update("militaryService", e.target.checked)} />
      </Section>

      {/* SECTION 8 — Demographics */}
      <Section title="Demographic Information">
        <Select
          label="Ethnicity"
          options={["Hispanic or Latino", "Not Hispanic or Latino", "Prefer not to say"]}
          onChange={(e) => update("ethnicity", e.target.value)}
        />

        <Select
          label="Sex"
          options={["Male", "Female", "Prefer not to say"]}
          onChange={(e) => update("sex", e.target.value)}
        />

        <Select
          label="Race"
          options={[
            "White",
            "Black or African American",
            "Asian",
            "American Indian or Alaska Native",
            "Native Hawaiian or Other Pacific Islander",
            "Prefer not to say",
          ]}
          onChange={(e) => update("race", e.target.value)}
        />
      </Section>

      {/* Submit */}
      <button
        onClick={submit}
        className="bg-[#3CF46B] text-black px-6 py-3 rounded-lg font-semibold"
      >
        Submit Application
      </button>
    </main>
  );
}

/* Reusable Components */

function Section({ title, children }: any) {
  return (
    <section className="bg-neutral-900 p-6 rounded-xl border border-neutral-700 space-y-4">
      <h2 className="text-xl font-semibold text-[#3CF46B]">{title}</h2>
      {children}
    </section>
  );
}

function Input({ label, type = "text", onChange }: any) {
  return (
    <div className="space-y-2">
      <label className="text-slate-300">{label}</label>
      <input
        type={type}
        className="w-full p-3 rounded bg-neutral-800 border border-neutral-700"
        onChange={onChange}
      />
    </div>
  );
}

function Select({ label, options, onChange }: any) {
  return (
    <div className="space-y-2">
      <label className="text-slate-300">{label}</label>
      <select
        className="w-full p-3 rounded bg-neutral-800 border border-neutral-700"
        onChange={onChange}
      >
        <option value="">Select…</option>
        {options.map((o: string) => (
          <option key={o} value={o}>{o}</option>
        ))}
      </select>
    </div>
  );
}

function Checkbox({ label, onChange }: any) {
  return (
    <label className="flex items-center gap-3 text-slate-300">
      <input type="checkbox" onChange={onChange} />
      {label}
    </label>
  );
}
