"use client";

import Link from "next/link";

export default function Sidebar() {
  return (
    <aside className="w-64 h-full bg-gx-surface border-r border-gx-border flex flex-col p-6 gap-6">
      <div className="text-lg font-bold tracking-gxWide text-gx-neonGreen">
        Dashboard
      </div>

      <nav className="flex flex-col gap-4 text-gx-graySoft">
        <Link href="/owner-portal" className="hover:text-gx-neonGreen transition">
          Owner Portal
        </Link>

        <Link href="/investor-portal" className="hover:text-gx-royalViolet transition">
          Investor Portal
        </Link>

        <Link href="/borrower-portal" className="hover:text-gx-electricBlue transition">
          Borrower Portal
        </Link>

        <Link href="/reports" className="hover:text-gx-limeSignal transition">
          Reports
        </Link>

        <Link href="/settings" className="hover:text-gx-graySoft transition">
          Settings
        </Link>
      </nav>
    </aside>
  );
}
