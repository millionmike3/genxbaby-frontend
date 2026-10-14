import { getPrisma } from "@/lib/db/prisma";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function Step1BorrowerInfo() {
  const prisma = await getPrisma();

  const userId = 0;

  const borrower = await prisma.borrower.findFirst({
    where: { userId },
  });

  return (
    <main className="min-h-screen bg-slate-950 text-white p-6 space-y-10">
      <header>
        <h1 className="text-2xl font-bold text-[#3CF46B]">
          Step 1 — Borrower Information
        </h1>
        <p className="text-slate-400 text-sm">Tell us about yourself.</p>
      </header>

      <form
        action="/api/borrower/application/step-1"
        method="POST"
        className="space-y-6 bg-neutral-900 border border-neutral-700 rounded-xl p-6"
      >
        <div className="flex flex-col">
          <label className="text-sm text-slate-400 mb-1">Full Name</label>
          <input
            type="text"
            name="fullName"
            defaultValue={borrower?.fullName ?? ""}
            required
            className="bg-slate-800 text-white px-3 py-2 rounded-md"
          />
        </div>

        <div className="flex flex-col">
          <label className="text-sm text-slate-400 mb-1">Phone</label>
          <input
            type="text"
            name="phone"
            defaultValue={borrower?.phone ?? ""}
            required
            className="bg-slate-800 text-white px-3 py-2 rounded-md"
          />
        </div>

        <div className="flex flex-col">
          <label className="text-sm text-slate-400 mb-1">Email</label>
          <input
            type="email"
            name="email"
            defaultValue={borrower?.email ?? ""}
            required
            className="bg-slate-800 text-white px-3 py-2 rounded-md"
          />
        </div>

        <button className="px-6 py-3 bg-[#3CF46B] text-black font-semibold rounded-lg hover:bg-[#32d05f] transition">
          Save & Continue
        </button>
      </form>

      <Link
        href="/borrower/application"
        className="inline-block px-4 py-2 bg-neutral-700 rounded-md text-sm hover:bg-neutral-600 transition"
      >
        Back to Steps
      </Link>
    </main>
  );
}
