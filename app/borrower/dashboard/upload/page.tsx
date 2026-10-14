import { getPrisma } from "@/lib/db/prisma";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function BorrowerUploadPage() {
  const prisma = await getPrisma();

  // TODO: Replace with authenticated borrower userId
  const userId = 0;

  const borrower = await prisma.borrower.findFirst({
    where: { userId },
    include: {
      applications: true,
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
  const applicationId = application.id;

  return (
    <main className="min-h-screen bg-slate-950 text-white p-6 space-y-12">
      <header>
        <h1 className="text-3xl font-bold text-[#3CF46B] mb-2">
          Upload Documents
        </h1>
        <p className="text-sm text-slate-400">
          Upload required documents to complete your loan application.
        </p>
      </header>

      <section className="bg-neutral-900 border border-neutral-700 rounded-xl p-6 space-y-6">
        <form
          action="/api/borrower/documents/upload"
          method="POST"
          encType="multipart/form-data"
          className="space-y-4"
        >
          <input type="hidden" name="applicationId" value={applicationId} />

          <div className="flex flex-col">
            <label className="text-sm text-slate-400 mb-1">Select File</label>
            <input
              type="file"
              name="file"
              required
              className="bg-slate-800 text-white px-3 py-2 rounded-md"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-sm text-slate-400 mb-1">Document Type</label>
            <select
              name="type"
              required
              className="bg-slate-800 text-white px-3 py-2 rounded-md"
            >
              <option value="">Choose type…</option>
              <option value="ID">Identification</option>
              <option value="INCOME">Income Document</option>
              <option value="BANK">Bank Statement</option>
              <option value="TAX">Tax Return</option>
              <option value="OTHER">Other</option>
            </select>
          </div>

          <button className="px-6 py-3 bg-[#3CF46B] text-black font-semibold rounded-lg hover:bg-[#32d05f] transition">
            Upload Document
          </button>
        </form>
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
