"use client";

import { useState } from "react";

export default function ScenarioPricingPage() {
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setResult(null);

    const formData = new FormData(e.target);

    const res = await fetch("/scenario-pricing/run", {
      method: "POST",
      body: formData,
    });

    const json = await res.json();

    if (json.error) {
      setError(json.error);
      return;
    }

    setResult(json);
  }

  return (
    <main className="min-h-screen bg-slate-950 text-white p-6 space-y-10">
      <h1 className="text-4xl font-bold text-[#3CF46B]">
        Scenario Pricing Engine
      </h1>

      <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-6 bg-neutral-900 p-6 rounded-xl border border-neutral-700">
        <Input label="Credit Score" name="creditScore" type="number" />
        <Input label="LTV" name="ltv" type="number" step="0.01" />
        <Input label="CLTV" name="cltv" type="number" step="0.01" />
        <Input label="DTI" name="dti" type="number" step="0.01" />
        <Input label="Loan Amount" name="loanAmount" type="number" />
        <Input label="Product Type" name="product" placeholder="Conventional, FHA, VA, Jumbo" />
        <Input label="Term (years)" name="term" type="number" />
        <Input label="Occupancy" name="occupancy" placeholder="Primary, Second, Investment" />
        <Input label="Purpose" name="purpose" placeholder="Purchase, Refi, Cash-Out" />

        <button className="col-span-2 w-full px-6 py-3 bg-[#3CF46B] text-black font-semibold rounded-lg hover:bg-[#32d05f] transition">
          Run Pricing Scenario
        </button>
      </form>

      {error && <p className="text-red-400 text-sm">{error}</p>}

      {result && (
        <section className="bg-neutral-900 border border-neutral-700 rounded-xl p-6 space-y-4">
          <h2 className="text-2xl font-bold text-[#3CF46B]">Pricing Results</h2>

          <p className="text-sm text-slate-300">
            Base Rate: {result.baseRate.toFixed(3)}%
          </p>
          <p className="text-sm text-slate-300">
            LLPA Adjustments: {result.llpaBps} bps
          </p>
          <p className="text-sm text-slate-300">
            Overlays: {result.overlayBps} bps
          </p>
          <p className="text-sm text-slate-300">
            Margin Controls: {result.marginBps} bps
          </p>
          <p className="text-sm text-slate-300">
            Delivery Pricing: {result.deliveryBps} bps
          </p>
          <p className="text-sm text-slate-300">
            Exceptions: {result.exceptionBps} bps
          </p>

          <h3 className="text-xl font-bold text-white">
            Final Rate: {result.finalRate.toFixed(3)}%
          </h3>
        </section>
      )}
    </main>
  );
}

function Input({ label, name, type = "text", placeholder, step }) {
  return (
    <div className="flex flex-col">
      <label className="text-sm text-slate-400 mb-1">{label}</label>
      <input
        type={type}
        name={name}
        step={step}
        placeholder={placeholder}
        required
        className="bg-slate-800 text-white px-3 py-2 rounded-md"
      />
    </div>
  );
}
