"use client";

import Link from "next/link";
import { Button } from "@/components/ui/Button";

export function Navbar() {
  return (
    <nav className="w-full px-6 py-4 flex items-center justify-between bg-gx-deepBlack border-b border-gx-border">
      <Link href="/" className="text-xl font-bold tracking-gxWide text-gx-neonGreen">
        GENXBABY
      </Link>

      <div className="flex items-center gap-4">
        <Button href="/investors" variant="secondary">Investors</Button>
        <Button href="/borrowers" variant="outline">Borrowers</Button>
        <Button href="/admin/login" variant="primary">Admin</Button>
      </div>
    </nav>
  );
}
