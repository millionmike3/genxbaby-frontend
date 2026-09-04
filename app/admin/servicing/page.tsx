"use client";

import { useState } from "react";

export default function ServicingPage() {
  const [principal, setPrincipal] = useState("300000");
  const [rate, setRate] = useState("6.5");
  const [term, setTerm] = useState("360");
  const [schedule, setSchedule] = useState<any[]>([]);

  async function handleGenerate() {
    const res = await fetch("/api/servicing/schedule", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        principal: Number(principal),
        rate: Number(rate) / 100,
        termMonths: Number(term),
      }),
    });
    const data = await res.json();
    setSchedule(data.schedule);
  }

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4 text-gx-neonGreen">Servicing Engine</h1>

      <div className="flex flex-col gap-3 mb-4">
        <input
          className="bg-black text-white p-2 rounded"
          value={principal}
          onChange={(e) => setPrincipal(e.target.value)}
          placeholder="Principal"
        />
        <input
          className="bg-black text-white p-2 rounded"
          value={rate}
          onChange={(e) => setRate(e.target.value)}
          placeholder="Rate (%)"
        />
        <input
          className="bg-black text-white p-2 rounded"
          value={term}
          onChange={(e) => setTerm(e.target.value)}
          placeholder="Term (months)"
        />
        <button
          onClick={handleGenerate}
          className="px-4 py-2 bg-gx-neonGreen text-black rounded font-semibold"
        >
          Generate Schedule
        </button>
      </div>

      {schedule.length > 0 && (
        <div className="mt-4 text-xs text-gx-graySoft max-h-64 overflow-auto">
          {schedule.map((pmt) => (
            <div key={pmt.month}>
              Month {pmt.month}: Pmt {pmt.payment} | Prin {pmt.principal} | Int {pmt.interest} | Bal {pmt.balance}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
