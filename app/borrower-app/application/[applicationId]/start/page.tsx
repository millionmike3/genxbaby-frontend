"use client";

import { useRouter } from "next/navigation";

export default function StartMortgageApplication() {
  const router = useRouter();

  async function startApplication() {
    // TODO: Replace with your backend call
    // Example: const res = await fetch("/api/application/create", { method: "POST" });
    // const { applicationId } = await res.json();

    const applicationId = crypto.randomUUID(); // temporary placeholder

    router.push(`/borrower-app/application/${applicationId}`);
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
          className="
            w-full bg-[#4EE38A] text-black font-semibold py-4 rounded-md 
            hover:bg-[#3bc978] transition text-lg
          "
        >
          Begin Application
        </button>
           <a
           href="/login?role=borrower"
            className="px-6 py-3 bg-slate-800 text-white rounded-lg font-semibold hover:bg-slate-700"
          >
         Borrower Login
          </a>

      </div>
    </main>
  );
}
