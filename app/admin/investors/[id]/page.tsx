"use server";

import { getPrisma } from "@/lib/db/prisma";
import { ScoringDAL } from "@/lib/dal/scoring";
import { classify } from "@/lib/scoring";
import Link from "next/link";

function statusColor(status: string) {
  switch (status) {
    case "ACTIVE":
      return "text-[#3CF46B] font-semibold";
    case "SUSPENDED":
      return "text-yellow-400 font-semibold";
    case "CLOSED":
      return "text-slate-400 font-semibold";
    default:
      return "text-slate-300";
  }
}

interface PageProps {
  params: {
    id: string;
  };
}

export default async function InvestorDetailPage({ params }: PageProps) {
  const prisma = await getPrisma();
  const investorId = params.id;

  // Fetch investor with full LOS context
  const investor = await prisma.investor.findUnique({
    where: { id: investorId },
    include: {
      fundingRequests: true,
      pricingSheets: true,
      allocations: {
        include: {
          mortgage: {
            include: {
              borrower: true,
              property: true,
              pricing: true,
              underwriting: true,
            },
          },
        },
      },
    },
  });

  if (!investor) {
    return (
      <main className="min-h-screen bg-slate-950 text-white p-6">
        <h1 className="text-2xl font-bold text-red-500">Investor not found</h1>
      </main>
    );
  }

  // Behavior scoring requires investor.userId
  if (!investor.userId) {
    return (
      <main className="min-h-screen bg-slate-950 text-white p-6">
        <h1 className="text-xl font-semibold">
          Investor has no associated user
        </h1>
      </main>
    );
  }

  // Fetch scoring history
  const scores = await ScoringDAL.getScoresForUser(String(investor.userId));
  const latest = scores.length > 0 ? scores[0] : null;

  const committed = investor.committedCapital ?? 0;
  const deployed = investor.deployedCapital ?? 0;

  return (
    <main className="min-h-screen bg-slate-950 text-white p-6 space-y-16">
      {/* HEADER */}
      <header>
        <h1 className="text-3xl font-bold text-[#3CF46B] mb-2">
          Investor: {investor.name}
        </h1>
        <p className="text-sm text-slate-400">
          Full investor profile, capital, allocations, pricing sheets, funding
          requests, and behavioral risk intelligence.
        </p>
      </header>

      {/* PROFILE */}
      <section>
        <h2 className="text-xl font-semibold mb-4">Profile</h2>

        <div className="bg-neutral-900 border border-neutral-700 rounded-xl p-6 space-y-3">
          <p><strong>Name:</strong> {investor.name}</p>
          <p><strong>Email:</strong> {investor.email ?? "—"}</p>
          <p><strong>Phone:</strong> {investor.phone ?? "—"}</p>
          <p>
            <strong>Status:</strong>{" "}
            <span className={statusColor(investor.status)}>
              {investor.status}
            </span>
          </p>
          <p>
            <strong>Committed Capital:</strong>{" "}
            ${committed.toLocaleString()}
          </p>
          <p>
            <strong>Deployed Capital:</strong>{" "}
            ${deployed.toLocaleString()}
          </p>
          <p>
            <strong>Created:</strong>{" "}
            {new Date(investor.createdAt).toLocaleString()}
          </p>
        </div>
      </section>

      {/* BEHAVIOR & RISK */}
      <section className="border border-slate-800 rounded-xl p-6 bg-slate-900/70">
        <h2 className="text-lg font-semibold mb-4">Behavior & Risk</h2>

        {!latest ? (
          <p className="text-slate-400 text-sm">No scoring data available.</p>
        ) : (
          <div className="space-y-3 text-sm text-slate-200">
            <div><strong>Fraud Score:</strong> {latest.fraudScore}</div>
            <div><strong>Risk Score:</strong> {latest.riskScore}</div>
            <div><strong>Impulsiveness Score:</strong> {latest.impulsivenessScore}</div>
            <div>
              <strong>Classification:</strong>{" "}
              {classify(latest.impulsivenessScore ?? 0, "INVESTOR")}
            </div>
            <div>
              <strong>Timestamp:</strong>{" "}
              {new Date(latest.createdAt).toLocaleString()}
            </div>

            <a
              href={`/admin/investors/${investorId}/behavior`}
              className="text-blue-400 hover:underline text-sm"
            >
              View full behavior history →
            </a>
          </div>
        )}
      </section>

      {/* FUNDING REQUESTS */}
      <section>
        <h2 className="text-xl font-semibold mb-4">Funding Requests</h2>

        <div className="space-y-4">
          {investor.fundingRequests.length === 0 && (
            <p className="text-sm text-slate-400">No funding requests found.</p>
          )}

          {investor.fundingRequests.map((req) => (
            <div
              key={req.id}
              className="bg-slate-800/60 p-6 rounded-xl border border-slate-700 flex flex-col md:flex-row md:justify-between gap-4"
            >
              <div>
                <h3 className="text-xl font-semibold">{req.type}</h3>

                <p className="text-slate-300 mt-2">
                  <strong>Amount:</strong> ${req.amount.toLocaleString()}
                </p>

                <p className="text-slate-300">
                  <strong>Status:</strong> {req.status}
                </p>

                <p className="text-slate-500 text-sm mt-1">
                  {req.createdAt.toDateString()}
                </p>
              </div>

              {req.status === "PENDING" && (
                <div className="flex items-center gap-3">
                  <form action="/api/admin/funding/approve" method="POST">
                    <input type="hidden" name="id" value={req.id} />
                    <button className="px-4 py-2 bg-green-600 hover:bg-green-500 text-white rounded-lg">
                      Approve
                    </button>
                  </form>

                  <form action="/api/admin/funding/reject" method="POST">
                    <input type="hidden" name="id" value={req.id} />
                    <button className="px-4 py-2 bg-red-600 hover:bg-red-500 text-white rounded-lg">
                      Reject
                    </button>
                  </form>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* PRICING SHEETS */}
      <section>
        <h2 className="text-xl font-semibold mb-4">Pricing Sheets</h2>

        <div className="space-y-4">
          {investor.pricingSheets.length === 0 && (
            <p className="text-sm text-slate-400">No pricing sheets uploaded.</p>
          )}

          {investor.pricingSheets.map((sheet) => (
            <div
              key={sheet.id}
              className="bg-neutral-900 border border-neutral-700 rounded-xl p-6"
            >
              <h3 className="text-lg font-semibold">Pricing Sheet</h3>

              <p className="text-slate-300 text-sm">
                Uploaded: {new Date(sheet.createdAt).toLocaleString()}
              </p>

              <p className="text-slate-400 text-sm mt-1">
                Rows: {sheet.rowCount}
              </p>

              <div className="flex gap-3 mt-4">
                <Link
                  href={`/admin/pricing/sheets/${sheet.id}`}
                  className="px-4 py-2 bg-neutral-700 rounded-md text-sm hover:bg-neutral-600 transition"
                >
                  View Sheet
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ALLOCATIONS */}
      <section>
        <h2 className="text-xl font-semibold mb-4">Allocations</h2>

        <div className="space-y-4">
          {investor.allocations.length === 0 && (
            <p className="text-sm text-slate-400">No allocations found.</p>
          )}

          {investor.allocations.map((alloc) => (
            <div
              key={alloc.id}
              className="bg-neutral-900 border border-neutral-700 rounded-xl p-6"
            >
              <h3 className="text-lg font-semibold">
                Loan #{alloc.mortgageId}
              </h3>

              <p className="text-slate-300 mt-2">
                <strong>Amount:</strong> ${alloc.amount.toLocaleString()}
              </p>

              <p className="text-slate-300">
                <strong>Borrower:</strong> {alloc.mortgage.borrower.fullName}
              </p>

              <p className="text-slate-300">
                <strong>Property:</strong> {alloc.mortgage.property.address}
              </p>

              <p className="text-slate-500 text-sm mt-1">
                {alloc.createdAt.toDateString()}
              </p>

              <div className="flex gap-3 mt-4">
                <Link
                  href={`/admin/mortgages/${alloc.mortgageId}`}
                  className="px-4 py-2 bg-neutral-700 rounded-md text-sm hover:bg-neutral-600 transition"
                >
                  View Loan
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
