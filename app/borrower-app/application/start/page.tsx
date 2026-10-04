"use client";

import { useState } from "react";

export default function MortgageApplication1003() {
  const [form, setForm] = useState<any>({});

  function update(field: string, value: any) {
    setForm((prev: any) => ({ ...prev, [field]: value }));
  }

  async function submitApplication() {
    try {
      const res = await fetch("/api/borrower-app/application/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const json = await res.json();
      alert(json.success ? "Application submitted!" : "Submission failed");
    } catch (err) {
      console.error(err);
      alert("Error submitting application");
    }
  }

  return (
    <main className="min-h-screen bg-black text-white px-6 py-12 space-y-12">
      <h1 className="text-3xl font-bold text-[#3CF46B]">
        Uniform Residential Loan Application (1003)
      </h1>

      <p className="text-slate-300">
        Complete your full mortgage application. No login required.
      </p>

      {/* Borrower Information */}
      <Section title="Borrower Information">
        <Input
          label="Full Name"
          onChange={(e) => update("fullName", e.target.value)}
        />
        <Input
          label="Email Address"
          type="email"
          onChange={(e) => update("email", e.target.value)}
        />
        <Input
          label="Phone Number"
          type="tel"
          onChange={(e) => update("phone", e.target.value)}
        />
        <Input
          label="Date of Birth"
          type="date"
          onChange={(e) => update("dob", e.target.value)}
        />
        <Input
          label="SSN"
          type="text"
          onChange={(e) => update("ssn", e.target.value)}
        />
      </Section>

      {/* Employment */}
      <Section title="Employment Information">
        <Input
          label="Employer Name"
          onChange={(e) => update("employer", e.target.value)}
        />
        <Input
          label="Job Title"
          onChange={(e) => update("jobTitle", e.target.value)}
        />
        <Input
          label="Monthly Income"
          type="number"
          onChange={(e) => update("incomeMonthly", e.target.value)}
        />
        <Input
          label="Years at Job"
          type="number"
          onChange={(e) => update("yearsAtJob", e.target.value)}
        />
      </Section>

      {/* Assets */}
      <Section title="Assets">
        <Input
          label="Checking Account Balance"
          type="number"
          onChange={(e) => update("checkingBalance", e.target.value)}
        />
        <Input
          label="Savings Account Balance"
          type="number"
          onChange={(e) => update("savingsBalance", e.target.value)}
        />
        <Input
          label="Other Liquid Assets"
          type="number"
          onChange={(e) => update("assetsLiquid", e.target.value)}
        />
      </Section>

      {/* Liabilities */}
      <Section title="Liabilities">
        <Input
          label="Monthly Debt Payments"
          type="number"
          onChange={(e) => update("debtsMonthly", e.target.value)}
        />
        <Input
          label="Credit Card Balances"
          type="number"
          onChange={(e) => update("creditBalances", e.target.value)}
        />
        <Input
          label="Auto Loans"
          type="number"
          onChange={(e) => update("autoLoans", e.target.value)}
        />
      </Section>

      {/* Property */}
      <Section title="Property Information">
        <Input
          label="Property Address"
          onChange={(e) => update("propertyAddress", e.target.value)}
        />
        <Input
          label="City"
          onChange={(e) => update("propertyCity", e.target.value)}
        />
        <Input
          label="State"
          onChange={(e) => update("propertyState", e.target.value)}
        />
        <Input
          label="ZIP Code"
          onChange={(e) => update("propertyZip", e.target.value)}
        />
        <Input
          label="Purchase Price"
          type="number"
          onChange={(e) => update("purchasePrice", e.target.value)}
        />
        <Input
          label="Loan Amount Requested"
          type="number"
          onChange={(e) => update("loanAmount", e.target.value)}
        />
      </Section>

      {/* Declarations */}
      <Section title="Declarations">
        <Checkbox
          label="I am a U.S. citizen"
          onChange={(e) => update("isCitizen", e.target.checked)}
        />
        <Checkbox
          label="I intend to occupy the property as my primary residence"
          onChange={(e) => update("primaryResidence", e.target.checked)}
        />
        <Checkbox
          label="I have not declared bankruptcy in the past 7 years"
          onChange={(e) => update("noBankruptcy", e.target.checked)}
        />
      </Section>

      {/* Submit */}
      <button
        onClick={submitApplication}
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

function Checkbox({ label, onChange }: any) {
  return (
    <label className="flex items-center gap-3 text-slate-300">
      <input type="checkbox" onChange={onChange} />
      {label}
    </label>
  );
}
