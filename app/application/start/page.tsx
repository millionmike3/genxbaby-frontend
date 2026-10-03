"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function BorrowerApplicationStartPage() {
  const router = useRouter();
  const [loanAmount, setLoanAmount] = useState("");

  function next() {
    router.push(`/borrower-app/application/income?loanAmount=${loanAmount}`);
  }

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <h1 className="text-3xl font-bold text-[#3CF46B]">Start Application</h1>

      <div className="mt-6 max-w-md space-y-4">
        <label className="block text-sm font-medium">
          Desired Loan Amount
        </label>
        <input
          type="number"
          value={loanAmount}
          onChange={(e) => setLoanAmount(e.target.value)}
          className="w-full px-4 py-2 rounded-lg bg-neutral-800 border border-neutral-600 focus:border-[#3CF46B] outline-none"
        />

        <button
          onClick={next}
          className="mt-4 bg-[#3CF46B] text-black font-bold px-4 py-2 rounded-lg hover:bg-[#32d05f] transition"
        >
          Next: Income
        </button>
      </div>
    </div>
  );
}
