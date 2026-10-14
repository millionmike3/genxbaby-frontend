
import { getPrisma } from "@/lib/db/prisma";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function BorrowerDocumentsPage() {
  const prisma = await getPrisma();

  // Borrower identity resolved via session/middleware
  const borrowerId = "CURRENT_BORROWER_ID";

  const borrower = await prisma.borrower.findUnique({
    where: { id: borrowerId },
    include: {
      requiredDocuments: {
        orderBy: { createdAt: "asc" },
      },
      loan: true,
    },
  });

  const docs = borrower.requiredDocuments;

  const completed = docs.filter((d) => d.uploadedAt);
  const pending = docs.filter((d) => !d.uploadedAt);

  const progressPercent =
    docs.length === 0
      ? 0
      : Math.round((completed.length / docs.length) * 100);

  return (
    <main className="min-h-screen bg-slate-950 text-white p-6 space-y-12">
      <h1 className="text-4xl font-bold text-[#3CF46B]">
        Upload Your Documents
      </h1>

      <p className="text-slate-300 text-sm">
        Uploading your documents quickly helps us finalize your approval faster.
      </p>

      {/* Progress Bar */}
      <section className="bg-neutral-900 border border-neutral-700 rounded-xl p-6">
        <h2 className="text-xl font-bold text-[#3CF46B] mb-2">
          Your Progress
        </h2>
        <p className="text-sm text-slate-300 mb-2">
          {progressPercent}% complete
        </p>
        <div className="w-full bg-slate-800 rounded-full h-3">
          <div
            className="bg-[#3CF46B] h-3 rounded-full"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </section>

      {/* Pending Documents */}
      <Section title="Documents Needed">
        {pending.length === 0 && (
          <Empty label="All required documents have been uploaded." />
        )}

        {pending.map((doc) => (
          <DocRow
            key={doc.id}
            name={doc.name}
            description={doc.description}
            status="Required"
            action={
              <Link
                href={`/borrower/documents/upload/${doc.id}`}
                className="text-[#3CF46B] underline"
              >
                Upload
              </Link>
            }
          />
        ))}
      </Section>

      {/* Completed Documents */}
      <Section title="Uploaded Documents">
        {completed.length === 0 && (
          <Empty label="You haven't uploaded any documents yet." />
        )}

        {completed.map((doc) => (
          <DocRow
            key={doc.id}
            name={doc.name}
            description={doc.description}
            status={doc.reviewStatus}
            action={
              <Link
                href={`/borrower/documents/view/${doc.id}`}
                className="text-slate-300 underline"
              >
                View
              </Link>
            }
            note={doc.underwriterNote}
          />
        ))}
      </Section>
    </main>
  );
}

function Section({ title, children }) {
  return (
    <section className="space-y-4">
      <h2 className="text-xl font-bold text-[#3CF46B]">{title}</h2>
      <div className="bg-neutral-900 border border-neutral-700 rounded-xl p-4 space-y-2">
        {children}
      </div>
    </section>
  );
}

function DocRow({ name, description, status, action, note }) {
  return (
    <div className="flex flex-col border-b border-neutral-800 pb-3 mb-3">
      <div className="flex justify-between items-center">
        <p className="text-sm font-semibold">{name}</p>
        <p className="text-xs text-slate-300">{status}</p>
      </div>

      {description && (
        <p className="text-xs text-slate-400 mt-1">{description}</p>
      )}

      {note && (
        <p className="text-xs text-red-400 mt-2">
          Underwriter Note: {note}
        </p>
      )}

      <div className="mt-2">{action}</div>
    </div>
  );
}

function Empty({ label }) {
  return <p className="text-xs text-slate-400">{label}</p>;
}
