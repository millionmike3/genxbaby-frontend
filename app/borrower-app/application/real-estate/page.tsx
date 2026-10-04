"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export default function RealEstateOwnedPage() {
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

  function updateProperty(idx: number, field: string, value: any) {
    const updated = [...(form.properties || [])];
    updated[idx][field] = value;
    update("properties", updated);
  }

  function addProperty() {
    const updated = [...(form.properties || []), {}];
    update("properties", updated);
  }

  function next() {
    router.push("/borrower-app/application/declarations");
  }

  function back() {
    router.push("/borrower-app/application/assets");
  }

  return (
    <main className="min-h-screen bg-black text-white p-8 space-y-10">
      <h1 className="text-3xl font-bold text-[#3CF46B]">
        Real Estate Owned
      </h1>

      <Section title="Do You Own Any Real Estate?">
        <Checkbox
          label="I do not own any real estate"
          checked={form.noRealEstate || false}
          onChange={(e) => update("noRealEstate", e.target.checked)}
        />
      </Section>

      {!form.noRealEstate && (
        <Section title="Properties You Own">
          {(form.properties || []).map((prop: any, idx: number) => (
            <div key={idx} className="bg-neutral-800 p-6 rounded-xl border border-neutral-700 space-y-6">

              <h3 className="text-lg font-semibold text-[#3CF46B]">
                Property #{idx + 1}
              </h3>

              <Input
                label="Street"
                value={prop.street || ""}
                onChange={(e) => updateProperty(idx, "street", e.target.value)}
              />

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <Input
                  label="City"
                  value={prop.city || ""}
                  onChange={(e) => updateProperty(idx, "city", e.target.value)}
                />
                <Input
                  label="State"
                  value={prop.state || ""}
                  onChange={(e) => updateProperty(idx, "state", e.target.value)}
                />
                <Input
                  label="ZIP"
                  value={prop.zip || ""}
                  onChange={(e) => updateProperty(idx, "zip", e.target.value)}
                />
              </div>

              <Input
                label="Country"
                value={prop.country || ""}
                onChange={(e) => updateProperty(idx, "country", e.target.value)}
              />

              <Input
                label="Property Value ($)"
                type="number"
                value={prop.value || ""}
                onChange={(e) => updateProperty(idx, "value", e.target.value)}
              />

              <Select
                label="Status"
                value={prop.status || ""}
                options={["Retained", "Pending Sale", "Sold"]}
                onChange={(e) => updateProperty(idx, "status", e.target.value)}
              />

              <Select
                label="Intended Occupancy"
                value={prop.occupancy || ""}
                options={[
                  "Primary Residence",
                  "Second Home",
                  "Investment Property",
                  "Other",
                ]}
                onChange={(e) => updateProperty(idx, "occupancy", e.target.value)}
              />

              <Input
                label="Monthly Insurance / Taxes / HOA ($)"
                type="number"
                value={prop.escrow || ""}
                onChange={(e) => updateProperty(idx, "escrow", e.target.value)}
              />

              {/* RENTAL INCOME FOR 2–4 UNIT OR INVESTMENT */}
              {(prop.occupancy === "Investment Property" || Number(form.units) > 1) && (
                <>
                  <Input
                    label="Monthly Rental Income ($)"
                    type="number"
                    value={prop.rentIncome || ""}
                    onChange={(e) => updateProperty(idx, "rentIncome", e.target.value)}
                  />

                  <Input
                    label="Net Monthly Rental Income ($)"
                    type="number"
                    value={prop.netRentIncome || ""}
                    onChange={(e) => updateProperty(idx, "netRentIncome", e.target.value)}
                  />
                </>
              )}

              {/* MORTGAGE LOANS ON THIS PROPERTY */}
              <h3 className="text-lg font-semibold text-[#3CF46B] mt-6">
                Mortgage Loans on This Property
              </h3>

              {(prop.loans || []).map((loan: any, loanIdx: number) => (
                <div key={loanIdx} className="bg-neutral-900 p-4 rounded-lg border border-neutral-700 space-y-4">

                  <Input
                    label="Creditor Name"
                    value={loan.creditor || ""}
                    onChange={(e) => {
                      const updatedLoans = [...(prop.loans || [])];
                      updatedLoans[loanIdx].creditor = e.target.value;
                      updateProperty(idx, "loans", updatedLoans);
                    }}
                  />

                  <Input
                    label="Account Number"
                    value={loan.account || ""}
                    onChange={(e) => {
                      const updatedLoans = [...(prop.loans || [])];
                      updatedLoans[loanIdx].account = e.target.value;
                      updateProperty(idx, "loans", updatedLoans);
                    }}
                  />

                  <Input
                    label="Monthly Mortgage Payment ($)"
                    type="number"
                    value={loan.payment || ""}
                    onChange={(e) => {
                      const updatedLoans = [...(prop.loans || [])];
                      updatedLoans[loanIdx].payment = e.target.value;
                      updateProperty(idx, "loans", updatedLoans);
                    }}
                  />

                  <Input
                    label="Unpaid Balance ($)"
                    type="number"
                    value={loan.balance || ""}
                    onChange={(e) => {
                      const updatedLoans = [...(prop.loans || [])];
                      updatedLoans[loanIdx].balance = e.target.value;
                      updateProperty(idx, "loans", updatedLoans);
                    }}
                  />

                  <Checkbox
                    label="To be paid off at or before closing"
                    checked={loan.payoff || false}
                    onChange={(e) => {
                      const updatedLoans = [...(prop.loans || [])];
                      updatedLoans[loanIdx].payoff = e.target.checked;
                      updateProperty(idx, "loans", updatedLoans);
                    }}
                  />

                  <Select
                    label="Loan Type"
                    value={loan.type || ""}
                    options={["FHA", "VA", "Conventional", "USDA-RD", "Other"]}
                    onChange={(e) => {
                      const updatedLoans = [...(prop.loans || [])];
                      updatedLoans[loanIdx].type = e.target.value;
                      updateProperty(idx, "loans", updatedLoans);
                    }}
                  />

                  <Input
                    label="Credit Limit (if HELOC)"
                    type="number"
                    value={loan.creditLimit || ""}
                    onChange={(e) => {
                      const updatedLoans = [...(prop.loans || [])];
                      updatedLoans[loanIdx].creditLimit = e.target.value;
                      updateProperty(idx, "loans", updatedLoans);
                    }}
                  />
                </div>
              ))}

              <button
                onClick={() => {
                  const updatedLoans = [...(prop.loans || []), {}];
                  updateProperty(idx, "loans", updatedLoans);
                }}
                className="bg-[#3CF46B] text-black px-4 py-2 rounded-lg font-semibold"
              >
                Add Another Loan
              </button>
            </div>
          ))}

          <button
            onClick={addProperty}
            className="bg-[#3CF46B] text-black px-4 py-2 rounded-lg font-semibold mt-4"
          >
            Add Another Property
          </button>
        </Section>
      )}

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
          Next: Declarations
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
