"use client";

export default function BorrowerPortalPage() {
  return (
    <main className="px-6 md:px-12 lg:px-20 py-16 text-white bg-slate-900">
        <img 
        src="/images/borrower.jpg" 
      alt="Borrower Portal" 
       className="w-full max-w-4xl rounded-xl mb-10"
     />

      <h1 className="text-4xl font-bold mb-6">Borrower Portal</h1>

      <p className="text-slate-300 leading-relaxed mb-6">
        This is where everyday borrowers experience GenXBaby—without realizing they’re sitting on top of a full fintech intelligence engine.
      </p>

      <h2 className="text-2xl font-semibold mt-10 mb-4">Core Purpose</h2>
      <p className="text-slate-300 leading-relaxed">
        Help borrowers qualify faster, smarter, and more accurately, while feeding rich data into underwriting, investor decisions, and compliance.
      </p>

      <h2 className="text-2xl font-semibold mt-10 mb-4">Key Capabilities</h2>
      <ul className="list-disc pl-6 text-slate-300 leading-relaxed space-y-3">
        <li>
          <strong>Smart onboarding flow:</strong> Guided application collecting income, assets, liabilities, timelines, and property goals.
        </li>
        <li>
          <strong>Loan‑type routing engine:</strong> Automatically evaluates borrower data and routes them toward the best fit:
          <ul className="list-disc pl-6 mt-2">
            <li>Conventional</li>
            <li>FHA</li>
            <li>Non‑QM</li>
            <li>Hard Money</li>
          </ul>
        </li>
        <li>
          <strong>Timeline evaluation:</strong> Measures responsiveness, consistency, and behavioral signals.
        </li>
        <li>
          <strong>Identity vault & fraud checks:</strong> Identity and documents are verified, stored securely, and scored for risk.
        </li>
        <li>
          <strong>Real‑time qualification signals:</strong> Borrowers see progress indicators and likelihood scores.
        </li>
      </ul>

      <h2 className="text-2xl font-semibold mt-10 mb-4">Behavioral Intelligence</h2>
      <ul className="list-disc pl-6 text-slate-300 leading-relaxed space-y-3">
        <li>Session scoring: pauses, edits, hesitations, rapid submissions.</li>
        <li>Impulsiveness levels: Stable, Reactive, Impulsive, Volatile.</li>
        <li>Underwriting signals: Behavior becomes part of the risk model.</li>
      </ul>

      <h2 className="text-2xl font-semibold mt-10 mb-4">Why This Matters</h2>
      <p className="text-slate-300 leading-relaxed">
        The borrower portal is not just an intake form—it’s a behavioral and financial intelligence engine that turns applications into decision‑ready profiles.
      </p>
    </main>
  );
}
