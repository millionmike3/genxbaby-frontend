"use client";

import { useState } from "react";

export default function CreatePricingExceptionPage() {
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    const formData = new FormData(e.target);

    const res = await fetch("/api/owner/manage/pricing/exceptions/create", {
      method: "POST",
      body: formData,
    });

    if (res.redirected) {
      window.location.href = res.url;
      return;
    }

    const json = await res.json();
    setError(json.error || "Failed to create pricing exception");
  }

  return (
    <main className="min-h-screen bg-slate-950 text-white p-6 flex justify-center">
      <div className="bg-neutral-900 border border-neutral-700 rounded-xl p-8 w-full max-w-lg space-y-6">
        <h1 className="text-3xl font-bold text-[#3CF46B]">
          Add Pricing Exception
        </h1>

        {error && <p className="text-red-400 text-sm">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-6">
          <Input label="Exception Name" name="name" placeholder="Special LO concession, promo pricing, etc." />

          <div className="flex flex-col">
            <label className="text-sm text-slate-400 mb-1">Scope</label>
            <select
              name="scope"
              required
              className="bg-slate-800 text-white px-3 py-2 rounded-md"
            >
              <option value="LOAN_OFFICER">Loan Officer</option>
              <option value="BRANCH">Branch</option>
              <option value="PRODUCT">Product</option>
              <option value="INVESTOR">Investor</option>
              <option value="CORPORATE">Corporate</option>
              <option value="RISK">Risk Override</option>
            </select>
          </div>

          <Input label="Adjustment (bps)" name="adjustmentBps" type="number" />

          <Input label="Expires At (optional)" name="expiresAt" type="date" />

          <button className="w-full px-6 py-3 bg-[#3CF46B] text-black font-semibold rounded-lg hover:bg-[#32d05f] transition">
            Create Exception
          </button>
        </form>
      </div>
    </main>
  );
}

function Input({ label, name, type = "text", placeholder }) {
  return (
    <div className="flex flex-col">
      <label className="text-sm text-slate-400 mb-1">{label}</label>
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        className="bg-slate-800 text-white px-3 py-2 rounded-md"
      />
    </div>
  );
}
