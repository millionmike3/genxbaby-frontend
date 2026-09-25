"use client";

import Image from "next/image";
import Link from "next/link";

export default function BorrowPage() {
  return (
    <section className="px-6 py-20 max-w-4xl mx-auto text-slate-200">
      <Image
        src="/images/borrow.jpg"
        alt="Borrow with GenXBaby"
        width={1600}
        height={900}
        className="rounded-xl mb-10"
      />

      <h1 className="text-4xl font-bold mb-6 text-white">
        Applying for Financing Through GenXBaby
      </h1>

      <p className="text-lg leading-relaxed mb-10">
        A smarter, faster, and more transparent way to qualify for funding.
        GenXBaby is a next‑generation financial intelligence platform designed
        to help you secure financing with clarity, confidence, and speed.
        Whether you’re purchasing a home, investing in real estate, acquiring
        commercial property, or seeking alternative financing options,
        GenXBaby gives you a streamlined experience backed by real‑time
        underwriting and behavioral intelligence.
      </p>

      {/* --- FULL BORROWER TEXT GOES HERE --- */}
      <div className="space-y-8 text-slate-300 leading-relaxed">
        <h2 className="text-2xl font-semibold text-white">
          Why Apply for Financing Through GenXBaby?
        </h2>

        <h3 className="text-xl font-semibold text-white">
          1. Real‑Time Qualification Insights
        </h3>
        <ul className="list-disc ml-6">
          <li>Approval likelihood</li>
          <li>Recommended loan types</li>
          <li>Required documents</li>
          <li>Estimated timelines</li>
          <li>Next steps</li>
        </ul>

        <h3 className="text-xl font-semibold text-white">
          2. Smart Loan‑Type Matching
        </h3>
        <ul className="list-disc ml-6">
          <li>Conventional Loans</li>
          <li>FHA Loans</li>
          <li>Non‑QM Loans</li>
          <li>Hard Money Loans</li>
          <li>DSCR Investor Loans</li>
          <li>Commercial Financing</li>
          <li>Nonprofit Acquisition Financing</li>
        </ul>

        <h3 className="text-xl font-semibold text-white">
          3. Intelligent Borrower Evaluation
        </h3>
        <ul className="list-disc ml-6">
          <li>Income</li>
          <li>Employment</li>
          <li>Assets</li>
          <li>Liabilities</li>
          <li>Credit behavior</li>
          <li>Property goals</li>
        </ul>

        <h3 className="text-xl font-semibold text-white">
          4. Behavioral Intelligence for Faster Approvals
        </h3>
        <ul className="list-disc ml-6">
          <li>Response consistency</li>
          <li>Accuracy of information</li>
          <li>Completion speed</li>
          <li>Decision patterns</li>
        </ul>

        <h3 className="text-xl font-semibold text-white">
          5. Secure Identity Vault & Fraud Protection
        </h3>
        <ul className="list-disc ml-6">
          <li>Multi‑layer verification</li>
          <li>Fraud signal detection</li>
          <li>Document authenticity scoring</li>
          <li>Encrypted storage</li>
        </ul>

        <h3 className="text-xl font-semibold text-white">
          6. Automated Underwriting for Speed
        </h3>

        <h3 className="text-xl font-semibold text-white">
          7. A Guided, Stress‑Free Application Experience
        </h3>

        <h2 className="text-2xl font-semibold text-white">
          What You Need to Apply
        </h2>

        <ul className="list-disc ml-6">
          <li>Government ID</li>
          <li>Pay stubs</li>
          <li>W‑2s or tax returns</li>
          <li>Bank statements</li>
          <li>Employment details</li>
          <li>Property information</li>
        </ul>

        <h2 className="text-2xl font-semibold text-white">
          Who Can Apply Through GenXBaby?
        </h2>

        <ul className="list-disc ml-6">
          <li>First‑time homebuyers</li>
          <li>Repeat buyers</li>
          <li>Refinancers</li>
          <li>Real estate investors</li>
          <li>Commercial buyers</li>
          <li>Nonprofit acquisition teams</li>
          <li>Alternative financing borrowers</li>
        </ul>

        <h2 className="text-2xl font-semibold text-white">
          What Happens After You Apply?
        </h2>

        <ol className="list-decimal ml-6">
          <li>Your financial profile is analyzed in real time</li>
          <li>Behavior Intelligence scores your application behavior</li>
          <li>Underwriting engine evaluates your loan options</li>
          <li>You receive qualification signals</li>
          <li>A lender or owner reviews your file</li>
          <li>You move toward conditional approval</li>
        </ol>

        <h2 className="text-2xl font-semibold text-white">
          Why Borrowers Trust GenXBaby
        </h2>

        <ul className="list-disc ml-6">
          <li>Faster qualification</li>
          <li>Smarter loan matching</li>
          <li>Clear communication</li>
          <li>Strong fraud protection</li>
          <li>Real‑time underwriting</li>
          <li>Modern, intuitive experience</li>
          <li>Transparent decisioning</li>
        </ul>
      </div>

      {/* APPLY BUTTON */}
      <div className="mt-12">
        <Link
          href="/application"
          className="px-8 py-4 bg-[#3CF46B] text-black font-bold rounded-full text-lg"
        >
          Apply Now
        </Link>
      </div>
    </section>
  );
}
