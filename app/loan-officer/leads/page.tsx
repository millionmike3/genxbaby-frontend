
import { getPrisma } from "@/lib/db/prisma";

export const dynamic = "force-dynamic";

export default async function LoanOfficerLeadsPage() {
  const prisma = await getPrisma();

  const leads = await prisma.lead.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <main className="min-h-screen bg-slate-950 text-white p-6 space-y-10">
      <h1 className="text-3xl font-bold text-[#3CF46B]">
        Lead Conversion Dashboard
      </h1>

      <p className="text-slate-300 text-sm">
        Prioritize, follow up, and convert high‑value leads with intelligent scoring and status tracking.
      </p>

      <section className="bg-neutral-900 border border-neutral-700 rounded-xl p-6">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-slate-400">
              <th className="text-left py-2">Name</th>
              <th className="text-left py-2">Contact</th>
              <th className="text-left py-2">Lead Source</th>
              <th className="text-left py-2">Score</th>
              <th className="text-left py-2">Status</th>
              <th className="text-left py-2">Last Activity</th>
            </tr>
          </thead>
          <tbody>
            {leads.map((lead) => (
              <tr key={lead.id} className="border-t border-neutral-800">
                <td className="py-2">{lead.name}</td>
                <td className="py-2">{lead.email || lead.phone}</td>
                <td className="py-2">{lead.source}</td>
                <td className="py-2">
                  <span
                    className={
                      lead.score >= 80
                        ? "text-[#3CF46B]"
                        : lead.score >= 50
                        ? "text-yellow-300"
                        : "text-slate-300"
                    }
                  >
                    {lead.score}
                  </span>
                </td>
                <td className="py-2">{lead.status}</td>
                <td className="py-2">
                  {lead.lastActivityAt
                    ? new Date(lead.lastActivityAt).toLocaleString()
                    : "No activity"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </main>
  );
}
