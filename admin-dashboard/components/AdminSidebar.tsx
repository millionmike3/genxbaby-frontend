"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

export default function AdminSidebar() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  const nav = [
    {
      label: "Dashboard",
      href: "/dashboard",
      icon: "dashboard",
    },
    {
      label: "Behavior Engine",
      href: "/behavior",
      icon: "psychology",
    },
    {
      label: "Stock Sanitizer",
      href: "/stock",
      icon: "stacked_line_chart",
    },

    // ⭐ FULL BLUETOOTH INTELLIGENCE SECTION
    {
      label: "Bluetooth Intelligence",
      icon: "bluetooth_searching",
      children: [
        { label: "Overview", href: "/bluetooth" },
        { label: "Heatmap", href: "/bluetooth/heatmap" },
        { label: "Alerts", href: "/bluetooth/alerts" },
        { label: "Correlation", href: "/bluetooth/correlation" },
        { label: "Cross‑Engine Intelligence", href: "/bluetooth/cross" },
        { label: "Real‑Time Stream", href: "/bluetooth/realtime" },
        { label: "Fingerprints", href: "/bluetooth/fingerprints" },
      ],
    },
  ];

  return (
    <aside
      className={`h-screen bg-gradient-to-b from-purple-700 to-purple-900 text-white shadow-xl transition-all duration-300 ${
        collapsed ? "w-20" : "w-64"
      }`}
    >
      {/* HEADER */}
      <div className="flex items-center justify-between p-5">
        {!collapsed && (
          <h1 className="text-xl font-bold tracking-wide">GEN X BABY</h1>
        )}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="material-icons text-white/80 hover:text-white"
        >
          {collapsed ? "chevron_right" : "chevron_left"}
        </button>
      </div>

      {/* NAVIGATION */}
      <nav className="px-3 space-y-4">
        {nav.map((item, idx) => {
          const active = pathname.startsWith(item.href || "");

          if (!item.children) {
            return (
              <Link key={idx} href={item.href}>
                <div
                  className={`flex items-center gap-3 p-3 rounded-xl cursor-pointer hover:bg-white/10 transition ${
                    active ? "bg-white/10" : ""
                  }`}
                >
                  <span className="material-icons text-white/80">
                    {item.icon}
                  </span>
                  {!collapsed && (
                    <span className="text-white/90 font-medium">
                      {item.label}
                    </span>
                  )}
                </div>
              </Link>
            );
          }

          // SECTION WITH CHILDREN
          return (
            <div key={idx}>
              <div className="flex items-center gap-3 p-3 text-white/60 uppercase text-xs">
                <span className="material-icons text-white/80">
                  {item.icon}
                </span>
                {!collapsed && item.label}
              </div>

              <div className="space-y-2 ml-2">
                {item.children.map((child, cidx) => {
                  const activeChild = pathname.startsWith(child.href);

                  return (
                    <Link key={cidx} href={child.href}>
                      <div
                        className={`flex items-center gap-3 p-3 rounded-xl cursor-pointer hover:bg-white/10 transition ${
                          activeChild ? "bg-white/10" : ""
                        }`}
                      >
                        <span className="material-icons text-white/60 text-sm">
                          arrow_right
                        </span>
                        {!collapsed && (
                          <span className="text-white/90 text-sm">
                            {child.label}
                          </span>
                        )}
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          );
        })}
      </nav>

      {/* FOOTER */}
      <div className="p-4 text-xs text-white/60 mt-auto">
        {!collapsed && "© 2026 Gen X Baby"}
      </div>
    </aside>
  );
}
