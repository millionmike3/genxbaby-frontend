"use client";

import Link from "next/link";
import { GenXBabyLogoMobile } from "@/components/branding/genxbaby-logos";

export default function Navbar() {
  return (
    <nav
      className="
        fixed top-0 left-0 right-0 
        z-[99999] 
        bg-slate-900/90 
        backdrop-blur-xl 
        border-b border-slate-800 
        px-4 py-3
      "
    >
      <div className="flex items-center justify-between w-full">

        {/* Logo */}
        <Link
          href="/"
          className="
            flex items-center gap-2 
            min-h-[48px] min-w-[48px] 
            bg-slate-900/90 
            px-2 py-1 
            rounded-md
          "
        >
          <GenXBabyLogoMobile className="min-w-[40px] min-h-[40px] shrink-0" />
        </Link>

        {/* Navigation Links */}
        <div className="flex items-center gap-6 text-sm text-slate-300">

          {/* Owner Login */}
          <Link
            href="/login/owner"
            className="hover:text-[#3CF46B] transition"
          >
            Owner
          </Link>

          {/* Investor Login */}
          <Link
            href="/login/investor"
            className="hover:text-[#3CF46B] transition"
          >
            Investor
          </Link>

          {/* Admin Login */}
          <Link
            href="/login/admin"
            className="hover:text-[#3CF46B] transition"
          >
            Admin
          </Link>

          {/* Apply for Mortgage */}
          <Link
            href="/borrower-app/application/start"
            className="
            bg-[#4EE38A] 
            text-black 
            font-semibold 
           px-4 py-2 
           rounded-md 
           hover:bg-[#3bc978] 
           transition
           "
>
  Apply
</Link>


           
        </div>

      </div>
    </nav>
  );
}
