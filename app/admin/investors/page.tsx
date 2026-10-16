import { Suspense } from "react";
import { getPrisma } from "@/lib/db/prisma";
import Link from "next/link";

export const dynamic = "force-dynamic";

// -----------------------------
// Status Color Helper
// -----------------------------
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

// -----------------------------
// Fetch admin token from API route
// -----------------------------
async function getAdminToken() {
  const base =
    process.env.NEXT_PUBLIC_BASE_URL ??
    process.env.VERCEL_URL ??
    "http://localhost:3000";

  const url = new URL("/api/admin/token", base);

  const res = await fetch(url.toString(), { cache: "no-store" });

  // If the route failed, log the body so we can see the real error
  if (!res.ok) {
    console.error("Token API failed:", await res.text());
    return null;
  }

  const json = await res.json();
  return json.token;
}

// -----------------------------
// API-Fetched Investors (Lightweight Table)
// -----------------------------
async function getInvestors(token: string | null, limit = 50) {
  const base =
    process.env.NEXT_PUBLIC_BASE_URL ??
    process.env.VERCEL_URL ??
    "http://localhost:3000";

  const url = new URL(`/api/admin/investors?limit=${limit}`, base);

  const res = await fetch(url.toString(), {
    cache: "no-store",
    headers: token ? { Cookie: `auth_token=${token}` } : {},
  });

  if (!res.ok) {
    console.error("Investor API failed:", await res.text());
    throw new Error("Failed to fetch investors");
  }

  const json = await res.json();
  return json.data;
}

// -----------------------------
// FULL INVESTOR PORTAL (DB-backed)
// -----------------------------
async function getFullInvestorPortal() {
  const prisma = await getPrisma();

  return prisma.investor.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      fundingRequests: true,
      pricingSheet: true,
      InvestorCapitalFlow: true,
      InvestorAllocationDynamics: true,
      investments: true,
      commitments: true,
      pipelineDeals: {
        include: {
          application: {
            include: {
              borrower: true,
              borrowerProperty: true,
              PricingResult: true,
              underwriting: true,
            },
          },
        },
      },
    },
  });
}

