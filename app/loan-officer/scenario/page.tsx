"use client";

import { useState } from "react";

export default function LoanOfficerScenarioPricing() {
  const [result, setResult] = useState(null);

  async function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);

    const res = await fetch("/loan-officer/scenario/run", {
      method: "POST",
      body: formData,
    });

    setResult(await res.json());
  }

  return (
    <main className="min-h-screen bg-slate-950 text-white p-6 space-y-10">
      <h1 className="text-3xl font-bold text-[#3CF46B]">Scenario Pricing</h1>

      <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-6 bg-neutral-900 p-6 rounded-xl">
        <Input label="Credit Score" name="creditScore" type="number" />
        <Input label="LTV" name="ltv" type="number" step="0.01" />
        <Input label="Loan Amount" name="loanAmount" type="number" />
        <Input label="Product" name="product" />
        <Input label="Term" name="term" type="number" />

        <button className="col-span-2 w-full px-6 py-3 bg-[#3CF46B] text-black rounded-lg">
          Run Scenario
        </button>
      </form>

      {result && (
        <section className="bg-neutral-900 p-6 rounded-xl border border-neutral-700 space-y-4">
          <h2 className="text-xl font-bold text-[#3CF46B]">Results</h2>
          <p>Final Rate: {result.finalRate.toFixed(3)}%</p>
        </section>
      )}
    </main>
  );
}

function Input({ label, name, type = "text", step }) {
  return (
    <div className="flex flex-col">
      <label className="text-sm text-slate-400">{label}</label>
      <input
        type={type}
        name={name}
        step={step}
        required
        className="bg-slate-800 text-white px-3 py-2 rounded-md"
      />
    </div>
  );
}
