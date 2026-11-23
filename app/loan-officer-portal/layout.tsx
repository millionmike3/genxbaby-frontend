
import { requireRole } from "@/lib/auth";
import Link from "next/link";

function Unauthorized() {
  return (
    <section className="min-h-screen bg-slate-950 text-white flex items-center justify-center px-6">
      <div className="rounded-2xl border border-red-500/30 bg-slate-900 p-8 text-center shadow-xl">
        <h1 className="text-xl font-bold text-red-400">
          Unauthorized
        </h1>
        <p className="mt-2 text-slate-300">
          Loan Officer access required.
        </p>
      </div>
    </section>
  );
}

const navigation = [
  {
    heading: "WORKSPACE",
    links: [
      { label: "Overview", href: "/loan-officer-portal" },
      { label: "Loan Pipeline", href: "/loan-officer-portal/pipeline" },
      { label: "Applications", href: "/loan-officer-portal/applications" },
      { label: "Leads", href: "/loan-officer/leads" },
    ],
  },
  {
    heading: "LOAN OPERATIONS",
    links: [
      { label: "Loan Conditions", href: "/loan-officer-portal/conditions" },
      { label: "Pricing & Scenarios", href: "/loan-officer/pricing" },
      { label: "Rate Lock", href: "/loan-officer/rate-lock" },
      { label: "Retention", href: "/loan-officer/retention" },
    ],
  },
  {
    heading: "COMMUNICATION",
    links: [
      { label: "Messages", href: "/loan-officer-portal/messages" },
    ],
  },
];

const capabilities = [
  {
    title: "Borrower & Application Data",
    description:
      "Borrower profiles, contact information, employment details, loan applications, and property information.",
  },
  {
    title: "Loan Assignments",
    description:
      "Loan Officer profiles and application assignments through the LoanOfficer and Application relationships.",
  },
  {
    title: "Underwriting Visibility",
    description:
      "Underwriting cases, workflow status, decisions, evaluations, milestones, exceptions, and risk information.",
  },
  {
    title: "Documents & Disclosures",
    description:
      "Application documents, borrower disclosures, and Form 1003-related records.",
  },
  {
    title: "Pricing & Loan Analysis",
    description:
      "Loan pricing, scoring, qualification information, and loan scenario data.",
  },
  {
    title: "Leads & Tasks",
    description:
      "Lead records, lead scoring, task assignments, and follow-up workflow information.",
  },
  {
    title: "Servicing Visibility",
    description:
      "Related servicing records and loan lifecycle information, subject to role permissions.",
  },
];

export default async function LoanOfficerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  let session;

  try {
    session = await requireRole(["LOAN_OFFICER"]);
  } catch {
    return <Unauthorized />;
  }

  return (
    <div className="min-h-screen bg-slate-900 text-white md:flex">
      {/* Sidebar */}
      <aside className="w-full shrink-0 border-b border-slate-700 bg-slate-800/60 p-6 md:min-h-screen md:w-72 md:border-b-0 md:border-r">
        <div className="mb-8">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-purple-400">
            GenXBaby
          </p>

          <h2 className="mt-3 text-xl font-bold text-white">
            Loan Officer Portal
          </h2>

          <div className="mt-4 rounded-xl border border-slate-700 bg-slate-900/70 p-4">
            <p className="text-xs uppercase tracking-wider text-slate-400">
              Signed in as
            </p>
            <p className="mt-1 font-semibold text-white">
              {session.fullName}
            </p>
            <span className="mt-2 inline-block rounded-full border border-purple-500/30 bg-purple-500/10 px-3 py-1 text-xs font-semibold text-purple-300">
              LOAN OFFICER
            </span>
          </div>
        </div>

        {/* Vertical Navigation */}
        <nav aria-label="Loan Officer navigation" className="space-y-7">
          {navigation.map((group) => (
            <div key={group.heading}>
              <h3 className="mb-3 text-xs font-bold uppercase tracking-[0.18em] text-slate-500">
                {group.heading}
              </h3>

              <div className="flex flex-col gap-2">
                {group.links.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="block w-full rounded-lg border border-transparent px-4 py-3 text-sm font-medium text-slate-300 transition hover:border-purple-500/30 hover:bg-purple-500/10 hover:text-white"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </nav>

        {/* Logout */}
        <form action="/api/logout" method="post" className="mt-8">
          <button
            type="submit"
            className="w-full rounded-lg border border-red-500/30 bg-red-600/90 px-4 py-3 font-semibold text-white transition hover:bg-red-700"
          >
            Logout
          </button>
        </form>
      </aside>

      {/* Main Content */}
      <main className="min-w-0 flex-1 p-5 md:p-8 lg:p-10">
        <header className="mb-8 border-b border-slate-700 pb-6">
          <p className="text-sm font-medium text-purple-400">
            GENXBABY FINANCIAL PLATFORM
          </p>

          <h1 className="mt-2 text-2xl font-bold tracking-tight md:text-3xl">
            Loan Officer Workspace
          </h1>

          <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-400">
            Manage assigned applications, monitor loan progress, review
            conditions, coordinate borrower communication, and access
            loan operations information.
          </p>
        </header>

        {/* Current Page */}
        <section className="min-w-0">
          {children}
        </section>

        {/* Backend and Schema Capabilities */}
        <section className="mt-12 border-t border-slate-700 pt-8">
          <div className="mb-6">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-purple-400">
              Platform Capabilities
            </p>

            <h2 className="mt-2 text-xl font-bold text-white">
              Connected Loan Operations
            </h2>

            <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-400">
              The GenXBaby data model connects loan origination,
              borrower information, underwriting, pricing, documentation,
              and servicing records across the loan lifecycle.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {capabilities.map((capability) => (
              <article
                key={capability.title}
                className="rounded-xl border border-slate-700 bg-slate-800/60 p-5 transition hover:border-purple-500/40"
              >
                <h3 className="font-semibold text-white">
                  {capability.title}
                </h3>

                <p className="mt-2 text-sm leading-6 text-slate-400">
                  {capability.description}
                </p>
              </article>
            ))}
          </div>

          <div className="mt-6 rounded-xl border border-purple-500/20 bg-purple-500/5 p-5">
            <h3 className="font-semibold text-purple-300">
              Role-Based Access & Data Security
            </h3>

            <p className="mt-2 text-sm leading-6 text-slate-400">
              Loan Officer access is protected by role verification.
              Application access and operational permissions must also
              be enforced by the backend for each assigned record.
            </p>
          </div>
        </section>
      </main>
    </div>
  );
}
