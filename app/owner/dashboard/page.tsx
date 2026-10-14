
import { getPrisma } from "@/lib/db/prisma";
import { cookies } from "next/headers";
import { jwtVerify } from "jose";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function OwnerDashboard() {
  const cookieStore = cookies();
  const token = cookieStore.get("session_owner")?.value;

  if (!token) {
    return (
      <main className="min-h-screen bg-slate-950 text-white p-6">
        <h1>Unauthorized</h1>
      </main>
    );
  }

  const { payload } = await jwtVerify(
    token,
    new TextEncoder().encode(process.env.JWT_SECRET!)
  );

  const prisma = await getPrisma();

  // Fetch high-level system data
  const [
    totalBorrowers,
    totalLoans,
    totalStaff,
    totalUnderwriters,
    totalLoanOfficers,
    totalInvestors,
    totalRevenue,
    fraudEvents,
  ] = await Promise.all([
    prisma.borrower.count(),
    prisma.mortgage.count(),
    prisma.staff.count(),
    prisma.underwriter.count(),
    prisma.loanOfficer.count(),
    prisma.investor.count(),
    prisma.revenue.aggregate({ _sum: { amount: true } }),
    prisma.fraudEvent.findMany({ orderBy: { createdAt: "desc" }, take: 10 }),
  ]);

  return (
    <main className="min-h-screen bg-slate-950 text-white p-6 space-y-12">
      {/* HEADER */}
      <header>
        <h1 className="text-4xl font-bold text-[#3CF46B] mb-2">
          Owner Command Center
        </h1>
        <p className="text-sm text-slate-400">
          System-wide control, analytics, and operational oversight.
        </p>
      </header>

      {/* KPI STRIP */}
      <section className="grid grid-cols-4 gap-4">
        <DashboardCard label="Borrowers" value={totalBorrowers} />
        <DashboardCard label="Loans" value={totalLoans} />
        <DashboardCard label="Staff" value={totalStaff} />
        <DashboardCard label="Revenue" value={`$${totalRevenue._sum.amount?.toLocaleString() ?? 0}`} />
      </section>

      {/* SECOND KPI STRIP */}
      <section className="grid grid-cols-3 gap-4">
        <DashboardCard label="Underwriters" value={totalUnderwriters} />
        <DashboardCard label="Loan Officers" value={totalLoanOfficers} />
        <DashboardCard label="Investors" value={totalInvestors} />
      </section>

      {/* GRID LAYOUT */}
      <section className="grid grid-cols-12 gap-6">
        {/* SYSTEM MANAGEMENT */}
        <div className="col-span-6 bg-neutral-900 border border-neutral-700 rounded-xl p-6">
          <h2 className="text-xl font-semibold mb-3">System Management</h2>

          <ul className="space-y-3 text-sm">
            <DashboardLink href="/owner/manage/staff" label="Manage Staff" />
            <DashboardLink href="/owner/manage/underwriters" label="Manage Underwriters" />
            <DashboardLink href="/owner/manage/loan-officers" label="Manage Loan Officers" />
            <DashboardLink href="/owner/manage/investors" label="Manage Investors" />
            <DashboardLink href="/owner/manage/pricing" label="Pricing Engine" />
            <DashboardLink href="/owner/manage/rules" label="Underwriting Rules" />
          </ul>
        </div>

        {/* FRAUD + BEHAVIOR INTELLIGENCE */}
        <div className="col-span-6 bg-neutral-900 border border-neutral-700 rounded-xl p-6">
          <h2 className="text-xl font-semibold mb-3">Fraud & Behavioral Intelligence</h2>

          <ul className="space-y-3 text-sm">
            {fraudEvents.map((event) => (
              <li
                key={event.id}
                className="bg-neutral-800 p-4 rounded-lg border border-neutral-700"
              >
                <p className="text-slate-100">
                  <strong>{event.eventType}</strong>
                </p>
                <p className="text-slate-300 text-xs">
                  {JSON.stringify(event.metadata)}
                </p>
                <p className="text-slate-400 text-xs">
                  {new Date(event.createdAt).toLocaleString()}
                </p>
              </li>
            ))}
          </ul>
        </div>

        {/* PIPELINE OVERVIEW */}
        <div className="col-span-12 bg-neutral-900 border border-neutral-700 rounded-xl p-6">
          <h2 className="text-xl font-semibold mb-3">Pipeline Overview</h2>

          <Link
            href="/crm"
            className="text-[#3CF46B] underline text-sm"
          >
            Open CRM Dashboard
          </Link>
        </div>
      </section>
    </main>
  );
}

function DashboardCard({ label, value }) {
  return (
    <div className="bg-neutral-900 border border-neutral-700 rounded-xl p-4">
      <p className="text-slate-400 text-xs">{label}</p>
      <p className="text-2xl font-bold">{value}</p>
    </div>
  );
}

function DashboardLink({ href, label }) {
  return (
    <li>
      <Link
        href={href}
        className="text-[#3CF46B] text-sm underline hover:text-[#32d05f] transition"
      >
        {label}
      </Link>
    </li>
  );
}
