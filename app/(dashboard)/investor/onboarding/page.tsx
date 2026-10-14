import { getPrisma } from "@/lib/db/prisma";
import Link from "next/link";

export default async function InvestorOnboardingPage() {
  const prisma = await getPrisma();

  // TODO: Replace with authenticated investor userId
  const userId = 0;

 const investor = await prisma.investor.findFirst({
  where: { userId },
});


  return (
    <main className="min-h-screen bg-slate-950 text-white p-6 space-y-12">
      {/* HEADER */}
      <header>
        <h1 className="text-3xl font-bold text-[#3CF46B] mb-2">
          Investor Onboarding
        </h1>
        <p className="text-sm text-slate-400">
          Complete onboarding to activate your Investor Portal.
        </p>
      </header>

      {/* EXISTING INFO */}
      {investor && (
        <section className="bg-neutral-900 border border-neutral-700 rounded-xl p-6 space-y-3">
          <h2 className="text-xl font-semibold mb-3">Your Information</h2>

          <p className="text-slate-300 text-sm">
            <strong>Name:</strong> {investor.fullName}
          </p>

          <p className="text-slate-300 text-sm">
            <strong>Email:</strong> {investor.email}
          </p>

          <p className="text-slate-300 text-sm">
            <strong>Phone:</strong> {investor.phone}
          </p>

          <p className="text-slate-300 text-sm">
            <strong>Accredited:</strong> {investor.accredited ? "Yes" : "No"}
          </p>
        </section>
      )}

      {/* ONBOARDING FORM */}
      <section className="bg-neutral-900 border border-neutral-700 rounded-xl p-6 space-y-6">
        <h2 className="text-xl font-semibold mb-3">Complete Onboarding</h2>

        <form
          action="/api/investor/onboarding"
          method="POST"
          encType="multipart/form-data"
          className="space-y-6"
        >
          {/* Full Name */}
          <div className="flex flex-col">
            <label className="text-sm text-slate-400 mb-1">Full Name</label>
            <input
              type="text"
              name="fullName"
              defaultValue={investor?.fullName ?? ""}
              required
              className="bg-slate-800 text-white px-3 py-2 rounded-md"
            />
          </div>

          {/* Email */}
          <div className="flex flex-col">
            <label className="text-sm text-slate-400 mb-1">Email</label>
            <input
              type="email"
              name="email"
              defaultValue={investor?.email ?? ""}
              required
              className="bg-slate-800 text-white px-3 py-2 rounded-md"
            />
          </div>

          {/* Phone */}
          <div className="flex flex-col">
            <label className="text-sm text-slate-400 mb-1">Phone</label>
            <input
              type="text"
              name="phone"
              defaultValue={investor?.phone ?? ""}
              required
              className="bg-slate-800 text-white px-3 py-2 rounded-md"
            />
          </div>

          {/* Accreditation */}
          <div className="flex flex-col">
            <label className="text-sm text-slate-400 mb-1">
              Are you an accredited investor?
            </label>
            <select
              name="accredited"
              required
              defaultValue={investor?.accredited ? "yes" : "no"}
              className="bg-slate-800 text-white px-3 py-2 rounded-md"
            >
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>
          </div>

          {/* Investment Profile */}
          <div className="flex flex-col">
            <label className="text-sm text-slate-400 mb-1">
              Investment Profile
            </label>
            <select
              name="profile"
              required
              defaultValue={investor?.profile ?? ""}
              className="bg-slate-800 text-white px-3 py-2 rounded-md"
            >
              <option value="">Choose profile…</option>
              <option value="CONSERVATIVE">Conservative</option>
              <option value="BALANCED">Balanced</option>
              <option value="AGGRESSIVE">Aggressive</option>
            </select>
          </div>

          {/* Initial Capital Commitment */}
          <div className="flex flex-col">
            <label className="text-sm text-slate-400 mb-1">
              Initial Capital Commitment (optional)
            </label>
            <input
              type="number"
              name="initialCommitment"
              defaultValue={investor?.initialCommitment ?? ""}
              min={0}
              className="bg-slate-800 text-white px-3 py-2 rounded-md"
              placeholder="Enter amount"
            />
          </div>

          {/* KYC Document */}
          <div className="flex flex-col">
            <label className="text-sm text-slate-400 mb-1">
              Upload KYC Document (ID, Passport, etc.)
            </label>
            <input
              type="file"
              name="kycDoc"
              required
              className="bg-slate-800 text-white px-3 py-2 rounded-md"
            />
          </div>

          <button className="px-6 py-3 bg-[#3CF46B] text-black font-semibold rounded-lg hover:bg-[#32d05f] transition">
            Complete Onboarding
          </button>
        </form>
      </section>

      <Link
        href="/investor"
        className="inline-block px-4 py-2 bg-neutral-700 rounded-md text-sm hover:bg-neutral-600 transition"
      >
        Back to Investor Portal
      </Link>
    </main>
  );
}
