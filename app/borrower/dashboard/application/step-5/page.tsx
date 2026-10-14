import { getPrisma } from "@/lib/db/prisma";
import Link from "next/link";

export const dynamic = "force-dynamic";

const QUESTIONS = [
  { id: "bankruptcy", label: "Have you declared bankruptcy in the past 7 years?" },
  { id: "foreclosure", label: "Have you had a property foreclosed in the past 7 years?" },
  { id: "lawsuit", label: "Are you currently involved in a lawsuit?" },
  { id: "delinquent", label: "Are you currently delinquent on any federal debt?" },
  { id: "alimony", label: "Do you pay alimony or child support?" },
  { id: "coBorrower", label: "Will there be a co‑borrower on this loan?" },
];

export default async function Step5Declarations() {
  const prisma = await getPrisma();

  // TODO: Replace with authenticated borrower userId
  const userId = 0;

  const borrower = await prisma.borrower.findFirst({
    where: { userId },
    include: {
      declarations: true,
    },
  });

  const existing = borrower?.declarations ?? [];

  return (
    <main className="min-h-screen bg-slate-950 text-white p-6 space-y-10">
      {/* HEADER */}
      <header>
        <h1 className="text-2xl font-bold text-[#3CF46B]">
          Step 5 — Declarations
        </h1>
        <p className="text-slate-400 text-sm">
          Answer the following questions truthfully. These are required for underwriting.
        </p>
      </header>

      {/* EXISTING DECLARATIONS */}
      {existing.length > 0 && (
        <section className="space-y-4">
          <h2 className="text-lg font-semibold">Your Answers</h2>

          {existing.map((dec) => (
            <div
              key={dec.id}
              className="bg-neutral-900 border border-neutral-700 rounded-xl p-4 space-y-2"
            >
              <p className="text-slate-100 text-sm">
                <strong>{dec.question}</strong>
              </p>
              <p className="text-slate-300 text-sm">
                Answer: {dec.answer ? "Yes" : "No"}
              </p>
            </div>
          ))}
        </section>
      )}

      {/* DECLARATIONS FORM */}
      <section className="bg-neutral-900 border border-neutral-700 rounded-xl p-6 space-y-6">
        <h2 className="text-xl font-semibold mb-3">Answer Declarations</h2>

        <form
          action="/api/borrower/application/step-5"
          method="POST"
          className="space-y-6"
        >
          {QUESTIONS.map((q) => (
            <div key={q.id} className="flex flex-col">
              <label className="text-sm text-slate-300 mb-2">{q.label}</label>

              <select
                name={q.id}
                required
                className="bg-slate-800 text-white px-3 py-2 rounded-md"
              >
                <option value="">Select…</option>
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </select>
            </div>
          ))}

          <button className="px-6 py-3 bg-[#3CF46B] text-black font-semibold rounded-lg hover:bg-[#32d05f] transition">
            Save & Continue
          </button>
        </form>
      </section>

      <Link
        href="/borrower/application"
        className="inline-block px-4 py-2 bg-neutral-700 rounded-md text-sm hover:bg-neutral-600 transition"
      >
        Back to Steps
      </Link>
    </main>
  );
}
