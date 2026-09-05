"use client";

import Link from "next/link";
import { GenXBabyLogoMobile } from "@/components/branding/genxbaby-logos";

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-900/80 backdrop-blur-md border-b border-slate-800 px-4 py-3 flex items-center justify-between">
      
      <Link href="/" className="flex items-center gap-2">
        <GenXBabyLogoMobile className="w-28 h-auto" />
      </Link>

      <div className="flex items-center gap-4 text-sm text-slate-300">
        <Link href="/owner-portal" className="hover:text-[#3CF46B] transition">Owner</Link>
        <Link href="/investor-portal" className="hover:text-[#3CF46B] transition">Investor</Link>
        <Link href="/admin" className="hover:text-[#3CF46B] transition">Admin</Link>
      </div>
    </nav>
  );
}
