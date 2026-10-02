import { getPrisma } from "@/lib/prisma";
import Link from "next/link";

export default async function ApplicationPage({ params }: { params: { applicationId: string } }) {
  const { applicationId } = params;

  const prisma = getPrisma();

  const application = await prisma.application.findUnique({
    where: { id: applicationId },
    include: {
      borrower: true,
      documents: true,
      disclosures: true,
      underwriting: true,
      timelineEvents: true,
      aiScoring: true,
    },
  });

  if (!application) {
    return (
      <div className="p-8 text-white">
        <h1 className="text-2xl font-bold mb-4">Application Not Found</h1>
        <Link href="/owner/applications" className="text-[#4EE38A] underline">
          Back to Applications
        </Link>
      </div>
    );
  }

  return (
    <div className="p-8 space-y-10 text-white">
      <h1 className="text-3xl font-bold text-[#4EE38A] mb-4">
        Application {application.id}
      </h1>

      {/* Borrower Info */}
      <div className="border border-slate-800 bg-slate-900 rounded-lg p-6 space-y-2">
        <h2 className="text-xl font-semibold">Borrower Information</h2>
        <p>Name: {application.borrower?.firstName} {application.borrower?.lastName}</p>
        <p>Email: {application.borrower?.email}</p>
      </div>

      {/* Status */}
      <div className="border border-slate-800 bg-slate-900 rounded-lg p-6 space-y-2">
        <h2 className="text-xl font-semibold">Status</h2>
        <p>{application.status}</p>
        <p>Updated: {new Date(application.updatedAt).toLocaleString()}</p>
      </div>

      {/* AI Scoring */}
      <div className="border border-slate-800 bg-slate-900 rounded-lg p-6 space-y-2">
        <h2 className="text-xl font-semibold">AI Scoring</h2>
        <p>Score: {application.aiScoring?.score ?? "N/A"}</p>
      </div>

      {/* Underwriting */}
      <div className="border border-slate-800 bg-slate-900 rounded-lg p-6 space-y-2">
        <h2 className="text-xl font-semibold">Underwriting</h2>
        {application.underwriting ? (
          <>
            <p>Decision: {application.underwriting.decision}</p>
            <p>Notes: {application.underwriting.notes}</p>
          </>
        ) : (
          <p>No underwriting case yet.</p>
        )}
      </div>

      {/* Documents */}
      <div className="border border-slate-800 bg-slate-900 rounded-lg p-6 space-y-2">
        <h2 className="text-xl font-semibold">Documents</h2>
        {application.documents.length === 0 ? (
          <p>No documents uploaded.</p>
        ) : (
          <ul className="list-disc ml-6">
            {application.documents.map((doc) => (
              <li key={doc.id}>{doc.name}</li>
            ))}
          </ul>
        )}
      </div>

      <Link href="/owner/applications" className="text-[#4EE38A] underline">
        Back to Applications
      </Link>
    </div>
  );
}
