import { getPrisma } from "@/lib/db/prisma";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function Step2Employment() {
  const prisma = await getPrisma();

  // TODO: Replace with authenticated borrower userId
  const userId = 0;

  const borrower = await prisma.borrower.findUnique({
    where: { userId },
    include: {
      employment: true,
    },
  });

  const employment = borrower?.employment ?? [];

  return (
    <main className="min-h-screen bg-slate-950 text-white p-6 space-y-10">
      {/* HEADER */}
      <header>
        <h1 className="text-2xl font-bold text-[#3CF46B]">
          Step 2 — Employment
        </h1>
        <p className="text-slate-400 text-sm">
          Tell us about your current and past employment.
        </p>
      </header>

      {/* EXISTING EMPLOYMENT LIST */}
      {employment.length > 0 && (
        <section className="space-y-4">
          <h2 className="text-lg font-semibold">Your Employment History</h2>

          {employment.map((job) => (
            <div
              key={job.id}
              className="bg-neutral-900 border border-neutral-700 rounded-xl p-4 space-y-2"
            >
              <p className="text-slate-100 text-sm">
                <strong>Employer:</strong> {job.employerName}
              </p>
              <p className="text-slate-300 text-sm">
                <strong>Position:</strong> {job.position}
              </p>
              <p className="text-slate-300 text-sm">
                <strong>Start:</strong>{" "}
                {new Date(job.startDate).toLocaleDateString()}
              </p>
              <p className="text-slate-300 text-sm">
                <strong>End:</strong>{" "}
                {job.endDate
                  ? new Date(job.endDate).toLocaleDateString()
                  : "Present"}
              </p>
            </div>
          ))}
        </section>
      )}

      {/* ADD EMPLOYMENT FORM */}
      <section className="bg-neutral-900 border border-neutral-700 rounded-xl p-6 space-y-6">
        <h2 className="text-xl font-semibold mb-3">Add Employment</h2>

        <form
          action="/api/borrower/application/step-2"
          method="POST"
          className="space-y-6"
        >
          <div className="flex flex-col">
            <label className="text-sm text-slate-400 mb-1">Employer Name</label>
            <input
              type="text"
              name="employerName"
              required
              className="bg-slate-800 text-white px-3 py-2 rounded-md"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-sm text-slate-400 mb-1">Position</label>
            <input
              type="text"
              name="position"
              required
              className="bg-slate-800 text-white px-3 py-2 rounded-md"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-sm text-slate-400 mb-1">Start Date</label>
            <input
              type="date"
              name="startDate"
              required
              className="bg-slate-800 text-white px-3 py-2 rounded-md"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-sm text-slate-400 mb-1">
              End Date (optional)
            </label>
            <input
              type="date"
              name="endDate"
              className="bg-slate-800 text-white px-3 py-2 rounded-md"
            />
          </div>

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
