"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export default function DeclarationsPage() {
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
    router.push("/borrower-app/application/military");
  }

  function back() {
    router.push("/borrower-app/application/real-estate");
  }

  return (
    <main className="min-h-screen bg-black text-white p-8 space-y-10">
      <h1 className="text-3xl font-bold text-[#3CF46B]">
        Declarations
      </h1>

      {/* SECTION 5a — PROPERTY & MONEY */}
      <Section title="About This Property & Your Money (5a)">
        <Checkbox
          label="I will occupy the property as my primary residence"
          checked={form.decOccupy || false}
          onChange={(e) => update("decOccupy", e.target.checked)}
        />

        {form.decOccupy && (
          <>
            <Checkbox
              label="I have had an ownership interest in another property in the last 3 years"
              checked={form.decOwnedLast3Years || false}
              onChange={(e) => update("decOwnedLast3Years", e.target.checked)}
            />

            {form.decOwnedLast3Years && (
              <>
                <Select
                  label="Type of property owned"
                  value={form.decOwnedType || ""}
                  options={[
                    "Primary Residence (PR)",
                    "FHA Secondary Residence (SR)",
                    "Second Home (SH)",
                    "Investment Property (IP)",
                  ]}
                  onChange={(e) => update("decOwnedType", e.target.value)}
                />

                <Select
                  label="How title was held"
                  value={form.decOwnedTitle || ""}
                  options={[
                    "By yourself (S)",
                    "Jointly with spouse (SP)",
                    "Jointly with another person (O)",
                  ]}
                  onChange={(e) => update("decOwnedTitle", e.target.value)}
                />
              </>
            )}
          </>
        )}

        <Checkbox
          label="I have a family relationship or business affiliation with the seller"
          checked={form.decSellerRelationship || false}
          onChange={(e) => update("decSellerRelationship", e.target.checked)}
        />

        <Checkbox
          label="I am borrowing money for this transaction that is not disclosed on this application"
          checked={form.decUndisclosedFunds || false}
          onChange={(e) => update("decUndisclosedFunds", e.target.checked)}
        />

        {form.decUndisclosedFunds && (
          <Input
            label="Amount of undisclosed funds ($)"
            type="number"
            value={form.decUndisclosedAmount || ""}
            onChange={(e) => update("decUndisclosedAmount", e.target.value)}
          />
        )}

        <Checkbox
          label="I am applying for a mortgage loan on another property not disclosed on this application"
          checked={form.decOtherMortgage || false}
          onChange={(e) => update("decOtherMortgage", e.target.checked)}
        />

        <Checkbox
          label="I am applying for new credit (credit card, installment loan, etc.) not disclosed on this application"
          checked={form.decNewCredit || false}
          onChange={(e) => update("decNewCredit", e.target.checked)}
        />

        <Checkbox
          label="This property will be subject to a PACE or clean‑energy lien"
          checked={form.decPACE || false}
          onChange={(e) => update("decPACE", e.target.checked)}
        />
      </Section>

      {/* SECTION 5b — FINANCES */}
      <Section title="About Your Finances (5b)">
        <Checkbox
          label="I am a co‑signer or guarantor on debt not disclosed on this application"
          checked={form.decCosigner || false}
          onChange={(e) => update("decCosigner", e.target.checked)}
        />

        <Checkbox
          label="I have outstanding judgments against me"
          checked={form.decJudgments || false}
          onChange={(e) => update("decJudgments", e.target.checked)}
        />

        <Checkbox
          label="I am delinquent or in default on federal debt"
          checked={form.decFederalDebt || false}
          onChange={(e) => update("decFederalDebt", e.target.checked)}
        />

        <Checkbox
          label="I am a party to a lawsuit with potential financial liability"
          checked={form.decLawsuit || false}
          onChange={(e) => update("decLawsuit", e.target.checked)}
        />

        <Checkbox
          label="I conveyed title to a property in lieu of foreclosure in the past 7 years"
          checked={form.decDeedInLieu || false}
          onChange={(e) => update("decDeedInLieu", e.target.checked)}
        />

        <Checkbox
          label="I completed a pre‑foreclosure sale or short sale in the past 7 years"
          checked={form.decShortSale || false}
          onChange={(e) => update("decShortSale", e.target.checked)}
        />

        <Checkbox
          label="I have had property foreclosed upon in the past 7 years"
          checked={form.decForeclosure || false}
          onChange={(e) => update("decForeclosure", e.target.checked)}
        />

        <Checkbox
          label="I have declared bankruptcy in the past 7 years"
          checked={form.decBankruptcy || false}
          onChange={(e) => update("decBankruptcy", e.target.checked)}
        />

        {form.decBankruptcy && (
          <Select
            label="Bankruptcy Type"
            value={form.decBankruptcyType || ""}
            options={[
              "Chapter 7",
              "Chapter 11",
              "Chapter 12",
              "Chapter 13",
            ]}
            onChange={(e) => update("decBankruptcyType", e.target.value)}
          />
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
          Next: Military Service
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
