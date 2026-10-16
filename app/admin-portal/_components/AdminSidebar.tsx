"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export default function AdminSidebar() {
  const pathname = usePathname();

  const navItems = [
    { name: "Dashboard", href: "/admin-portal" },
    { name: "Users", href: "/admin-portal/users" },
    { name: "Sessions", href: "/admin-portal/sessions" },
    { name: "Signals", href: "/admin-portal/signals" },
    { name: "Audit Log", href: "/admin-portal/audit" },
    { name: "Integrations", href: "/admin-portal/integrations" },
    { name: "System Config", href: "/admin-portal/system" },
  ];

  return (
    <aside className="w-64 bg-slate-800 border-r border-slate-700 p-6">
      <h1 className="text-2xl font-bold mb-8">Admin Portal</h1>

      <nav className="space-y-2">
        {navItems.map((item) => {
          const isActive = pathname.startsWith(item.href);

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "block px-4 py-2 rounded-lg text-slate-300 hover:bg-slate-700 hover:text-white transition",
                isActive && "bg-slate-700 text-white"
              )}
            >
              {item.name}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
