"use client";

import { useState } from "react";

export default function CreatePricingOverlayPage() {
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    const formData = new FormData(e.target);

    const res = await fetch("/api/owner/manage/pricing/overlays/create", {
      method: "POST",
      body: formData,
    });

    if (res.redirected) {
      window.location.href = res.url;
      return;
    }

    const json = await res.json();
    setError(json.error || "Failed to create pricing overlay");
  }

  return (
    <main className="min-h-screen bg-slate-950 text-white p-6 flex justify-center">
      <div className="bg-neutral-900 border border-neutral-700 rounded-xl p-8 w-full max-w-lg space-y-6">
        <h1 className="text-3xl font-bold text-[#3CF46B]">
          Add Pricing Overlay
        </h1>

        {error && <p className="text-red-400 text-sm">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-6">
          <Input label="Overlay Name" name="name" placeholder="High DTI, Low Credit, High LTV, etc." />

          <div className="flex flex-col">
            <label className="text-sm text-slate-400 mb-1">Overlay Type</label>
            <select
              name="type"
              required
              className="bg-slate-800 text-white px-3 py-2 rounded-md"
            >
              <option value="DTI">DTI</option>
              <option value="LTV">LTV</option>
              <option value="CLTV">CLTV</option>
              <option value="CREDIT">Credit Score</option>
              <option value="RESERVES">Reserves</option>
              <option value="FRAUD">Fraud Score</option>
              <option value="PRODUCT">Product Type</option>
              <option value="OCCUPANCY">Occupancy</option>
              <option value="PURPOSE">Loan Purpose</option>
              <option value="INVESTOR">Investor Specific</option>
            </select>
          </div>

          <Input label="Adjustment (bps)" name="adjustmentBps" type="number" />

          <button className="w-full px-6 py-3 bg-[#3CF46B] text-black font-semibold rounded-lg hover:bg-[#32d05f] transition">
            Create Overlay
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
        required
        placeholder={placeholder}
        className="bg-slate-800 text-white px-3 py-2 rounded-md"
      />
    </div>
  );
}
