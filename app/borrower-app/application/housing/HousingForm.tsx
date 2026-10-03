"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

export default function HousingForm() {
  const router = useRouter();
  const params = useSearchParams();

  const loanAmount = params.get("loanAmount") ?? "";
  const income = params.get("income") ?? "";
  const employer = params.get("employer") ?? "";

  const [rent, setRent] = useState("");
  const [city, setCity] = useState("");

  function next() {
    const query = new URLSearchParams({
      loanAmount,
      income,
      employer,
      rent,
      city,
    }).toString();

    router.push(`/borrower-app/application/review?${query}`);
  }

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <h1 className="text-3xl font-bold text-[#3CF46B]">Housing Details</h1>

      <div className="mt-6 max-w-md space-y-4">
        <label className="block text-sm font-medium">Monthly Rent/Mortgage</label>
        <input
          type="number"
          value={rent}
          onChange={(e) => setRent(e.target.value)}
          className="w-full px-4 py-2 rounded-lg bg-neutral-800 border border-neutral-600 focus:border-[#3CF46B] outline-none"
        />

        <label className="block text-sm font-medium">City</label>
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="w-full px-4 py-2 rounded-lg bg-neutral-800 border border-neutral-600 focus:border-[#3CF46B] outline-none"
        />

        <button
          onClick={next}
          className="mt-4 bg-[#3CF46B] text-black font-bold px-4 py-2 rounded-lg hover:bg-[#32d05f] transition"
        >
          Next: Review
        </button>
      </div>
    </div>
  );
}
