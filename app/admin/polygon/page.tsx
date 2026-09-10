// app/admin/polygon/page.tsx
import { prisma } from "@/lib/prisma";

async function getAnchors() {
  return prisma.fraudEvent.findMany({
    where: { anchorTxHash: { not: null } },
    orderBy: { createdAt: "desc" },
    take: 200,
  });
}

export default async function PolygonDashboardPage() {
  const anchors = await getAnchors();

  return (
    <main className="min-h-screen bg-slate-950 text-white p-6">
      <h1 className="text-2xl font-bold mb-4">Polygon Anchoring Dashboard</h1>
      <p className="text-sm text-slate-400 mb-6">
        Tx hashes, anchor history, and high‑risk events.
      </p>

      <table className="w-full text-sm text-slate-300">
        <thead>
          <tr className="border-b border-slate-800">
            <th className="py-2 text-left">User</th>
            <th className="py-2 text-left">Event</th>
            <th className="py-2 text-left">Fraud</th>
            <th className="py-2 text-left">Risk</th>
            <th className="py-2 text-left">Tx Hash</th>
            <th className="py-2 text-left">Timestamp</th>
          </tr>
        </thead>
        <tbody>
          {anchors.map((e) => {
            const payload = e.payload as any;
            const scores = payload?.scores || {};
            return (
              <tr key={e.id} className="border-b border-slate-900">
                <td className="py-2">{e.userId}</td>
                <td className="py-2">{payload?.eventId}</td>
                <td className="py-2">{scores.fraud}</td>
                <td className="py-2">{scores.risk}</td>
                <td className="py-2 font-mono text-xs break-all">
                  {e.anchorTxHash}
                </td>
                <td className="py-2">
                  {new Date(e.createdAt).toLocaleString()}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </main>
  );
}
