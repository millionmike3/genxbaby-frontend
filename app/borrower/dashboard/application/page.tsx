import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function BorrowerApplicationHome() {
  return (
    <main className="min-h-screen bg-slate-950 text-white p-6 space-y-10">
      <header>
        <h1 className="text-3xl font-bold text-[#3CF46B]">
          Loan Application
        </h1>
        <p className="text-slate-400 text-sm">
          Complete each step to finish your loan application.
        </p>
      </header>

      <section className="space-y-4">
        {[
          { step: 1, label: "Borrower Information" },
          { step: 2, label: "Employment" },
          { step: 3, label: "Income" },
          { step: 4, label: "Assets" },
          { step: 5, label: "Declarations" },
          { step: 6, label: "Property Details" },
          { step: 7, label: "Loan Purpose" },
          { step: 8, label: "Review & Submit" },
        ].map((s) => (
          <Link
            key={s.step}
            href={`/borrower/application/step-${s.step}`}
            className="block bg-neutral-900 border border-neutral-700 rounded-xl p-4 hover:bg-neutral-800 transition"
          >
            <p className="text-slate-100 font-semibold">{s.label}</p>
            <p className="text-slate-500 text-xs">Step {s.step}</p>
          </Link>
        ))}
      </section>

      <Link
        href="/borrower"
        className="inline-block px-4 py-2 bg-neutral-700 rounded-md text-sm hover:bg-neutral-600 transition"
      >
        Back to Dashboard
      </Link>
    </main>
  );
}
