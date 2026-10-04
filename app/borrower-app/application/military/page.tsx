"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export default function MilitaryServicePage() {
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
    router.push("/borrower-app/application/demographics");
  }

  function back() {
    router.push("/borrower-app/application/declarations");
  }

  return (
    <main className="min-h-screen bg-black text-white p-8 space-y-10">
      <h1 className="text-3xl font-bold text-[#3CF46B]">
        Military Service
      </h1>

      <Section title="Military Service of Borrower">
        <Checkbox
          label="I have served or am currently serving in the U.S. Armed Forces"
          checked={form.militaryService || false}
          onChange={(e) => update("militaryService", e.target.checked)}
        />

        {form.militaryService && (
          <div className="space-y-6">

            <Checkbox
              label="Currently serving on active duty"
              checked={form.militaryActiveDuty || false}
              onChange={(e) => update("militaryActiveDuty", e.target.checked)}
            />

            {form.militaryActiveDuty && (
              <Input
                label="Projected expiration date of service/tour"
                type="date"
                value={form.militaryExpiration || ""}
                onChange={(e) => update("militaryExpiration", e.target.value)}
              />
            )}

            <Checkbox
              label="Currently retired, discharged, or separated from service"
              checked={form.militaryRetired || false}
              onChange={(e) => update("militaryRetired", e.target.checked)}
            />

            <Checkbox
              label="Only period of service was as a non‑activated member of the Reserve or National Guard"
              checked={form.militaryReserve || false}
              onChange={(e) => update("militaryReserve", e.target.checked)}
            />

            <Checkbox
              label="Surviving spouse"
              checked={form.militarySurvivingSpouse || false}
              onChange={(e) => update("militarySurvivingSpouse", e.target.checked)}
            />
          </div>
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
          Next: Demographic Information
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

function Checkbox({ label, checked, onChange }: any) {
  return (
    <label className="flex items-center gap-3 text-slate-300">
      <input type="checkbox" checked={checked} onChange={onChange} />
      {label}
    </label>
  );
}
