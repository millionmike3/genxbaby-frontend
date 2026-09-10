"use client";

import Link from "next/link";

export default function PortalTabs() {
  const tabs = [
    { label: "Borrower Portal", href: "/borrower" },
    { label: "Investor Portal", href: "/investor" },
    { label: "Owner Portal", href: "/owner" },
    { label: "Admin Portal", href: "/admin" },
  ];

  return (
    <section className="w-full py-16 px-6 md:px-12 lg:px-20 bg-slate-900 text-white">
      <h2 className="text-3xl font-bold mb-8">
        GenXBaby is a unified financial intelligence ecosystem with four core portals:
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
        {tabs.map((tab) => (
          <Link
            key={tab.href}
            href={tab.href}
            className="p-6 rounded-xl bg-white/5 hover:bg-white/10 transition border border-white/10 text-center"
          >
            <span className="text-lg font-semibold">{tab.label}</span>
          </Link>
        ))}
      </div>

      <p className="text-slate-300 text-lg max-w-3xl leading-relaxed">
        Each portal serves a different role but all share the same backbone:
        real‑time underwriting, behavioral intelligence, property analysis, and compliance.
      </p>
    </section>
  );
}
