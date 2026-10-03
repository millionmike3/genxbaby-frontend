"use client";

import { Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

function IncomeForm() {
  const router = useRouter();
  const params = useSearchParams();

  const loanAmount = params.get("loanAmount") ?? "";

  const [income, setIncome] = useState("");
  const [employer, setEmployer] = useState("");

  function next() {
    const query = new URLSearchParams({
      loanAmount,
      income,
      employer,
    }).toString();

    router.push(`/borrower-app/application/housing?${query}`);
  }

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <h1 className="text-3xl font-bold text-[#3CF46B]">Income Details</h1>

      <div className="mt-6 max-w-md space-y-4">
        <label className="block text-sm font-medium">Monthly Income</label>
        <input
          type="number"
          value={income}
          onChange={(e) => setIncome(e.target.value)}
          className="w-full px-4 py-2 rounded-lg bg-neutral-800 border border-neutral-600 focus:border-[#3CF46B] outline-none"
        />

        <label className="block text-sm font-medium">Employer</label>
        <input
          type="text"
          value={employer}
          onChange={(e) => setEmployer(e.target.value)}
          className="w-full px-4 py-2 rounded-lg bg-neutral-800 border border-neutral-600 focus:border-[#3CF46B] outline-none"
        />

        <button
          onClick={next}
          className="mt-4 bg-[#3CF46B] text-black font-bold px-4 py-2 rounded-lg hover:bg-[#32d05f] transition"
        >
          Next: Housing
        </button>
      </div>
    </div>
  );
}

export default function IncomePage() {
  return (
    <Suspense fallback={<div className="text-white p-8">Loading...</div>}>
      <IncomeForm />
    </Suspense>
  );
}
