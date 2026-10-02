import "@/app/globals.css";
import { ReactNode } from "react";
import { auth } from "@/lib/auth";
import InvestorSidebar from "@/dashboard/layout/investor/sidebar";

export default async function InvestorPortalLayout({ children }) {
  const session = await auth();

  if (!session?.user || session.user.role !== "investor") {
    return <Unauthorized />;
  }

  return (
    <section className="min-h-screen bg-slate-950 text-white flex">
      <InvestorSidebar />
      <main className="flex-1 p-6">{children}</main>
    </section>
  );
}
