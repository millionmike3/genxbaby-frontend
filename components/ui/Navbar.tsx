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
            px-1 py-1 
            rounded-md
          "
        >
          <GenXBabyLogoMobile 
            className="
              w-10 h-auto 
              sm:w-12 
              md:w-14 
              shrink-0
            " 
          />
        </Link>

        {/* TWO-ROW NAVIGATION */}
        <div className="flex flex-col items-end gap-2 text-xs sm:text-sm text-slate-300">

          {/* Row 1 — Owner / Investor / Admin */}
          <div className="flex items-center gap-3 sm:gap-4 md:gap-6">
            <Link href="/login/owner" className="hover:text-[#3CF46B] transition">
              Owner
            </Link>

            <Link href="/login/investor" className="hover:text-[#3CF46B] transition">
              Investor
            </Link>

            <Link href="/login/admin" className="hover:text-[#3CF46B] transition">
              Admin
            </Link>
          </div>

          {/* Row 2 — Apply + Borrower Login */}
          <div className="flex items-center gap-3 sm:gap-4 md:gap-6">

            {/* Apply Button */}
            <Link
              href="/borrower-app/application/start"
              className="
                bg-[#4EE38A] 
                text-black 
                font-semibold 
                px-3 py-1.5 
                sm:px-4 sm:py-2 
                rounded-md 
                hover:bg-[#3bc978] 
                transition
                text-xs sm:text-sm
              "
            >
              Apply
            </Link>

            {/* Borrower Login Button */}
            <Link
              href="/borrower/login"
              className="
                px-3 py-1.5
                sm:px-4 sm:py-2
                rounded-lg
                bg-[#3CF46B]
                text-black
                font-bold
                hover:bg-[#32d05f]
                transition
                text-xs sm:text-sm
              "
            >
              Borrower Login
            </Link>
          </div>

        </div>
      </div>
    </nav>
  );
}
