"use client";

import Link from "next/link";

export default function PublicSidebar() {
  return (
    <aside className="h-screen w-64 bg-black text-white p-6 border-r border-white/10">
      <h1 className="text-xl font-bold mb-6">GEN X BABY</h1>

      <nav className="space-y-4">
        <Link href="/" className="block hover:text-purple-400">
          Home
        </Link>

        <Link href="/owner-portal" className="block hover:text-purple-400">
          Owner Portal
        </Link>

        <Link href="/investor-portal" className="block hover:text-purple-400">
          Investor Portal
        </Link>

        <Link href="/borrower-portal" className="block hover:text-purple-400">
          Borrower Portal
        </Link>

        <Link href="/login" className="block hover:text-purple-400">
          Admin Login
        </Link>
      </nav>
    </aside>
  );
}
