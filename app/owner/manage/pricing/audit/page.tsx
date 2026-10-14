
import { getPrisma } from "@/lib/db/prisma";

export const dynamic = "force-dynamic";

export default async function PricingAuditLogPage() {
  const prisma = await getPrisma();

  const logs = await prisma.pricingAuditLog.findMany({
    orderBy: { createdAt: "desc" },
    take: 200,
  });

  return (
    <main className="min-h-screen bg-slate-950 text-white p-6 space-y-10">
      <h1 className="text-3xl font-bold text-[#3CF46B]">
        Pricing Audit Log
      </h1>

      <p className="text-slate-300 text-sm">
        Admin and Owner can review all pricing changes across the LOS hierarchy.
      </p>

      <section className="bg-neutral-900 border border-neutral-700 rounded-xl p-6">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-slate-400">
              <th className="text-left py-2">Timestamp</th>
              <th className="text-left py-2">Actor Role</th>
              <th className="text-left py-2">Action</th>
              <th className="text-left py-2">Module</th>
              <th className="text-left py-2">Details</th>
            </tr>
          </thead>

          <tbody>
            {logs.map((log) => (
              <tr key={log.id} className="border-t border-neutral-800">
                <td className="py-2">
                  {new Date(log.createdAt).toLocaleString()}
                </td>
                <td className="py-2">{log.actorRole}</td>
                <td className="py-2">{log.action}</td>
                <td className="py-2">{log.module}</td>
                <td className="py-2">{log.details}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </main>
  );
}
