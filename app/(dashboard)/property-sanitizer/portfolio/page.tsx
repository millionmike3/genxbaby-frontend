
import { getPrisma } from "@/lib/db/prisma";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function PortfolioSanitizerPage() {
  const prisma = await getPrisma();

  const userId = 0;

  const owner = await prisma.owner.findFirst({
    where: { userId },
    include: {
      properties: {
        include: {
          sanitizerReport: true,
        },
      },
    },
  });

  if (!owner) {
    return (
      <main className="min-h-screen bg-slate-950 text-white p-6">
        <h1 className="text-xl font-semibold">Owner not found</h1>
      </main>
    );
  }

  const properties = owner.properties;

  return (
    <main className="min-h-screen bg-slate-950 text-white p-6 space-y-12">
      <header>
        <h1 className="text-3xl font-bold text-[#3CF46B] mb-2">
          Portfolio Property Sanitizer
        </h1>
        <p className="text-sm text-slate-400">
          Analyze your entire property portfolio for risk and consistency.
        </p>
      </header>

      {/* PROPERTY LIST */}
      <section className="space-y-6">
        {properties.map((p) => (
          <div
            key={p.id}
            className="bg-neutral-900 border border-neutral-700 rounded-xl p-6 space-y-3"
          >
            <p className="text-slate-100 text-sm"><strong>Address:</strong> {p.address}</p>
            <p className="text-slate-300 text-sm"><strong>Type:</strong> {p.type}</p>

            {p.sanitizerReport ? (
              <>
                <p className="text-slate-300 text-sm">
                  <strong>Risk Score:</strong> {p.sanitizerReport.riskScore}
                </p>
                <p className="text-slate-300 text-sm">
                  <strong>Valuation Consistency:</strong> {p.sanitizerReport.valuationConsistency}
                </p>
              </>
            ) : (
              <p className="text-slate-400 text-sm">No sanitizer report yet.</p>
            )}

            <Link
              href={`/property-sanitizer/${p.id}`}
              className="inline-block px-4 py-2 bg-[#3CF46B] text-black rounded-md text-sm hover:bg-[#32d05f] transition"
            >
              View Sanitizer
            </Link>
          </div>
        ))}
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
