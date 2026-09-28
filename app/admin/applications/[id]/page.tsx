"use server";

import { getPrisma } from "@/lib/prisma";
import Link from "next/link";
import type { Prisma } from "@prisma/client";

type ApplicationWithRelations = Prisma.ApplicationGetPayload<{
  include: {
    borrower: true;
    documents: true;
    disclosures: true;
    underwriting: true;
    timeline: { orderBy: { createdAt: "desc" } };
  };
}>;

async function getApplication(id: string): Promise<ApplicationWithRelations | null> {
  const prisma = await getPrisma();

  return prisma.application.findUnique({
    where: { id },
    include: {
      borrower: true,
      documents: true,
      disclosures: true,
      underwriting: true,
      timeline: { orderBy: { createdAt: "desc" } },
    },
  });
}

export default async function AdminApplicationDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const app = await getApplication(params.id);

  if (!app) {
    return (
      <main className="min-h-screen bg-slate-950 text-white p-6">
        <h1 className="text-2xl font-bold mb-4">Application Not Found</h1>
      </main>
    );
  }

  const uw = app.underwriting;

  return (
    <main className="min-h-screen bg-slate-950 text-white p-6 space-y-10">
      {/* HEADER */}
      <section>
        <h1 className="text-3xl font-bold mb-2">Application {app.id}</h1>
        <p className="text-slate-400 text-sm">
          Borrower: {app.borrower.fullName} — {app.borrower.email}
        </p>
      </section>

      {/* ACTIONS */}
      <section className="flex gap-3">
        <form action="/api/underwriting/run" method="post">
          <input type="hidden" name="applicationId" value={app.id} />
          <button
            type="submit"
            className="px-4 py-2 rounded bg-slate-700 text-white text-sm font-semibold"
          >
            Run Auto‑UW
          </button>
        </form>

        <form action="/api/investor/pricing/run" method="post">
          <input type="hidden" name="applicationId" value={app.id} />
          <button
            type="submit"
            className="px-4 py-2 rounded bg-blue-600 text-white text-sm font-semibold"
          >
            Run Pricing
          </button>
        </form>

        <form action="/api/disclosures/generate" method="post">
          <input type="hidden" name="applicationId" value={app.id} />
          <button
            type="submit"
            className="px-4 py-2 rounded bg-green-600 text-black text-sm font-semibold"
          >
            Generate Disclosures
          </button>
        </form>
      </section>

      {/* UNDERWRITING SUMMARY */}
      <section>
        <h2 className="text-xl font-bold mb-3">Underwriting Summary</h2>

        {uw ? (
          <div className="border border-slate-800 rounded p-4 space-y-2 text-sm">
            {/* You can add UW fields here later */}
          </div>
        ) : (
          <p className="text-slate-400 text-sm">No underwriting case yet.</p>
        )}
      </section>
    </main>
  );
}
