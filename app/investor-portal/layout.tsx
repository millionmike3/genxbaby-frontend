"use server";

import "@/app/globals.css";
import { ReactNode } from "react";
import { requireRole } from "@/lib/auth";
import InvestorSidebar from "@/dashboard/layout/investor/sidebar";

function Unauthorized() {
  return (
    <section className="min-h-screen bg-slate-950 text-white flex items-center justify-center">
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold">Unauthorized</h1>
        <p className="text-slate-300">
          Investor access required to view this portal.
        </p>
      </div>
    </section>
  );
}

export default async function InvestorPortalLayout({
  children,
}: {
  children: ReactNode;
}) {
  // Enforce investor role using your unified requireRole()
  try {
    await requireRole(["investor"]);
  } catch {
    return <Unauthorized />;
  }

  return (
    <section className="min-h-screen bg-slate-950 text-white flex">
      <InvestorSidebar />
      <main className="flex-1 p-6">{children}</main>
    </section>
  );
}
