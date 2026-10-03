"use client";

import { Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

function ReviewForm() {
  const router = useRouter();
  const params = useSearchParams();

  const loanAmount = params.get("loanAmount") ?? "";
  const income = params.get("income") ?? "";
  const employer = params.get("employer") ?? "";
  const rent = params.get("rent") ?? "";
  const city = params.get("city") ?? "";

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  async function submit() {
    setSubmitting(true);
    setError("");

    const res = await fetch("/api/borrower/application", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        loanAmount,
        income,
        employer,
        rent,
        city,
      }),
    });

    const json = await res.json();

    if (!res.ok) {
      setError(json.error || "Application submission failed");
      setSubmitting(false);
      return;
    }

    router.push("/borrower/dashboard");
  }

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <h1 className="text-3xl font-bold text-[#3CF46B]">Review Application</h1>

      <div className="mt-6 max-w-md space-y-3 text-sm">
        <div><strong>Loan Amount:</strong> {loanAmount}</div>
        <div><strong>Income:</strong> {income}</div>
        <div><strong>Employer:</strong> {employer}</div>
        <div><strong>Rent/Mortgage:</strong> {rent}</div>
        <div><strong>City:</strong> {city}</div>
      </div>

      {error && (
        <p className="mt-4 text-red-500 text-sm">{error}</p>
      )}

      <button
        onClick={submit}
        disabled={submitting}
        className="mt-6 bg-[#3CF46B] text-black font-bold px-4 py-2 rounded-lg hover:bg-[#32d05f] transition"
      >
        {submitting ? "Submitting..." : "Submit Application"}
      </button>
    </div>
  );
}

export default function ReviewPage() {
  return (
    <Suspense fallback={<div className="text-white p-8">Loading...</div>}>
      <ReviewForm />
    </Suspense>
  );
}
