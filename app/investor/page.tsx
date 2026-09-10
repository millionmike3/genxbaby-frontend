"use client";

export default function InvestorPortalPage() {
  return (
    <main className="px-6 md:px-12 lg:px-20 py-16 text-white bg-slate-900">
        <img 
  src="/images/investor.jpg" 
  alt="Investor Portal" 
  className="w-full max-w-4xl rounded-xl mb-10"
/>

      <h1 className="text-4xl font-bold mb-6">Investor Portal</h1>

      <p className="text-slate-300 leading-relaxed mb-6">
        This is where GenXBaby feels like a weapon—built for serious investors who want speed, clarity, and edge.
      </p>

      <h2 className="text-2xl font-semibold mt-10 mb-4">Core Purpose</h2>
      <p className="text-slate-300 leading-relaxed">
        Give investors real‑time deal intelligence, comps, underwriting metrics, and lender fit—without spreadsheets or guesswork.
      </p>

      <h2 className="text-2xl font-semibold mt-10 mb-4">Key Capabilities</h2>
      <ul className="list-disc pl-6 text-slate-300 leading-relaxed space-y-3">
        <li>
          <strong>Deal intake & property analysis:</strong> Upload or enter property details; GenXBaby runs comps, ARV, DSCR, NOI, cap rate, rent comps, and market risk scoring.
        </li>
        <li>
          <strong>Investment strategy alignment:</strong> Tailored metrics for fix & flip, buy & hold, BRRRR, wholesale, commercial acquisition.
        </li>
        <li>
          <strong>Lender suitability scoring:</strong> Matches deals with lender profiles and approval likelihood.
        </li>
        <li>
          <strong>Portfolio analytics:</strong> Track performance, risk exposure, cash flow, returns, leverage.
        </li>
        <li>
          <strong>Certified check & proof‑of‑funds integration:</strong> Blockchain‑anchored financial instruments.
        </li>
      </ul>

      <h2 className="text-2xl font-semibold mt-10 mb-4">Behavioral Intelligence</h2>
      <ul className="list-disc pl-6 text-slate-300 leading-relaxed space-y-3">
        <li>Deal selection behavior tracking.</li>
        <li>Risk tolerance profiling: Conservative → Speculative.</li>
        <li>Underwriting & lender signals based on investor behavior.</li>
      </ul>

      <h2 className="text-2xl font-semibold mt-10 mb-4">Why This Matters</h2>
      <p className="text-slate-300 leading-relaxed">
        The investor portal turns GenXBaby into a real estate intelligence platform—not just a mortgage tool.
      </p>
    </main>
  );
}
