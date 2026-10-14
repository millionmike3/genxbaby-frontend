"use server";

import { getPrisma } from "@/lib/db/prisma";
import Link from "next/link";

export default async function Step6PropertyDetails() {
  const prisma = await getPrisma();

  // TODO: Replace with authenticated borrower userId
  const userId = 0;

  const borrower = await prisma.borrower.findFirst({
    where: { userId },
    include: {
      applications: {
        include: {
          borrowerProperty: true,
        },
      },
    },
  });

  if (!borrower || borrower.applications.length === 0) {
    return (
      <main className="min-h-screen bg-slate-950 text-white p-6">
        <h1 className="text-xl font-semibold">No active application found</h1>
      </main>
    );
  }

  // Active loan = most recent application
  const application = borrower.applications[0];
  const property = application.borrowerProperty?.[0] ?? null;

  return (
    <main className="min-h-screen bg-slate-950 text-white p-6 space-y-10">
      {/* HEADER */}
      <header>
        <h1 className="text-2xl font-bold text-[#3CF46B]">
          Step 6 — Property Details
        </h1>
        <p className="text-slate-400 text-sm">
          Tell us about the property you are buying or refinancing.
        </p>
      </header>

      {/* EXISTING PROPERTY DETAILS */}
      {property && (
        <section className="space-y-4">
          <h2 className="text-lg font-semibold">Current Property Info</h2>

          <div className="bg-neutral-900 border border-neutral-700 rounded-xl p-4 space-y-2">
            <p className="text-slate-100 text-sm">
              <strong>Address:</strong> {property.address}
            </p>

            <p className="text-slate-300 text-sm">
              <strong>Type:</strong> {property.type}
            </p>

            <p className="text-slate-300 text-sm">
              <strong>Occupancy:</strong> {property.occupancy}
            </p>

            <p className="text-slate-300 text-sm">
              <strong>Estimated Value:</strong>{" "}
              ${property.estimatedValue?.toLocaleString()}
            </p>
          </div>
        </section>
      )}

      {/* PROPERTY FORM */}
      <section className="bg-neutral-900 border border-neutral-700 rounded-xl p-6 space-y-6">
        <h2 className="text-xl font-semibold mb-3">Update Property Details</h2>

        <form
          action="/api/borrower/application/step-6"
          method="POST"
          className="space-y-6"
        >
          {/* Address */}
          <div className="flex flex-col">
            <label className="text-sm text-slate-400 mb-1">
              Property Address
            </label>
            <input
              type="text"
              name="address"
              defaultValue={property?.address ?? ""}
              required
              className="bg-slate-800 text-white px-3 py-2 rounded-md"
            />
          </div>

          {/* Property Type */}
          <div className="flex flex-col">
            <label className="text-sm text-slate-400 mb-1">Property Type</label>
            <select
              name="type"
              required
              defaultValue={property?.type ?? ""}
              className="bg-slate-800 text-white px-3 py-2 rounded-md"
            >
              <option value="">Choose type…</option>
              <option value="SFR">Single‑Family Residence</option>
              <option value="CONDO">Condo</option>
              <option value="TOWNHOME">Townhome</option>
              <option value="MULTI_2">2‑Unit</option>
              <option value="MULTI_3">3‑Unit</option>
              <option value="MULTI_4">4‑Unit</option>
            </select>
          </div>

          {/* Occupancy */}
          <div className="flex flex-col">
            <label className="text-sm text-slate-400 mb-1">Occupancy</label>
            <select
              name="occupancy"
              required
              defaultValue={property?.occupancy ?? ""}
              className="bg-slate-800 text-white px-3 py-2 rounded-md"
            >
              <option value="">Choose occupancy…</option>
              <option value="PRIMARY">Primary Residence</option>
              <option value="SECONDARY">Second Home</option>
              <option value="INVESTMENT">Investment Property</option>
            </select>
          </div>

          {/* Estimated Value */}
          <div className="flex flex-col">
            <label className="text-sm text-slate-400 mb-1">
              Estimated Value
            </label>
            <input
              type="number"
              name="estimatedValue"
              defaultValue={property?.estimatedValue ?? ""}
              required
              min={0}
              className="bg-slate-800 text-white px-3 py-2 rounded-md"
            />
          </div>

          {/* Beds */}
          <div className="flex flex-col">
            <label className="text-sm text-slate-400 mb-1">Bedrooms</label>
            <input
              type="number"
              name="beds"
              defaultValue={property?.beds ?? ""}
              min={0}
              className="bg-slate-800 text-white px-3 py-2 rounded-md"
            />
          </div>

          {/* Baths */}
          <div className="flex flex-col">
            <label className="text-sm text-slate-400 mb-1">Bathrooms</label>
            <input
              type="number"
              name="baths"
              defaultValue={property?.baths ?? ""}
              min={0}
              step="0.5"
              className="bg-slate-800 text-white px-3 py-2 rounded-md"
            />
          </div>

          {/* Sqft */}
          <div className="flex flex-col">
            <label className="text-sm text-slate-400 mb-1">
              Square Footage
            </label>
            <input
              type="number"
              name="sqft"
              defaultValue={property?.sqft ?? ""}
              min={0}
              className="bg-slate-800 text-white px-3 py-2 rounded-md"
            />
          </div>

          {/* Year Built */}
          <div className="flex flex-col">
            <label className="text-sm text-slate-400 mb-1">Year Built</label>
            <input
              type="number"
              name="yearBuilt"
              defaultValue={property?.yearBuilt ?? ""}
              min={1800}
              max={2100}
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
