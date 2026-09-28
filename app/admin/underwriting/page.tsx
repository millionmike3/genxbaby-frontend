"use server";

import { getPrisma } from "@/lib/prisma";

async function getUnderwritingCases() {
  const prisma = await getPrisma();

  return prisma.underwritingCase.findMany({
    orderBy: { createdAt: "desc" },
    take: 100,
    include: {
      application: {
        include: {
          borrower: true,
        },
      },
    },
  });
}

export default async function AdminUnderwritingQueuePage() {
  const prisma = await getPrisma();

  const cases = await prisma.underwritingCase.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      application: {
        include: {
          borrower: true,
        },
      },
    },
  });

  return (
    <main className="min-h-screen bg-slate-950 text-white p-6">
      <h1 className="text-2xl font-bold mb-4">Underwriting Queue</h1>
      <p className="text-sm text-slate-400 mb-6">
        Review and decide on pending underwriting cases.
      </p>

      <table className="w-full text-sm text-slate-300">
        <thead>
          <tr className="border-b border-slate-800">
            <th className="py-2 text-left">Case</th>
            <th className="py-2 text-left">Application</th>
            <th className="py-2 text-left">Borrower</th>
            <th className="py-2 text-left">Risk Score</th>
            <th className="py-2 text-left">Status</th>
            <th className="py-2 text-left">Actions</th>
          </tr>
        </thead>

        <tbody>
          {cases.map((c) => (
            <tr key={c.id} className="border-b border-slate-900">
              <td className="py-2">{c.id}</td>
              <td className="py-2">{c.applicationId}</td>
              <td className="py-2">{c.application?.borrower.fullName}</td>

              <td className="py-2">{c.riskScore}</td>
              <td className="py-2">{c.status}</td>

              <td className="py-2">
                <div className="flex gap-2">

                  {/* AUTO UNDERWRITING BUTTON */}
                  <form action="/api/underwriting/run" method="post">
                    <input
                      type="hidden"
                      name="applicationId"
                      value={c.applicationId}
                    />
                    <button
                      type="submit"
                      className="px-3 py-1 rounded bg-slate-700 text-white text-xs font-semibold"
                    >
                      Auto‑UW
                    </button>
                  </form>

                  {/* INVESTOR PRICING BUTTON */}
                  <form action="/api/investor/pricing/run" method="post">
                    <input
                      type="hidden"
                      name="applicationId"
                      value={c.applicationId}
                    />
                    <button
                      type="submit"
                      className="px-3 py-1 rounded bg-blue-600 text-white text-xs font-semibold"
                    >
                      Pricing
                    </button>
                  </form>

                  {/* MANUAL DECISION BUTTONS */}
                  <form
                    action="/api/underwriting/decision/manual"
                    method="post"
                    className="flex gap-2"
                  >
                    <input type="hidden" name="caseId" value={c.id} />

                    <button
                      name="decision"
                      value="approved"
                      className="px-3 py-1 rounded bg-[#4EE38A] text-black text-xs font-semibold"
                    >
                      Approve
                    </button>

                    <button
                      name="decision"
                      value="declined"
                      className="px-3 py-1 rounded bg-red-500 text-black text-xs font-semibold"
                    >
                      Decline
                    </button>

                    <button
                      name="decision"
                      value="refer"
                      className="px-3 py-1 rounded bg-yellow-400 text-black text-xs font-semibold"
                    >
                      Refer
                    </button>
                  </form>

                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}
