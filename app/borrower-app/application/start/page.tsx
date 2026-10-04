"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export default function LoanPropertyInfo() {
  const router = useRouter();
  const [form, setForm] = useState<any>({});

  useEffect(() => {
    const saved = localStorage.getItem("1003");
    if (saved) setForm(JSON.parse(saved));
  }, []);

  function update(field: string, value: any) {
    const updated = { ...form, [field]: value };
    setForm(updated);
    localStorage.setItem("1003", JSON.stringify(updated));
  }

  function next() {
    router.push("/borrower-app/application/borrower");
  }

  return (
    <main className="min-h-screen bg-black text-white p-8 space-y-10">
      <h1 className="text-3xl font-bold text-[#3CF46B]">
        Loan & Property Information
      </h1>

      <Section title="Loan Details">
        <Input label="Loan Amount Requested" type="number"
          value={form.loanAmount || ""}
          onChange={(e) => update("loanAmount", e.target.value)}
        />

        <Select label="Loan Purpose"
          value={form.loanPurpose || ""}
          options={["Purchase", "Refinance", "Other"]}
          onChange={(e) => update("loanPurpose", e.target.value)}
        />
      </Section>

      <Section title="Property Details">
        <Input label="Property Address"
          value={form.propertyAddress || ""}
          onChange={(e) => update("propertyAddress", e.target.value)}
        />

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Input label="City" value={form.propertyCity || ""}
            onChange={(e) => update("propertyCity", e.target.value)}
          />
          <Input label="State" value={form.propertyState || ""}
            onChange={(e) => update("propertyState", e.target.value)}
          />
          <Input label="ZIP" value={form.propertyZip || ""}
            onChange={(e) => update("propertyZip", e.target.value)}
          />
        </div>

        <Input label="County"
          value={form.propertyCounty || ""}
          onChange={(e) => update("propertyCounty", e.target.value)}
        />

        <Input label="Number of Units" type="number"
          value={form.units || ""}
          onChange={(e) => update("units", e.target.value)}
        />

        <Select label="Occupancy"
          value={form.occupancy || ""}
          options={[
            "Primary Residence",
            "Second Home",
            "Investment Property",
            "FHA Secondary Residence",
          ]}
          onChange={(e) => update("occupancy", e.target.value)}
        />

        <Select label="Property Type"
          value={form.propertyType || ""}
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

      {/* Refinance Section */}
      {form.loanPurpose === "Refinance" && (
        <Section title="Refinance Details">
          <Input label="Current Property Value" type="number"
            value={form.refiPropertyValue || ""}
            onChange={(e) => update("refiPropertyValue", e.target.value)}
          />

          <Select label="Property Status"
            value={form.refiStatus || ""}
            options={["Retained", "Pending Sale", "Sold"]}
            onChange={(e) => update("refiStatus", e.target.value)}
          />

          <Input label="Monthly Mortgage Payment" type="number"
            value={form.refiMonthlyPayment || ""}
            onChange={(e) => update("refiMonthlyPayment", e.target.value)}
          />

          <Input label="Unpaid Principal Balance" type="number"
            value={form.refiUnpaidBalance || ""}
            onChange={(e) => update("refiUnpaidBalance", e.target.value)}
          />

          <Checkbox label="Loan will be paid off at closing"
            checked={form.refiPayoffAtClosing || false}
            onChange={(e) => update("refiPayoffAtClosing", e.target.checked)}
          />

          <Select label="Loan Type"
            value={form.refiLoanType || ""}
            options={["FHA", "VA", "Conventional", "USDA-RD", "Other"]}
            onChange={(e) => update("refiLoanType", e.target.value)}
          />

          <Input label="Credit Limit (if HELOC)" type="number"
            value={form.refiCreditLimit || ""}
            onChange={(e) => update("refiCreditLimit", e.target.value)}
          />
        </Section>
      )}

      <button
        onClick={next}
        className="bg-[#3CF46B] text-black px-6 py-3 rounded-lg font-semibold"
      >
        Next: Borrower Information
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

function Input({ label, type = "text", value, onChange }: any) {
  return (
    <div className="space-y-2">
      <label className="text-slate-300">{label}</label>
      <input
        type={type}
        value={value}
        className="w-full p-3 rounded bg-neutral-800 border border-neutral-700"
        onChange={onChange}
      />
    </div>
  );
}

function Select({ label, options, value, onChange }: any) {
  return (
    <div className="space-y-2">
      <label className="text-slate-300">{label}</label>
      <select
        value={value}
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

function Checkbox({ label, checked, onChange }: any) {
  return (
    <label className="flex items-center gap-3 text-slate-300">
      <input type="checkbox" checked={checked} onChange={onChange} />
      {label}
    </label>
  );
}
