"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function MortgageApplication1003() {
  const router = useRouter();

  const [step, setStep] = useState(1);

  // -----------------------------
  // FORM STATE
  // -----------------------------
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const [employer, setEmployer] = useState("");
  const [income, setIncome] = useState("");

  const [checking, setChecking] = useState("");
  const [savings, setSavings] = useState("");

  const [propertyAddress, setPropertyAddress] = useState("");
  const [purchasePrice, setPurchasePrice] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // -----------------------------
  // SUBMIT HANDLER
  // -----------------------------
  async function handleSubmit() {
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/application/submit1003", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName,
          email,
          phone,
          employer,
          income,
          checking,
          savings,
          propertyAddress,
          purchasePrice,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Failed to submit application");
        setLoading(false);
        return;
      }

      // Redirect to application detail
      router.push(`/borrower-app/application/${data.applicationId}`);
    } catch (e) {
      setError("Network error");
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-slate-950 text-white px-6 py-12">
      <div className="max-w-3xl mx-auto">

        <h1 className="text-4xl font-bold mb-6">Mortgage Application (1003)</h1>
        <p className="text-slate-400 mb-10">
          Begin your mortgage application. Your data feeds directly into underwriting,
          investor scoring, and compliance — in real time.
        </p>

        {/* Step Indicator */}
        <div className="flex items-center gap-4 mb-10">
          {[1, 2, 3, 4].map((s) => (
            <div
              key={s}
              className={`
                w-10 h-10 flex items-center justify-center rounded-full border 
                ${step === s ? "bg-[#4EE38A] text-black border-[#4EE38A]" : "border-slate-700"}
              `}
            >
              {s}
            </div>
          ))}
        </div>

        {/* Step 1 — Personal Info */}
        {step === 1 && (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold">Personal Information</h2>

            <input
              type="text"
              placeholder="Full Name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full p-3 rounded-md bg-slate-900 border border-slate-700"
            />

            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 rounded-md bg-slate-900 border border-slate-700"
            />

            <input
              type="tel"
              placeholder="Phone Number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full p-3 rounded-md bg-slate-900 border border-slate-700"
            />

            <button
              onClick={() => setStep(2)}
              className="w-full bg-[#4EE38A] text-black font-semibold py-3 rounded-md hover:bg-[#3bc978] transition"
            >
              Continue
            </button>
          </div>
        )}

        {/* Step 2 — Income */}
        {step === 2 && (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold">Income & Employment</h2>

            <input
              type="text"
              placeholder="Employer Name"
              value={employer}
              onChange={(e) => setEmployer(e.target.value)}
              className="w-full p-3 rounded-md bg-slate-900 border border-slate-700"
            />

            <input
              type="number"
              placeholder="Annual Income"
              value={income}
              onChange={(e) => setIncome(e.target.value)}
              className="w-full p-3 rounded-md bg-slate-900 border border-slate-700"
            />

            <button
              onClick={() => setStep(3)}
              className="w-full bg-[#4EE38A] text-black font-semibold py-3 rounded-md hover:bg-[#3bc978] transition"
            >
              Continue
            </button>
          </div>
        )}

        {/* Step 3 — Assets */}
        {step === 3 && (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold">Assets</h2>

            <input
              type="number"
              placeholder="Checking Account Balance"
              value={checking}
              onChange={(e) => setChecking(e.target.value)}
              className="w-full p-3 rounded-md bg-slate-900 border border-slate-700"
            />

            <input
              type="number"
              placeholder="Savings Account Balance"
              value={savings}
              onChange={(e) => setSavings(e.target.value)}
              className="w-full p-3 rounded-md bg-slate-900 border border-slate-700"
            />

            <button
              onClick={() => setStep(4)}
              className="w-full bg-[#4EE38A] text-black font-semibold py-3 rounded-md hover:bg-[#3bc978] transition"
            >
              Continue
            </button>
          </div>
        )}

        {/* Step 4 — Property */}
        {step === 4 && (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold">Property Details</h2>

            <input
              type="text"
              placeholder="Property Address"
              value={propertyAddress}
              onChange={(e) => setPropertyAddress(e.target.value)}
              className="w-full p-3 rounded-md bg-slate-900 border border-slate-700"
            />

            <input
              type="number"
              placeholder="Purchase Price"
              value={purchasePrice}
              onChange={(e) => setPurchasePrice(e.target.value)}
              className="w-full p-3 rounded-md bg-slate-900 border border-slate-700"
            />

            <button
              onClick={handleSubmit}
              disabled={loading}
              className="w-full bg-[#4EE38A] text-black font-semibold py-3 rounded-md hover:bg-[#3bc978] transition disabled:opacity-50"
            >
              {loading ? "Submitting..." : "Submit Application"}
            </button>

            {error && <p className="text-red-400 text-sm">{error}</p>}
          </div>
        )}

      </div>
    </main>
  );
}