// -----------------------------
// Investors Table Component
// -----------------------------
function InvestorsTable({ rows }: { rows: any[] }) {
  return (
    <table className="min-w-full border border-gray-200 rounded-md">
      <thead className="bg-gray-50">
        <tr>
          <th className="px-4 py-2 text-left">Name</th>
          <th className="px-4 py-2 text-left">Email</th>
          <th className="px-4 py-2 text-left">Phone</th>
          <th className="px-4 py-2 text-left">Potential Score</th>
          <th className="px-4 py-2 text-left">Band</th>
          <th className="px-4 py-2 text-left">Created</th>
        </tr>
      </thead>

      <tbody>
        {rows.map((inv) => (
          <tr key={inv.id} className="border-t">
            <td className="px-4 py-2">{inv.name}</td>
            <td className="px-4 py-2">{inv.email ?? "—"}</td>
            <td className="px-4 py-2">{inv.phone ?? "—"}</td>
            <td className="px-4 py-2">{inv.investorPotentialScore ?? "—"}</td>
            <td className="px-4 py-2">{inv.investorPotentialBand ?? "—"}</td>
            <td className="px-4 py-2">
              {new Date(inv.createdAt).toLocaleDateString()}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

// -----------------------------
// MAIN PAGE EXPORT
// -----------------------------
export default async function AdminInvestorsPage() {
  const token = await getAdminToken();   // ✔ Turbopack-safe

  const [apiInvestors, fullInvestors] = await Promise.all([
    getInvestors(token),
    getFullInvestorPortal(),
  ]);

  return (
    <main className="min-h-screen bg-slate-950 text-white p-6 space-y-16">
      {/* HEADER */}
      <header>
        <h1 className="text-3xl font-bold text-[#3CF46B] mb-2">
          Investor Portal Dashboard
        </h1>
        <p className="text-sm text-slate-400">
          Investor capital, allocations, pricing sheets, funding requests,
          performance metrics, and onboarding scores.
        </p>
      </header>

      {/* LIGHTWEIGHT TABLE */}
      <section>
        <h2 className="text-xl font-semibold mb-4">Investor Onboarding Scores</h2>
        <Suspense fallback={<div>Loading...</div>}>
          <InvestorsTable rows={apiInvestors} />
        </Suspense>
      </section>

      {/* FULL INVESTOR LIST */}
      <section>
        <h2 className="text-xl font-semibold mb-4">Investors</h2>

        <div className="bg-neutral-900 border border-neutral-700 rounded-xl overflow-hidden">
          <div className="grid grid-cols-6 gap-3 px-4 py-3 text-xs font-semibold text-slate-300 border-b border-neutral-700">
            <span>Name</span>
            <span>Status</span>
            <span>Committed</span>
            <span>Deployed</span>
            <span>Allocations</span>
            <span>Actions</span>
          </div>

          {fullInvestors.length === 0 && (
            <div className="px-4 py-4 text-sm text-slate-400">
              No investors found.
            </div>
          )}

          {fullInvestors.map((inv) => {
            const committed =
              inv.commitments?.reduce(
                (sum, c) => sum + (c.amount ?? 0),
                0
              ) ?? 0;

            const deployed =
              inv.investments?.reduce(
                (sum, i) => sum + (i.amount ?? 0),
                0
              ) ?? 0;

            const allocations =
              inv.InvestorAllocationDynamics?.length ?? 0;

            return (
              <div
                key={inv.id}
                className="grid grid-cols-6 gap-3 px-4 py-3 text-xs border-b border-neutral-800 hover:bg-neutral-800/60 transition"
              >
                <div className="flex flex-col">
                  <span className="text-slate-100">{inv.name}</span>
                  <span className="text-slate-500">{inv.email}</span>
                </div>

                <div className="flex flex-col">
                  <span className={statusColor(inv.status)}>{inv.status}</span>
                </div>

                <div className="flex flex-col">
                  <span className="text-slate-100">
                    ${committed.toLocaleString()}
                  </span>
                </div>

                <div className="flex flex-col">
                  <span className="text-slate-100">
                    ${deployed.toLocaleString()}
                  </span>
                </div>

                <div className="flex flex-col">
                  <span className="text-slate-100">{allocations}</span>
                </div>

                <div className="flex flex-col gap-2">
                  <Link
                    href={`/admin/investors/${inv.id}`}
                    className="px-3 py-1 bg-neutral-700 rounded-md text-sm hover:bg-neutral-600 transition text-center"
                  >
                    View Investor
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* FUNDING REQUESTS */}
      <section>
        <h2 className="text-xl font-semibold mb-4">Funding Requests</h2>

        <div className="space-y-4">
          {fullInvestors.flatMap((inv) => inv.fundingRequests).length === 0 && (
            <p className="text-sm text-slate-400">No funding requests found.</p>
          )}

          {fullInvestors.flatMap((inv) =>
            inv.fundingRequests.map((req) => (
              <div
                key={req.id}
                className="bg-slate-800/60 p-6 rounded-xl border border-slate-700 flex flex-col md:flex-row md:justify-between gap-4"
              >
                <div>
                  <h3 className="text-xl font-semibold">
                    {req.investor?.name ?? "Investor"} — {req.type}
                  </h3>

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
            ))
          )}
        </div>
      </section>

      {/* PRICING SHEETS */}
      <section>
        <h2 className="text-xl font-semibold mb-4">Investor Pricing Sheets</h2>

        <div className="space-y-4">
          {fullInvestors.flatMap((inv) => inv.pricingSheet ? [inv.pricingSheet] : []).length === 0 && (
            <p className="text-sm text-slate-400">No pricing sheets uploaded.</p>
          )}

          {fullInvestors.flatMap((inv) =>
            inv.pricingSheet
              ? [
                  <div
                    key={inv.pricingSheet.id}
                    className="bg-neutral-900 border border-neutral-700 rounded-xl p-6"
                  >
                    <h3 className="text-lg font-semibold">
                      {inv.name}
                    </h3>

                    <p className="text-slate-300 text-sm">
                      Uploaded: {new Date(inv.pricingSheet.createdAt).toLocaleString()}
                    </p>

                    <p className="text-slate-400 text-sm mt-1">
                      Rows: {inv.pricingSheet.rowCount}
                    </p>

                    <div className="flex gap-3 mt-4">
                      <Link
                        href={`/admin/pricing/sheets/${inv.pricingSheet.id}`}
                        className="px-4 py-2 bg-neutral-700 rounded-md text-sm hover:bg-neutral-600 transition"
                      >
                        View Sheet
                      </Link>
                    </div>
                  </div>,
                ]
              : []
          )}
        </div>
      </section>

      {/* ALLOCATIONS */}
      <section>
        <h2 className="text-xl font-semibold mb-4">Investor Allocations</h2>

        <div className="space-y-4">
          {fullInvestors.flatMap((inv) => inv.InvestorAllocationDynamics).length === 0 && (
            <p className="text-sm text-slate-400">No allocations found.</p>
          )}

          {fullInvestors.flatMap((inv) =>
            inv.InvestorAllocationDynamics.map((alloc) => (
              <div
                key={alloc.id}
                className="bg-neutral-900 border border-neutral-700 rounded-xl p-6"
              >
                <h3 className="text-lg font-semibold">
                  Allocation #{alloc.id} — {inv.name}
                </h3>

                <p className="text-slate-300 mt-2">
                  <strong>Amount:</strong> ${alloc.amount.toLocaleString()}
                </p>

                <p className="text-slate-500 text-sm mt-1">
                  {alloc.createdAt.toDateString()}
                </p>
              </div>
            ))
          )}
        </div>
      </section>
    </main>
  );
}
