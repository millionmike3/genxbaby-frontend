import { getPrisma } from "@/lib/db/prisma";
import Link from "next/link";

export const dynamic = "force-dynamic";

function statusColor(status: string) {
  switch (status) {
    case "OPEN":
      return "text-yellow-400 font-semibold";
    case "CLEARED":
      return "text-[#3CF46B] font-semibold";
    case "WAIVED":
      return "text-blue-400 font-semibold";
    default:
      return "text-slate-300";
  }
}

export default async function BorrowerConditionsPage() {
  const prisma = await getPrisma();

  // TODO: Replace with authenticated borrower userId
  const userId = 0;

  const borrower = await prisma.borrower.findFirst({
    where: { userId },
    include: {
      applications: {
        include: {
          documentRequirements: true,
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

  const application = borrower.applications[0];
  const conditions = application.documentRequirements;

  return (
    <main className="min-h-screen bg-slate-950 text-white p-6 space-y-12">
      {/* HEADER */}
      <header>
        <h1 className="text-3xl font-bold text-[#3CF46B] mb-2">
          Your Conditions
        </h1>
        <p className="text-sm text-slate-400">
          Review and respond to underwriting conditions required for loan approval.
        </p>
      </header>

      {/* CONDITIONS LIST */}
      <section className="bg-neutral-900 border border-neutral-700 rounded-xl p-6 space-y-6">
        <h2 className="text-xl font-semibold mb-4">Outstanding Conditions</h2>

        {conditions.length === 0 ? (
          <p className="text-slate-400 text-sm">You have no conditions at this time.</p>
        ) : (
          <div className="space-y-6">
            {conditions.map((c) => (
              <div
                key={c.id}
                className="border border-neutral-800 rounded-lg p-4 space-y-3 bg-neutral-800/40"
              >
                {/* Condition Text */}
                <div className="flex justify-between items-center">
                  <p className="text-slate-100 text-sm">{c.requirement}</p>
                  <span className={statusColor(c.status)}>{c.status}</span>
                </div>

                {/* Underwriter Notes */}
                {c.notes && (
                  <p className="text-slate-400 text-xs">
                    <strong>Notes:</strong> {c.notes}
                  </p>
                )}

                {/* Upload Response */}
                {c.status === "OPEN" && (
                  <form
                    action="/api/borrower/conditions/respond"
                    method="POST"
                    encType="multipart/form-data"
                    className="space-y-3"
                  >
                    <input type="hidden" name="conditionId" value={c.id} />

                    <div className="flex flex-col">
                      <label className="text-sm text-slate-400 mb-1">
                        Upload Response
                      </label>
                      <input
                        type="file"
                        name="file"
                        required
                        className="bg-slate-800 text-white px-3 py-2 rounded-md"
                      />
                    </div>

                    <button className="px-4 py-2 bg-[#3CF46B] text-black rounded-md font-semibold hover:bg-[#32d05f] transition">
                      Submit Response
                    </button>
                  </form>
                )}

                {/* Cleared / Waived */}
                {c.status !== "OPEN" && (
                  <p className="text-slate-400 text-xs">
                    This condition has been {c.status.toLowerCase()}.
                  </p>
                )}
              </div>
            ))}
          </div>
        )}
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
