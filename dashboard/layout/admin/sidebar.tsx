// dashboard/layout/admin/sidebar.tsx
import Link from "next/link";
import { ScoringDAL } from "@/lib/dal/scoring";
import { classify } from "@/lib/scoring";
import { auth } from "@/lib/auth";

export default async function AdminSidebar() {
  const session = await auth();
  const user = session?.user;

  const latest = user ? await ScoringDAL.getLatestScores(user.id) : null;

  const riskBand = latest ? classify(latest.riskScore, "RISK") : "Unknown";
  const behaviorBand = latest ? classify(latest.impulsivenessScore, "CUSTOMER") : "Unknown";
  const fraudBand = latest?.fraudScore >= 80 ? "High" : "Normal";

  return (
    <aside className="w-64 bg-slate-950 border-r border-slate-800 p-4 text-sm text-white">
      <div className="mb-6">
        <div className="font-semibold">{user?.email}</div>
        <div className="text-slate-400 text-xs">
          Risk: {riskBand} · Behavior: {behaviorBand} · Fraud: {fraudBand}
        </div>
      </div>

      <nav className="space-y-3">
        <Link href="/admin/fraud" className="block hover:text-[#4EE38A]">Fraud Audit Viewer</Link>
        <Link href="/admin/polygon" className="block hover:text-[#4EE38A]">Polygon Anchoring Dashboard</Link>
        <Link href="/admin/analytics" className="block hover:text-[#4EE38A]">Behavior Analytics</Link>
        <Link href="/admin/environment" className="block hover:text-[#4EE38A]">Environment Heatmap</Link>
        <Link href="/admin/underwriting" className="block hover:text-[#4EE38A]">Underwriting Queue</Link>
        <Link href="/admin/disclosures" className="block hover:text-[#4EE38A]">Disclosure Generator</Link>
      </nav>
    </aside>
  );
}
