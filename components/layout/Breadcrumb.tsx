"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Breadcrumb() {
  const pathname = usePathname();

  const segments = pathname
    .split("/")
    .filter(Boolean)
    .map((segment, index, arr) => {
      const href = "/" + arr.slice(0, index + 1).join("/");
      return { label: segment, href };
    });

  return (
    <nav className="text-sm text-gx-grayMuted mb-6 flex items-center gap-2">
      <Link href="/" className="hover:text-gx-neonGreen transition">
        Home
      </Link>

      {segments.map((seg, idx) => (
        <div key={seg.href} className="flex items-center gap-2">
          <span>/</span>
          <Link
            href={seg.href}
            className="hover:text-gx-electricBlue transition capitalize"
          >
            {seg.label}
          </Link>
        </div>
      ))}
    </nav>
  );
}
