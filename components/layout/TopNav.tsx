"use client";

import { useState } from "react";
import Link from "next/link";

export default function TopNav() {
  const [open, setOpen] = useState(false);

  return (
    <header className="w-full px-6 py-4 bg-gx-deepBlack border-b border-gx-border flex items-center justify-between relative">
      {/* Left: Title */}
      <h1 className="text-xl font-semibold tracking-gxWide text-gx-graySoft">
        GenXBaby Portal
      </h1>

      {/* Desktop Menu */}
      <div className="hidden md:flex items-center gap-6 text-gx-graySoft">
        <Link href="/notifications" className="hover:text-gx-neonGreen transition">
          Notifications
        </Link>
        <Link href="/profile" className="hover:text-gx-electricBlue transition">
          Profile
        </Link>
      </div>

      {/* Mobile Hamburger */}
      <button
        className="md:hidden text-gx-neonGreen text-3xl"
        onClick={() => setOpen(!open)}
      >
        ☰
      </button>

      {/* Mobile Drawer */}
      {open && (
        <div className="absolute top-16 right-4 w-48 bg-gx-deepBlack border border-gx-border rounded-lg p-4 flex flex-col gap-4 md:hidden shadow-xl z-50">
          <Link href="/notifications" className="text-gx-graySoft hover:text-gx-neonGreen">
            Notifications
          </Link>
          <Link href="/profile" className="text-gx-graySoft hover:text-gx-electricBlue">
            Profile
          </Link>
        </div>
      )}
    </header>
  );
}
