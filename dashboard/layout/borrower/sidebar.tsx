// dashboard/layout/borrower/sidebar.tsx
import Link from "next/link";
import { auth } from "@/lib/auth";
import { ScoringDAL } from "@/lib/dal/scoring";
import { classify } from "@/lib/scoring";

export default async function BorrowerSidebar() {
  const session = await auth();
  const user = session?.user;

  const latest = user ? await ScoringDAL.getLatestScores(user.id) : null;

  const riskBand = latest ? classify(latest.riskScore, "RISK") : "Unknown";

  return (
    <aside className="w-64 bg-slate-950 border-r border-slate-800 p-4 text-sm text-white">
      <div className="mb-6">
        <div className="font-semibold">{user?.email}</div>
        <div className="text-slate-400 text-xs">
          Risk: {riskBand}
        </div>
      </div>

      <nav className="space-y-3">
        <Link href="/borrower/apply" className="block hover:text-[#4EE38A]">Apply for Mortgage</Link>
        <Link href="/borrower-app/application" className="block hover:text-[#4EE38A]">My Application</Link>
        <Link href="/borrower-app/documents" className="block hover:text-[#4EE38A]">Document Uploads</Link>
        <Link href="/borrower-app/disclosures" className="block hover:text-[#4EE38A]">Disclosure Review</Link>
      </nav>
    </aside>
  );
}
