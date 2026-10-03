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
        px-4 py-3
      "
    >
      <div className="flex items-center justify-between w-full">

        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2 px-1 py-1 rounded-md"
        >
          <GenXBabyLogoMobile
            className="
              w-8 h-auto
              sm:w-10
              md:w-12
              lg:w-14
              shrink-0
            "
          />
        </Link>

        {/* Desktop Buttons */}
        <div
          className="
            hidden lg:flex
            items-center
            gap-4
            text-sm
            text-slate-300
          "
        >
          <Button href="/investors" variant="secondary">Investors</Button>
          <Button href="/borrowers" variant="outline">Borrowers</Button>
          <Button href="/admin/login" variant="primary">Admin</Button>

          {/* Apply Button */}
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

          {/* New Button */}
          <Link
            href="/new-feature"
            className="
              bg-slate-800
              text-white
              px-4 py-2
              rounded-md
              hover:bg-slate-700
              transition
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
            absolute top-16 right-4
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
          <Link href="/investors" className="text-white">Investors</Link>
          <Link href="/borrowers" className="text-white">Borrowers</Link>
          <Link href="/admin/login" className="text-white">Admin</Link>
          <Link href="/borrower-app/application/start" className="text-white">Apply</Link>
          <Link href="/new-feature" className="text-white">New</Link>
        </div>
      )}
    </nav>
  );
}
