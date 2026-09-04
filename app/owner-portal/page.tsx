"use client";

import { useState } from "react";

export default function OwnerPortalPage() {
  const [fico, setFico] = useState("");
  const [ltv, setLtv] = useState("");
  const [rate, setRate] = useState<string | null>(null);
  const [notes, setNotes] = useState<string[]>([]);

  async function handleQuote() {
    const res = await fetch("/api/pricing/quote", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        fico: Number(fico),
        ltv: Number(ltv),
        occupancy: "OWNER",
        propertyType: "SFR",
        purpose: "PURCHASE",
        loanType: "AGENCY",
        termMonths: 360,
        userId: 1, // replace with real auth user
      }),
    });

    const data = await res.json();
    setRate(data.finalRate.toFixed(3));
    setNotes(data.notes);
  }

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4 text-gx-neonGreen">Owner Portal Quote</h1>
      <div className="flex flex-col gap-3 mb-4">
        <input
          className="bg-black text-white p-2 rounded"
          placeholder="FICO"
          value={fico}
          onChange={(e) => setFico(e.target.value)}
        />
        <input
          className="bg-black text-white p-2 rounded"
          placeholder="LTV"
          value={ltv}
          onChange={(e) => setLtv(e.target.value)}
        />
        <button
          onClick={handleQuote}
          className="px-4 py-2 bg-gx-neonGreen text-black rounded font-semibold"
        >
          Get Quote
        </button>
      </div>

      {rate && (
        <div className="mt-4">
          <p className="text-lg text-gx-graySoft">
            Quoted rate: <span className="text-gx-neonGreen">{rate}%</span>
          </p>
          <ul className="mt-2 text-xs text-gx-graySoft">
            {notes.map((n, i) => (
              <li key={i}>• {n}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
