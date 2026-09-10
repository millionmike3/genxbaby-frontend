// dashboard/layout/owner/sidebar.tsx
import Link from "next/link";
import { auth } from "@/lib/auth";
import { ScoringDAL } from "@/lib/dal/scoring";
import { classify } from "@/lib/scoring";

export default async function OwnerSidebar() {
  const session = await auth();
  const user = session?.user;

  const latest = user ? await ScoringDAL.getLatestScores(user.id) : null;

  const riskBand = latest ? classify(latest.riskScore, "RISK") : "Unknown";
  const behaviorBand = latest ? classify(latest.impulsivenessScore, "INVESTOR") : "Unknown";

  return (
    <aside className="w-64 bg-slate-950 border-r border-slate-800 p-4 text-sm text-white">
      <div className="mb-6">
        <div className="font-semibold">{user?.email}</div>
        <div className="text-slate-400 text-xs">
          Risk: {riskBand} · Behavior: {behaviorBand}
        </div>
      </div>

      <nav className="space-y-3">
        <Link href="/owner/dashboard" className="block hover:text-[#4EE38A]">Portfolio Dashboard</Link>
        <Link href="/owner/environment" className="block hover:text-[#4EE38A]">Environment Heatmap</Link>
        <Link href="/owner/investors" className="block hover:text-[#4EE38A]">Investor Behavior</Link>
        <Link href="/owner/fraud" className="block hover:text-[#4EE38A]">Fraud Alerts</Link>
      </nav>
    </aside>
  );
}
