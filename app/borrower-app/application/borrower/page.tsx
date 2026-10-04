"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export default function BorrowerInfoPage() {
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
    router.push("/borrower-app/application/employment");
  }

  function back() {
    router.push("/borrower-app/application/start");
  }

  return (
    <main className="min-h-screen bg-black text-white p-8 space-y-10">
      <h1 className="text-3xl font-bold text-[#3CF46B]">
        Borrower Information
      </h1>

      <Section title="Personal Information">
        <Input label="First Name" value={form.firstName || ""} onChange={(e) => update("firstName", e.target.value)} />
        <Input label="Middle Name" value={form.middleName || ""} onChange={(e) => update("middleName", e.target.value)} />
        <Input label="Last Name" value={form.lastName || ""} onChange={(e) => update("lastName", e.target.value)} />
        <Input label="Suffix (Jr, Sr, III)" value={form.suffix || ""} onChange={(e) => update("suffix", e.target.value)} />

        <Input label="Alternate Names (if any)" value={form.altNames || ""} onChange={(e) => update("altNames", e.target.value)} />

        <Input label="Social Security Number" value={form.ssn || ""} onChange={(e) => update("ssn", e.target.value)} />
        <Input label="Date of Birth" type="date" value={form.dob || ""} onChange={(e) => update("dob", e.target.value)} />

        <Select
          label="Citizenship"
          value={form.citizenship || ""}
          options={["U.S. Citizen", "Permanent Resident Alien", "Non-Permanent Resident Alien"]}
          onChange={(e) => update("citizenship", e.target.value)}
        />

        <Select
          label="Type of Credit"
          value={form.creditType || ""}
          options={["Individual", "Joint"]}
          onChange={(e) => update("creditType", e.target.value)}
        />

        {form.creditType === "Joint" && (
          <Input
            label="Other Borrower(s) Names"
            value={form.otherBorrowers || ""}
            onChange={(e) => update("otherBorrowers", e.target.value)}
          />
        )}
      </Section>

      <Section title="Contact Information">
        <Input label="Home Phone" value={form.homePhone || ""} onChange={(e) => update("homePhone", e.target.value)} />
        <Input label="Cell Phone" value={form.cellPhone || ""} onChange={(e) => update("cellPhone", e.target.value)} />
        <Input label="Work Phone" value={form.workPhone || ""} onChange={(e) => update("workPhone", e.target.value)} />
        <Input label="Email Address" type="email" value={form.email || ""} onChange={(e) => update("email", e.target.value)} />
      </Section>

      <Section title="Current Address">
        <Input label="Street" value={form.currStreet || ""} onChange={(e) => update("currStreet", e.target.value)} />
        <Input label="Unit #" value={form.currUnit || ""} onChange={(e) => update("currUnit", e.target.value)} />

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Input label="City" value={form.currCity || ""} onChange={(e) => update("currCity", e.target.value)} />
          <Input label="State" value={form.currState || ""} onChange={(e) => update("currState", e.target.value)} />
          <Input label="ZIP" value={form.currZip || ""} onChange={(e) => update("currZip", e.target.value)} />
        </div>

        <Input label="Country" value={form.currCountry || ""} onChange={(e) => update("currCountry", e.target.value)} />

        <div className="grid grid-cols-2 gap-4">
          <Input label="Years at Address" type="number" value={form.currYears || ""} onChange={(e) => update("currYears", e.target.value)} />
          <Input label="Months at Address" type="number" value={form.currMonths || ""} onChange={(e) => update("currMonths", e.target.value)} />
        </div>

        <Select
          label="Housing Status"
          value={form.currHousing || ""}
          options={["Own", "Rent", "No primary housing expense"]}
          onChange={(e) => update("currHousing", e.target.value)}
        />

        {form.currHousing === "Rent" && (
          <Input
            label="Rent Amount ($/month)"
            type="number"
            value={form.currRent || ""}
            onChange={(e) => update("currRent", e.target.value)}
          />
        )}
      </Section>

      {/* Former Address if < 2 years */}
      {(Number(form.currYears || 0) < 2) && (
        <Section title="Former Address (Required)">
          <Input label="Street" value={form.prevStreet || ""} onChange={(e) => update("prevStreet", e.target.value)} />
          <Input label="Unit #" value={form.prevUnit || ""} onChange={(e) => update("prevUnit", e.target.value)} />

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Input label="City" value={form.prevCity || ""} onChange={(e) => update("prevCity", e.target.value)} />
            <Input label="State" value={form.prevState || ""} onChange={(e) => update("prevState", e.target.value)} />
            <Input label="ZIP" value={form.prevZip || ""} onChange={(e) => update("prevZip", e.target.value)} />
          </div>

          <Input label="Country" value={form.prevCountry || ""} onChange={(e) => update("prevCountry", e.target.value)} />

          <div className="grid grid-cols-2 gap-4">
            <Input label="Years at Address" type="number" value={form.prevYears || ""} onChange={(e) => update("prevYears", e.target.value)} />
            <Input label="Months at Address" type="number" value={form.prevMonths || ""} onChange={(e) => update("prevMonths", e.target.value)} />
          </div>

          <Select
            label="Housing Status"
            value={form.prevHousing || ""}
            options={["Own", "Rent", "No primary housing expense"]}
            onChange={(e) => update("prevHousing", e.target.value)}
          />

          {form.prevHousing === "Rent" && (
            <Input
              label="Rent Amount ($/month)"
              type="number"
              value={form.prevRent || ""}
              onChange={(e) => update("prevRent", e.target.value)}
            />
          )}
        </Section>
      )}

      <Section title="Mailing Address">
        <Checkbox
          label="Mailing address is same as current address"
          checked={form.mailSame || false}
          onChange={(e) => update("mailSame", e.target.checked)}
        />

        {!form.mailSame && (
          <>
            <Input label="Street" value={form.mailStreet || ""} onChange={(e) => update("mailStreet", e.target.value)} />
            <Input label="Unit #" value={form.mailUnit || ""} onChange={(e) => update("mailUnit", e.target.value)} />

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <Input label="City" value={form.mailCity || ""} onChange={(e) => update("mailCity", e.target.value)} />
              <Input label="State" value={form.mailState || ""} onChange={(e) => update("mailState", e.target.value)} />
              <Input label="ZIP" value={form.mailZip || ""} onChange={(e) => update("mailZip", e.target.value)} />
            </div>

            <Input label="Country" value={form.mailCountry || ""} onChange={(e) => update("mailCountry", e.target.value)} />
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
          Next: Employment
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
