"use client";

import { useState } from "react";
import Link from "next/link";
import { GenXBabyLogoMobile } from "@/components/branding/genxbaby-logos";
import { Button } from "@/components/ui/Button";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav
      className="
        fixed top-0 left-0 right-0
        z-[99999]
        bg-gx-deepBlack/90
        backdrop-blur-xl
        border-b border-gx-border
        px-3 py-2
      "
    >
      <div className="flex items-center justify-between w-full">

        {/* Logo — perfectly sized for all breakpoints */}
        <Link
          href="/"
          className="flex items-center gap-2 px-1 py-1 rounded-md"
        >
          <GenXBabyLogoMobile
            className="
              w-[30px] h-[30px]
              sm:w-[34px]
              md:w-[38px]
              lg:w-[42px]
              shrink-0
            "
          />
        </Link>

        {/* Desktop Buttons — hidden on mobile */}
        <div
          className="
            hidden lg:flex
            items-center
            gap-3
            text-xs md:text-sm
            text-slate-300
          "
        >
          <Button href="/investors" variant="secondary" size="sm">
            Investors
          </Button>

          <Button href="/borrowers" variant="outline" size="sm">
            Borrowers
          </Button>

          <Button href="/admin/login" variant="primary" size="sm">
            Admin
          </Button>

          <Link
            href="/borrower-app/application/start"
            className="
              bg-[#4EE38A]
              text-black
              font-semibold
              px-3 py-1.5
              rounded-md
              hover:bg-[#3bc978]
              transition
              text-xs md:text-sm
            "
          >
            Apply
          </Link>

          <Link
            href="/new-feature"
            className="
              bg-slate-800
              text-white
              px-3 py-1.5
              rounded-md
              hover:bg-slate-700
              transition
              text-xs md:text-sm
            "
          >
            New
          </Link>
        </div>

        {/* Mobile Hamburger */}
        <button
          className="lg:hidden text-gx-neonGreen text-3xl"
          onClick={() => setOpen(!open)}
        >
          ☰
        </button>
      </div>

      {/* Mobile Drawer */}
      {open && (
        <div
          className="
            absolute top-14 right-3
            w-56
            bg-gx-deepBlack
            border border-gx-border
            rounded-lg
            p-4
            flex flex-col
            gap-3
            lg:hidden
            shadow-xl
          "
        >
          <Link href="/investors" className="text-white">
            Investors
          </Link>
          <Link href="/borrowers" className="text-white">
            Borrowers
          </Link>
          <Link href="/admin/login" className="text-white">
            Admin
          </Link>
          <Link href="/borrower-app/application/start" className="text-white">
            Apply
          </Link>
          <Link href="/new-feature" className="text-white">
            New
          </Link>
        </div>
      )}
    </nav>
  );
}
