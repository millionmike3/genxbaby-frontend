"use client";

import { useState, useEffect } from "react";

export default function InvestorPortalPage() {
  const [investorId] = useState(1001); // from auth in real app
  const [rate, setRate] = useState<string | null>(null);
  const [notes, setNotes] = useState<string[]>([]);
  const [sheets, setSheets] = useState<any[]>([]);

  useEffect(() => {
    (async () => {
      const res = await fetch("/api/admin/investor-sheets");
      const data = await res.json();
      setSheets(data.sheets.filter((s: any) => s.investorId === investorId));
    })();
  }, [investorId]);

  async function handleQuote() {
    const res = await fetch("/api/pricing/quote", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        fico: 720,
        ltv: 75,
        occupancy: "INVESTMENT",
        propertyType: "SFR",
        purpose: "PURCHASE",
        loanType: "NON_QM",
        termMonths: 360,
        investorId,
      }),
    });

    const data = await res.json();
    setRate(data.finalRate.toFixed(3));
    setNotes(data.notes);
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4 text-gx-neonGreen">Investor Portal</h1>

      <button
        onClick={handleQuote}
        className="px-4 py-2 bg-gx-neonGreen text-black rounded font-semibold mb-4"
      >
        Get Investor Quote
      </button>

      {rate && (
        <p className="text-lg text-gx-graySoft mb-2">
          Quoted rate: <span className="text-gx-neonGreen">{rate}%</span>
        </p>
      )}

      <ul className="text-xs text-gx-graySoft mb-6">
        {notes.map((n, i) => (
          <li key={i}>• {n}</li>
        ))}
      </ul>

      <h2 className="text-xl font-semibold mb-2 text-gx-graySoft">Active Pricing Sheets</h2>
      <ul className="text-sm text-gx-graySoft">
        {sheets.map((s) => (
          <li key={s.id}>
            #{s.id} — spread {s.baseSpread} / LLPA factor {s.llpaFactor}
          </li>
        ))}
      </ul>
    </div>
  );
}
