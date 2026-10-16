
import { getPrisma } from "@/lib/db/prisma";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function OwnerOnboardingPage() {
  const prisma = await getPrisma();

  // TODO: Replace with authenticated owner userId
  const userId = 0;

  const owner = await prisma.owner.findFirst({
    where: { userId },
  });

  return (
    <main className="min-h-screen bg-slate-950 text-white p-6 space-y-12">
      {/* HEADER */}
      <header>
        <h1 className="text-3xl font-bold text-[#3CF46B] mb-2">
          Owner Onboarding
        </h1>
        <p className="text-sm text-slate-400">
          Complete your onboarding to access your Owner Portal.
        </p>
      </header>

      {/* EXISTING INFO */}
      {owner && (
        <section className="bg-neutral-900 border border-neutral-700 rounded-xl p-6 space-y-3">
          <h2 className="text-xl font-semibold mb-3">Your Information</h2>
          <p className="text-slate-300 text-sm"><strong>Name:</strong> {owner.fullName}</p>
          <p className="text-slate-300 text-sm"><strong>Email:</strong> {owner.email}</p>
          <p className="text-slate-300 text-sm"><strong>Phone:</strong> {owner.phone}</p>
        </section>
      )}

      {/* ONBOARDING FORM */}
      <section className="bg-neutral-900 border border-neutral-700 rounded-xl p-6 space-y-6">
        <h2 className="text-xl font-semibold mb-3">Complete Onboarding</h2>

        <form
          action="/api/owner/onboarding"
          method="POST"
          className="space-y-6"
        >
          {/* Full Name */}
          <div className="flex flex-col">
            <label className="text-sm text-slate-400 mb-1">Full Name</label>
            <input
              type="text"
              name="fullName"
              defaultValue={owner?.fullName ?? ""}
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
              defaultValue={owner?.email ?? ""}
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
              defaultValue={owner?.phone ?? ""}
              required
              className="bg-slate-800 text-white px-3 py-2 rounded-md"
            />
          </div>

          {/* Ownership Verification */}
          <div className="flex flex-col">
            <label className="text-sm text-slate-400 mb-1">
              Upload Ownership Document (Deed, Closing Docs, etc.)
            </label>
            <input
              type="file"
              name="ownershipDoc"
              required
              className="bg-slate-800 text-white px-3 py-2 rounded-md"
            />
          </div>

          {/* Optional: Add First Property */}
          <div className="flex flex-col">
            <label className="text-sm text-slate-400 mb-1">
              Primary Property Address (optional)
            </label>
            <input
              type="text"
              name="propertyAddress"
              placeholder="123 Main St, City, State"
              className="bg-slate-800 text-white px-3 py-2 rounded-md"
            />
          </div>

          <button className="px-6 py-3 bg-[#3CF46B] text-black font-semibold rounded-lg hover:bg-[#32d05f] transition">
            Complete Onboarding
          </button>
        </form>
      </section>

      <Link
        href="/owner"
        className="inline-block px-4 py-2 bg-neutral-700 rounded-md text-sm hover:bg-neutral-600 transition"
      >
        Back to Owner Portal
      </Link>
    </main>
  );
}
