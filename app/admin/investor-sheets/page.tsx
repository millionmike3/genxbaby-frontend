"use client";

import { useState } from "react";

export default function InvestorSheetsPage() {
  const [investorId, setInvestorId] = useState("");
  const [baseSpread, setBaseSpread] = useState("");
  const [llpaFactor, setLlpaFactor] = useState("");

  async function handleSave() {
    await fetch("/api/admin/investor-sheets", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        investorId: Number(investorId),
        baseSpread: Number(baseSpread),
        llpaFactor: Number(llpaFactor),
      }),
    });
    alert("Sheet saved");
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4 text-gx-neonGreen">Investor Pricing Sheets</h1>
      <div className="flex flex-col gap-3 max-w-md">
        <input
          className="bg-black text-white p-2 rounded"
          placeholder="Investor ID"
          value={investorId}
          onChange={(e) => setInvestorId(e.target.value)}
        />
        <input
          className="bg-black text-white p-2 rounded"
          placeholder="Base spread (e.g. 0.250)"
          value={baseSpread}
          onChange={(e) => setBaseSpread(e.target.value)}
        />
        <input
          className="bg-black text-white p-2 rounded"
          placeholder="LLPA factor (e.g. 1.25)"
          value={llpaFactor}
          onChange={(e) => setLlpaFactor(e.target.value)}
        />
        <button
          onClick={handleSave}
          className="mt-2 px-4 py-2 bg-gx-neonGreen text-black rounded"
        >
          Save Sheet
        </button>
      </div>
    </div>
  );
}
