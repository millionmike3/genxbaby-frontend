"use server";

import { getPrisma } from "@/lib/db/prisma";
import Link from "next/link";

export default async function PropertySanitizerPage({ params }: any) {
  const prisma = await getPrisma();
  const propertyId = Number(params.propertyId);

  const property = await prisma.property.findUnique({
    where: { id: propertyId },
    include: {
      mortgage: true,
      owner: true,
      sanitizerReport: true,
    },
  });

  if (!property) {
    return (
      <main className="min-h-screen bg-slate-950 text-white p-6">
        <h1 className="text-xl font-semibold">Property not found</h1>
      </main>
    );
  }

  const report = property.sanitizerReport;

  return (
    <main className="min-h-screen bg-slate-950 text-white p-6 space-y-12">
      {/* HEADER */}
      <header>
        <h1 className="text-3xl font-bold text-[#3CF46B] mb-2">
          Property Sanitizer
        </h1>
        <p className="text-sm text-slate-400">
          Automated fraud, valuation, and consistency analysis.
        </p>
      </header>

      {/* PROPERTY SUMMARY */}
      <section className="bg-neutral-900 border border-neutral-700 rounded-xl p-6 space-y-3">
        <h2 className="text-xl font-semibold mb-3">Property Summary</h2>

        <p className="text-slate-300 text-sm">
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
      </section>

      {/* SANITIZER RESULTS */}
      <section className="bg-neutral-900 border border-neutral-700 rounded-xl p-6 space-y-6">
        <h2 className="text-xl font-semibold mb-3">Sanitizer Results</h2>

        {report ? (
          <>
            <p className="text-slate-300 text-sm">
              <strong>Risk Score:</strong> {report.riskScore}/100
            </p>

            <p className="text-slate-300 text-sm">
              <strong>Valuation Consistency:</strong>{" "}
              {report.valuationConsistency}
            </p>

            <p className="text-slate-300 text-sm">
              <strong>Occupancy Consistency:</strong>{" "}
              {report.occupancyConsistency}
            </p>

            <p className="text-slate-300 text-sm">
              <strong>Public Record Match:</strong>{" "}
              {report.publicRecordMatch}
            </p>

            <p className="text-slate-300 text-sm">
              <strong>MLS Match:</strong> {report.mlsMatch}
            </p>

            <p className="text-slate-300 text-sm">
              <strong>Fraud Signals:</strong>
            </p>

            <ul className="list-disc ml-6 text-slate-400 text-sm">
              {report.fraudSignals.map((signal: string, idx: number) => (
                <li key={idx}>{signal}</li>
              ))}
            </ul>
          </>
        ) : (
          <p className="text-slate-400 text-sm">
            No sanitizer report found. Run sanitizer below.
          </p>
        )}
      </section>

      {/* RUN SANITIZER BUTTON */}
      <section className="bg-neutral-900 border border-neutral-700 rounded-xl p-6">
        <form action={`/api/property-sanitizer/run`} method="POST">
          <input type="hidden" name="propertyId" value={propertyId} />
          <button className="px-6 py-3 bg-[#3CF46B] text-black font-semibold rounded-lg hover:bg-[#32d05f] transition w-full">
            Run Property Sanitizer
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
