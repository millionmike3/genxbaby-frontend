"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export default function DemographicsPage() {
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
    router.push("/borrower-app/application/review");
  }

  function back() {
    router.push("/borrower-app/application/military");
  }

  return (
    <main className="min-h-screen bg-black text-white p-8 space-y-10">
      <h1 className="text-3xl font-bold text-[#3CF46B]">
        Demographic Information
      </h1>

      <p className="text-slate-400 text-sm">
        Federal law requires lenders to ask for this information to ensure fair lending practices.  
        You may select one or more categories or choose not to provide this information.
      </p>

      {/* ETHNICITY */}
      <Section title="Ethnicity">
        <Select
          label="Ethnicity"
          value={form.ethnicity || ""}
          options={[
            "Hispanic or Latino",
            "Not Hispanic or Latino",
            "I do not wish to provide this information",
          ]}
          onChange={(e) => update("ethnicity", e.target.value)}
        />

        {form.ethnicity === "Hispanic or Latino" && (
          <Select
            label="Ethnicity Sub‑Category"
            value={form.ethnicitySub || ""}
            options={[
              "Mexican",
              "Puerto Rican",
              "Cuban",
              "Other Hispanic or Latino",
            ]}
            onChange={(e) => update("ethnicitySub", e.target.value)}
          />
        )}

        {form.ethnicitySub === "Other Hispanic or Latino" && (
          <Input
            label="Print origin"
            value={form.ethnicityOrigin || ""}
            onChange={(e) => update("ethnicityOrigin", e.target.value)}
          />
        )}
      </Section>

      {/* SEX */}
      <Section title="Sex">
        <Select
          label="Sex"
          value={form.sex || ""}
          options={[
            "Female",
            "Male",
            "I do not wish to provide this information",
          ]}
          onChange={(e) => update("sex", e.target.value)}
        />
      </Section>

      {/* RACE */}
      <Section title="Race">
        <Select
          label="Race"
          value={form.race || ""}
          options={[
            "American Indian or Alaska Native",
            "Asian",
            "Black or African American",
            "Native Hawaiian or Other Pacific Islander",
            "White",
            "I do not wish to provide this information",
          ]}
          onChange={(e) => update("race", e.target.value)}
        />

        {form.race === "American Indian or Alaska Native" && (
          <Input
            label="Print name of enrolled or principal tribe"
            value={form.raceTribe || ""}
            onChange={(e) => update("raceTribe", e.target.value)}
          />
        )}

        {form.race === "Asian" && (
          <Select
            label="Asian Sub‑Category"
            value={form.raceAsianSub || ""}
            options={[
              "Asian Indian",
              "Chinese",
              "Filipino",
              "Japanese",
              "Korean",
              "Vietnamese",
              "Other Asian",
            ]}
            onChange={(e) => update("raceAsianSub", e.target.value)}
          />
        )}

        {form.raceAsianSub === "Other Asian" && (
          <Input
            label="Print race"
            value={form.raceAsianOther || ""}
            onChange={(e) => update("raceAsianOther", e.target.value)}
          />
        )}

        {form.race === "Native Hawaiian or Other Pacific Islander" && (
          <Select
            label="Pacific Islander Sub‑Category"
            value={form.racePacificSub || ""}
            options={[
              "Native Hawaiian",
              "Guamanian or Chamorro",
              "Samoan",
              "Other Pacific Islander",
            ]}
            onChange={(e) => update("racePacificSub", e.target.value)}
          />
        )}

        {form.racePacificSub === "Other Pacific Islander" && (
          <Input
            label="Print race"
            value={form.racePacificOther || ""}
            onChange={(e) => update("racePacificOther", e.target.value)}
          />
        )}
      </Section>

      {/* LENDER OBSERVATION FIELDS */}
      <Section title="For Lender Use (if taken in person)">
        <Checkbox
          label="Ethnicity collected by visual observation or surname"
          checked={form.ethnicityObserved || false}
          onChange={(e) => update("ethnicityObserved", e.target.checked)}
        />

        <Checkbox
          label="Sex collected by visual observation or surname"
          checked={form.sexObserved || false}
          onChange={(e) => update("sexObserved", e.target.checked)}
        />

        <Checkbox
          label="Race collected by visual observation or surname"
          checked={form.raceObserved || false}
          onChange={(e) => update("raceObserved", e.target.checked)}
        />

        <Select
          label="Demographic Information Provided Through"
          value={form.demographicMethod || ""}
          options={[
            "Face‑to‑Face Interview",
            "Telephone Interview",
            "Fax or Mail",
            "Email or Internet",
          ]}
          onChange={(e) => update("demographicMethod", e.target.value)}
        />
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
          Next: Review & Submit
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
