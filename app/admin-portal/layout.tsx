"use server";

import { requireRole } from "@/lib/auth";
import { ReactNode } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { headers } from "next/headers";

function Unauthorized() {
  return (
    <section className="min-h-screen bg-slate-950 text-white flex items-center justify-center">
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold">Unauthorized</h1>
        <p className="text-slate-300">Admin access required.</p>
      </div>
    </section>
  );
}

export default async function AdminPortalLayout({ children }: { children: ReactNode }) {
  try {
    await requireRole(["admin"]);
  } catch {
    return <Unauthorized />;
  }

  const hdrs = headers();
  const pathname =
    hdrs.get("x-pathname") ||
    hdrs.get("referer") ||
    "";

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
    <section className="min-h-screen bg-slate-900 text-white flex">
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

      <main className="flex-1 p-10">{children}</main>
    </section>
  );
}
