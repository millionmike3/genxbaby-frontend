"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function StartMortgageApplication() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function startApplication() {
    setLoading(true);
    const res = await fetch("/api/application/create", { method: "POST" });
    const data = await res.json();
    router.push(`/borrower-app/application/${data.applicationId}`);
  }

  return (
    <main className="min-h-screen bg-slate-950 text-white px-6 py-12">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold mb-6">Start Your Mortgage Application</h1>
        <p className="text-slate-400 mb-10">
          Begin your 1003 mortgage application. Your data will feed directly into underwriting,
          investor scoring, fraud detection, and compliance.
        </p>
        <button
          onClick={startApplication}
          disabled={loading}
          className="w-full bg-[#4EE38A] text-black font-semibold py-4 rounded-md hover:bg-[#3bc978] transition disabled:opacity-50"
        >
          {loading ? "Starting..." : "Begin Application"}
        </button>
      </div>
    </main>
  );
}
