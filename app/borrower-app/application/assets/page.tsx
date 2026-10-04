"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export default function AssetsLiabilitiesPage() {
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
    router.push("/borrower-app/application/real-estate");
  }

  function back() {
    router.push("/borrower-app/application/employment");
  }

  return (
    <main className="min-h-screen bg-black text-white p-8 space-y-10">
      <h1 className="text-3xl font-bold text-[#3CF46B]">
        Assets & Liabilities
      </h1>

      {/* SECTION 2a — BANK ACCOUNTS */}
      <Section title="Bank Accounts, Retirement, and Other Accounts">
        <Checkbox
          label="I have financial accounts to report"
          checked={form.hasAccounts || false}
          onChange={(e) => update("hasAccounts", e.target.checked)}
        />

        {form.hasAccounts && (
          <>
            {(form.accounts || []).map((acc: any, idx: number) => (
              <div key={idx} className="bg-neutral-800 p-4 rounded-lg space-y-4 border border-neutral-700">
                <Select
                  label="Account Type"
                  value={acc.type || ""}
                  options={[
                    "Checking",
                    "Savings",
                    "Money Market",
                    "Certificate of Deposit",
                    "Mutual Fund",
                    "Stocks",
                    "Bonds",
                    "Retirement (401k, IRA)",
                    "Trust Account",
                    "Cash Value Life Insurance",
                  ]}
                  onChange={(e) => {
                    const updated = [...(form.accounts || [])];
                    updated[idx].type = e.target.value;
                    update("accounts", updated);
                  }}
                />

                <Input
                  label="Financial Institution"
                  value={acc.institution || ""}
                  onChange={(e) => {
                    const updated = [...(form.accounts || [])];
                    updated[idx].institution = e.target.value;
                    update("accounts", updated);
                  }}
                />

                <Input
                  label="Account Number"
                  value={acc.number || ""}
                  onChange={(e) => {
                    const updated = [...(form.accounts || [])];
                    updated[idx].number = e.target.value;
                    update("accounts", updated);
                  }}
                />

                <Input
                  label="Cash or Market Value ($)"
                  type="number"
                  value={acc.value || ""}
                  onChange={(e) => {
                    const updated = [...(form.accounts || [])];
                    updated[idx].value = e.target.value;
                    update("accounts", updated);
                  }}
                />
              </div>
            ))}

            <button
              onClick={() => {
                const updated = [...(form.accounts || []), {}];
                update("accounts", updated);
              }}
              className="bg-[#3CF46B] text-black px-4 py-2 rounded-lg font-semibold"
            >
              Add Another Account
            </button>
          </>
        )}
      </Section>

      {/* SECTION 2b — OTHER ASSETS & CREDITS */}
      <Section title="Other Assets & Credits">
        <Checkbox
          label="I have other assets or credits"
          checked={form.hasOtherAssets || false}
          onChange={(e) => update("hasOtherAssets", e.target.checked)}
        />

        {form.hasOtherAssets && (
          <>
            {(form.otherAssets || []).map((asset: any, idx: number) => (
              <div key={idx} className="bg-neutral-800 p-4 rounded-lg space-y-4 border border-neutral-700">
                <Select
                  label="Asset or Credit Type"
                  value={asset.type || ""}
                  options={[
                    "Proceeds from Real Estate",
                    "Proceeds from Sale of Non-Real Estate Asset",
                    "Secured Borrowed Funds",
                    "Unsecured Borrowed Funds",
                    "Earnest Money",
                    "Employer Assistance",
                    "Lot Equity",
                    "Relocation Funds",
                    "Rent Credit",
                    "Sweat Equity",
                    "Trade Equity",
                    "Other",
                  ]}
                  onChange={(e) => {
                    const updated = [...(form.otherAssets || [])];
                    updated[idx].type = e.target.value;
                    update("otherAssets", updated);
                  }}
                />

                <Input
                  label="Cash or Market Value ($)"
                  type="number"
                  value={asset.value || ""}
                  onChange={(e) => {
                    const updated = [...(form.otherAssets || [])];
                    updated[idx].value = e.target.value;
                    update("otherAssets", updated);
                  }}
                />
              </div>
            ))}

            <button
              onClick={() => {
                const updated = [...(form.otherAssets || []), {}];
                update("otherAssets", updated);
              }}
              className="bg-[#3CF46B] text-black px-4 py-2 rounded-lg font-semibold"
            >
              Add Another Asset
            </button>
          </>
        )}
      </Section>

      {/* SECTION 2c — LIABILITIES */}
      <Section title="Liabilities (Credit Cards, Loans, Leases)">
        <Checkbox
          label="I have liabilities to report"
          checked={form.hasLiabilities || false}
          onChange={(e) => update("hasLiabilities", e.target.checked)}
        />

        {form.hasLiabilities && (
          <>
            {(form.liabilities || []).map((liab: any, idx: number) => (
              <div key={idx} className="bg-neutral-800 p-4 rounded-lg space-y-4 border border-neutral-700">
                <Select
                  label="Account Type"
                  value={liab.type || ""}
                  options={[
                    "Revolving (credit cards)",
                    "Installment (car, student, personal loans)",
                    "Open 30-Day",
                    "Lease",
                    "Other",
                  ]}
                  onChange={(e) => {
                    const updated = [...(form.liabilities || [])];
                    updated[idx].type = e.target.value;
                    update("liabilities", updated);
                  }}
                />

                <Input
                  label="Company Name"
                  value={liab.company || ""}
                  onChange={(e) => {
                    const updated = [...(form.liabilities || [])];
                    updated[idx].company = e.target.value;
                    update("liabilities", updated);
                  }}
                />

                <Input
                  label="Account Number"
                  value={liab.number || ""}
                  onChange={(e) => {
                    const updated = [...(form.liabilities || [])];
                    updated[idx].number = e.target.value;
                    update("liabilities", updated);
                  }}
                />

                <Input
                  label="Unpaid Balance ($)"
                  type="number"
                  value={liab.balance || ""}
                  onChange={(e) => {
                    const updated = [...(form.liabilities || [])];
                    updated[idx].balance = e.target.value;
                    update("liabilities", updated);
                  }}
                />

                <Checkbox
                  label="To be paid off at or before closing"
                  checked={liab.payoff || false}
                  onChange={(e) => {
                    const updated = [...(form.liabilities || [])];
                    updated[idx].payoff = e.target.checked;
                    update("liabilities", updated);
                  }}
                />

                <Input
                  label="Monthly Payment ($)"
                  type="number"
                  value={liab.payment || ""}
                  onChange={(e) => {
                    const updated = [...(form.liabilities || [])];
                    updated[idx].payment = e.target.value;
                    update("liabilities", updated);
                  }}
                />
              </div>
            ))}

            <button
              onClick={() => {
                const updated = [...(form.liabilities || []), {}];
                update("liabilities", updated);
              }}
              className="bg-[#3CF46B] text-black px-4 py-2 rounded-lg font-semibold"
            >
              Add Another Liability
            </button>
          </>
        )}
      </Section>

      {/* SECTION 2d — OTHER LIABILITIES */}
      <Section title="Other Liabilities & Expenses">
        <Checkbox
          label="I have other liabilities or expenses"
          checked={form.hasOtherExpenses || false}
          onChange={(e) => update("hasOtherExpenses", e.target.checked)}
        />

        {form.hasOtherExpenses && (
          <>
            {(form.otherExpenses || []).map((exp: any, idx: number) => (
              <div key={idx} className="bg-neutral-800 p-4 rounded-lg space-y-4 border border-neutral-700">
                <Select
                  label="Expense Type"
                  value={exp.type || ""}
                  options={[
                    "Alimony",
                    "Child Support",
                    "Separate Maintenance",
                    "Job Related Expenses",
                    "Other",
                  ]}
                  onChange={(e) => {
                    const updated = [...(form.otherExpenses || [])];
                    updated[idx].type = e.target.value;
                    update("otherExpenses", updated);
                  }}
                />

                <Input
                  label="Monthly Payment ($)"
                  type="number"
                  value={exp.amount || ""}
                  onChange={(e) => {
                    const updated = [...(form.otherExpenses || [])];
                    updated[idx].amount = e.target.value;
                    update("otherExpenses", updated);
                  }}
                />
              </div>
            ))}

            <button
              onClick={() => {
                const updated = [...(form.otherExpenses || []), {}];
                update("otherExpenses", updated);
              }}
              className="bg-[#3CF46B] text-black px-4 py-2 rounded-lg font-semibold"
            >
              Add Another Expense
            </button>
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
          Next: Real Estate Owned
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
