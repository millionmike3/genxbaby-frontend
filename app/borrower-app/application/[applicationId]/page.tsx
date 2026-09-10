"use client";

import { useParams } from "next/navigation";
import { useState } from "react";

export default function ApplicationPage() {
  const { applicationId } = useParams() as { applicationId: string };
  const [step, setStep] = useState(1);

  function trackEvent(type: string, metadata?: any) {
    fetch("/api/application/timeline", {
      method: "POST",
      body: JSON.stringify({ applicationId, type, metadata }),
    });
  }

  function nextStep() {
    const next = step + 1;
    setStep(next);
    trackEvent("STEP_COMPLETED", { step: next });
  }

  return (
    <main className="min-h-screen bg-slate-950 text-white px-6 py-12">
      <div className="max-w-3xl mx-auto space-y-10">
        <h1 className="text-3xl font-bold">Mortgage Application (1003)</h1>
        <p className="text-slate-400">Application ID: {applicationId}</p>

        <div className="flex gap-3">
          {[1, 2, 3, 4, 5].map((s) => (
            <div
              key={s}
              className={`
                w-8 h-8 flex items-center justify-center rounded-full border 
                ${step === s ? "bg-[#4EE38A] text-black border-[#4EE38A]" : "border-slate-700"}
              `}
            >
              {s}
            </div>
          ))}
        </div>

        {step === 1 && (
          <section className="space-y-4">
            <h2 className="text-xl font-semibold">Borrower Information</h2>
            <input className="w-full p-3 rounded-md bg-slate-900 border border-slate-700" placeholder="Full Name" />
            <input className="w-full p-3 rounded-md bg-slate-900 border border-slate-700" placeholder="Email" />
            <input className="w-full p-3 rounded-md bg-slate-900 border border-slate-700" placeholder="Phone" />
            <button
              onClick={nextStep}
              className="w-full bg-[#4EE38A] text-black font-semibold py-3 rounded-md hover:bg-[#3bc978] transition"
            >
              Continue
            </button>
          </section>
        )}

        {step === 2 && (
          <section className="space-y-4">
            <h2 className="text-xl font-semibold">Income & Employment</h2>
            <input className="w-full p-3 rounded-md bg-slate-900 border border-slate-700" placeholder="Employer Name" />
            <input
              type="number"
              className="w-full p-3 rounded-md bg-slate-900 border border-slate-700"
              placeholder="Annual Income"
            />
            <button
              onClick={nextStep}
              className="w-full bg-[#4EE38A] text-black font-semibold py-3 rounded-md hover:bg-[#3bc978] transition"
            >
              Continue
            </button>
          </section>
        )}

        {step === 3 && (
          <section className="space-y-4">
            <h2 className="text-xl font-semibold">Assets & Liabilities</h2>
            <input
              type="number"
              className="w-full p-3 rounded-md bg-slate-900 border border-slate-700"
              placeholder="Liquid Assets (Checking/Savings)"
            />
            <input
              type="number"
              className="w-full p-3 rounded-md bg-slate-900 border border-slate-700"
              placeholder="Total Monthly Debt Payments"
            />
            <button
              onClick={nextStep}
              className="w-full bg-[#4EE38A] text-black font-semibold py-3 rounded-md hover:bg-[#3bc978] transition"
            >
              Continue
            </button>
          </section>
        )}

        {step === 4 && (
          <section className="space-y-4">
            <h2 className="text-xl font-semibold">Property & Loan Details</h2>
            <input
              className="w-full p-3 rounded-md bg-slate-900 border border-slate-700"
              placeholder="Property Address"
            />
            <input
              type="number"
              className="w-full p-3 rounded-md bg-slate-900 border border-slate-700"
              placeholder="Purchase Price"
            />
            <select className="w-full p-3 rounded-md bg-slate-900 border border-slate-700" defaultValue="">
              <option value="" disabled>
                Select Loan Type
              </option>
              <option value="conventional">Conventional</option>
              <option value="fha">FHA</option>
              <option value="non-qm">Non-QM</option>
              <option value="hard-money">Hard Money</option>
            </select>
            <button
              onClick={nextStep}
              className="w-full bg-[#4EE38A] text-black font-semibold py-3 rounded-md hover:bg-[#3bc978] transition"
            >
              Continue
            </button>
          </section>
        )}

        {step === 5 && (
          <section className="space-y-4">
            <h2 className="text-xl font-semibold">Documents & Submission</h2>
            <p className="text-slate-400 text-sm">
              Upload bank statements, paystubs, and ID. These will be used for fraud checks and underwriting.
            </p>
            <input type="file" multiple className="w-full p-3 rounded-md bg-slate-900 border border-slate-700" />
            <button
              onClick={() => {
                trackEvent("APPLICATION_SUBMITTED");
                fetch("/api/application/submit", {
                  method: "POST",
                  body: JSON.stringify({ applicationId }),
                });
                alert("Application submitted for underwriting.");
              }}
              className="w-full bg-[#4EE38A] text-black font-semibold py-3 rounded-md hover:bg-[#3bc978] transition"
            >
              Submit for Underwriting
            </button>
          </section>
        )}
      </div>
    </main>
  );
}
