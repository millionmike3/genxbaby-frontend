"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

export function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="w-full px-4 py-4 flex items-center justify-between bg-gx-deepBlack border-b border-gx-border">
      {/* Logo */}
      <Link
        href="/"
        className="text-xl font-bold tracking-gxWide text-gx-neonGreen"
      >
        GENXBABY
      </Link>

      {/* Desktop Buttons */}
      <div className="hidden md:flex items-center gap-4">
        <Button href="/investors" variant="secondary">Investors</Button>
        <Button href="/borrowers" variant="outline">Borrowers</Button>
        <Button href="/admin/login" variant="primary">Admin</Button>
      </div>

      {/* Mobile Hamburger */}
      <button
        className="md:hidden text-gx-neonGreen text-3xl"
        onClick={() => setOpen(!open)}
      >
        ☰
      </button>

      {/* Mobile Menu Drawer */}
      {open && (
        <div className="absolute top-16 right-4 w-48 bg-gx-deepBlack border border-gx-border rounded-lg p-4 flex flex-col gap-3 md:hidden shadow-xl">
          <Link href="/investors" className="text-white">Investors</Link>
          <Link href="/borrowers" className="text-white">Borrowers</Link>
          <Link href="/admin/login" className="text-white">Admin</Link>
        </div>
      )}
    </nav>
  );
}
