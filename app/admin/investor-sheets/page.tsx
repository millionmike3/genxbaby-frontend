"use client";

import { useEffect, useState } from "react";

type Sheet = {
  id: number;
  investorId: number;
  name: string;
  baseSpread: number;
  llpaFactor: number;
  effectiveAt: string;
  active: boolean;
};

export default function InvestorSheetsPage() {
  const [investorId, setInvestorId] = useState("");
  const [baseSpread, setBaseSpread] = useState("");
  const [llpaFactor, setLlpaFactor] = useState("");
  const [sheets, setSheets] = useState<Sheet[]>([]);

  async function loadSheets() {
    const res = await fetch("/api/admin/investor-sheets");
    const data = await res.json();
    setSheets(data.sheets);
  }

  useEffect(() => {
    loadSheets();
  }, []);

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
    setInvestorId("");
    setBaseSpread("");
    setLlpaFactor("");
    await loadSheets();
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4 text-gx-neonGreen">
        Investor Pricing Sheets
      </h1>

      <div className="flex flex-col gap-3 max-w-md mb-6">
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
          className="mt-2 px-4 py-2 bg-gx-neonGreen text-black rounded font-semibold"
        >
          Save Sheet
        </button>
      </div>

      <h2 className="text-xl font-semibold mb-2 text-gx-graySoft">Existing Sheets</h2>
      <table className="w-full text-sm text-gx-graySoft border border-gx-border">
        <thead className="bg-gx-deepBlack">
          <tr>
            <th className="p-2 border-b border-gx-border">ID</th>
            <th className="p-2 border-b border-gx-border">Investor</th>
            <th className="p-2 border-b border-gx-border">Base Spread</th>
            <th className="p-2 border-b border-gx-border">LLPA Factor</th>
            <th className="p-2 border-b border-gx-border">Effective</th>
            <th className="p-2 border-b border-gx-border">Active</th>
          </tr>
        </thead>
        <tbody>
          {sheets.map((s) => (
            <tr key={s.id} className="bg-black">
              <td className="p-2 border-b border-gx-border">{s.id}</td>
              <td className="p-2 border-b border-gx-border">{s.investorId}</td>
              <td className="p-2 border-b border-gx-border">{s.baseSpread}</td>
              <td className="p-2 border-b border-gx-border">{s.llpaFactor}</td>
              <td className="p-2 border-b border-gx-border">
                {new Date(s.effectiveAt).toLocaleDateString()}
              </td>
              <td className="p-2 border-b border-gx-border">
                {s.active ? "Yes" : "No"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
