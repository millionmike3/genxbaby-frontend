import "@/app/globals.css";
import { ReactNode } from "react";
import { auth } from "@/lib/auth";
import InvestorSidebar from "@/dashboard/layout/investor/sidebar";

export default async function InvestorPortalLayout({
  children,
}: {
  children: ReactNode;
}) {
  const session = await auth();

  if (!session?.user || session.user.role !== "investor") {
    return (
      <section className="bg-slate-950 text-white p-6 min-h-screen">
        <div>Unauthorized</div>
      </section>
    );
  }

  return (
    <section className="bg-slate-950 text-white min-h-screen flex">
      <InvestorSidebar />
      <main className="flex-1 p-6">{children}</main>
    </section>
  );
}
