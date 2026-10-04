"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export default function EmploymentPage() {
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
    router.push("/borrower-app/application/assets");
  }

  function back() {
    router.push("/borrower-app/application/borrower");
  }

  return (
    <main className="min-h-screen bg-black text-white p-8 space-y-10">
      <h1 className="text-3xl font-bold text-[#3CF46B]">
        Employment & Income
      </h1>

      {/* CURRENT EMPLOYMENT */}
      <Section title="Current Employment (Required)">
        <Input label="Employer or Business Name"
          value={form.empName || ""}
          onChange={(e) => update("empName", e.target.value)}
        />

        <Input label="Employer Phone"
          value={form.empPhone || ""}
          onChange={(e) => update("empPhone", e.target.value)}
        />

        <Input label="Street"
          value={form.empStreet || ""}
          onChange={(e) => update("empStreet", e.target.value)}
        />

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Input label="City" value={form.empCity || ""} onChange={(e) => update("empCity", e.target.value)} />
          <Input label="State" value={form.empState || ""} onChange={(e) => update("empState", e.target.value)} />
          <Input label="ZIP" value={form.empZip || ""} onChange={(e) => update("empZip", e.target.value)} />
        </div>

        <Input label="Country"
          value={form.empCountry || ""}
          onChange={(e) => update("empCountry", e.target.value)}
        />

        <Input label="Position / Title"
          value={form.empTitle || ""}
          onChange={(e) => update("empTitle", e.target.value)}
        />

        <Input label="Start Date" type="date"
          value={form.empStart || ""}
          onChange={(e) => update("empStart", e.target.value)}
        />

        <div className="grid grid-cols-2 gap-4">
          <Input label="Years in Line of Work" type="number"
            value={form.empYears || ""}
            onChange={(e) => update("empYears", e.target.value)}
          />
          <Input label="Months in Line of Work" type="number"
            value={form.empMonths || ""}
            onChange={(e) => update("empMonths", e.target.value)}
          />
        </div>

        <Checkbox
          label="I am employed by a family member, property seller, real estate agent, or other party to the transaction."
          checked={form.empRelated || false}
          onChange={(e) => update("empRelated", e.target.checked)}
        />

        <Checkbox
          label="I am the business owner or self-employed"
          checked={form.empSelf || false}
          onChange={(e) => update("empSelf", e.target.checked)}
        />

        {form.empSelf && (
          <Select
            label="Ownership Share"
            value={form.empOwnership || ""}
            options={["Less than 25%", "25% or more"]}
            onChange={(e) => update("empOwnership", e.target.value)}
          />
        )}

        <h3 className="text-lg font-semibold text-[#3CF46B] mt-6">
          Gross Monthly Income
        </h3>

        <Input label="Base Income ($/month)" type="number"
          value={form.empBase || ""}
          onChange={(e) => update("empBase", e.target.value)}
        />

        <Input label="Overtime ($/month)" type="number"
          value={form.empOvertime || ""}
          onChange={(e) => update("empOvertime", e.target.value)}
        />

        <Input label="Bonus ($/month)" type="number"
          value={form.empBonus || ""}
          onChange={(e) => update("empBonus", e.target.value)}
        />

        <Input label="Commission ($/month)" type="number"
          value={form.empCommission || ""}
          onChange={(e) => update("empCommission", e.target.value)}
        />

        <Input label="Military Entitlements ($/month)" type="number"
          value={form.empMilitary || ""}
          onChange={(e) => update("empMilitary", e.target.value)}
        />

        <Input label="Other Income ($/month)" type="number"
          value={form.empOther || ""}
          onChange={(e) => update("empOther", e.target.value)}
        />
      </Section>

      {/* ADDITIONAL EMPLOYMENT */}
      <Section title="Additional Employment (Optional)">
        <Checkbox
          label="I have additional employment"
          checked={form.hasAdditionalEmployment || false}
          onChange={(e) => update("hasAdditionalEmployment", e.target.checked)}
        />

        {form.hasAdditionalEmployment && (
          <>
            <Input label="Employer Name"
              value={form.addEmpName || ""}
              onChange={(e) => update("addEmpName", e.target.value)}
            />

            <Input label="Employer Phone"
              value={form.addEmpPhone || ""}
              onChange={(e) => update("addEmpPhone", e.target.value)}
            />

            <Input label="Position / Title"
              value={form.addEmpTitle || ""}
              onChange={(e) => update("addEmpTitle", e.target.value)}
            />

            <Input label="Start Date" type="date"
              value={form.addEmpStart || ""}
              onChange={(e) => update("addEmpStart", e.target.value)}
            />

            <Input label="Base Income ($/month)" type="number"
              value={form.addEmpBase || ""}
              onChange={(e) => update("addEmpBase", e.target.value)}
            />
          </>
        )}
      </Section>

      {/* PREVIOUS EMPLOYMENT */}
      <Section title="Previous Employment (Required if < 2 years at current job)">
        <Checkbox
          label="I have previous employment"
          checked={form.hasPrevEmployment || false}
          onChange={(e) => update("hasPrevEmployment", e.target.checked)}
        />

        {form.hasPrevEmployment && (
          <>
            <Input label="Employer Name"
              value={form.prevEmpName || ""}
              onChange={(e) => update("prevEmpName", e.target.value)}
            />

            <Input label="Position / Title"
              value={form.prevEmpTitle || ""}
              onChange={(e) => update("prevEmpTitle", e.target.value)}
            />

            <Input label="Start Date" type="date"
              value={form.prevEmpStart || ""}
              onChange={(e) => update("prevEmpStart", e.target.value)}
            />

            <Input label="End Date" type="date"
              value={form.prevEmpEnd || ""}
              onChange={(e) => update("prevEmpEnd", e.target.value)}
            />

            <Input label="Previous Gross Monthly Income ($/month)" type="number"
              value={form.prevEmpIncome || ""}
              onChange={(e) => update("prevEmpIncome", e.target.value)}
            />
          </>
        )}
      </Section>

      {/* OTHER INCOME */}
      <Section title="Income From Other Sources">
        <Checkbox
          label="I have additional income sources"
          checked={form.hasOtherIncome || false}
          onChange={(e) => update("hasOtherIncome", e.target.checked)}
        />

        {form.hasOtherIncome && (
          <>
            <Select
              label="Income Source"
              value={form.otherIncomeSource || ""}
              options={[
                "Alimony",
                "Child Support",
                "Interest & Dividends",
                "Retirement",
                "Social Security",
                "VA Compensation",
                "Unemployment",
                "Notes Receivable",
                "Boarder Income",
                "Capital Gains",
                "Other",
              ]}
              onChange={(e) => update("otherIncomeSource", e.target.value)}
            />

            <Input label="Monthly Income ($)" type="number"
              value={form.otherIncomeAmount || ""}
              onChange={(e) => update("otherIncomeAmount", e.target.value)}
            />
          </>
        )}
      </Section>

      <div className="flex justify-between pt-6">
        <button
          onClick={back}
          className="bg-neutral-700 text-white px-6 py-3 rounded-lg font-semibold"
        >
          Back
        </button>

        <button
          onClick={next}
          className="bg-[#3CF46B] text-black px-6 py-3 rounded-lg font-semibold"
        >
          Next: Assets & Liabilities
        </button>
      </div>
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
