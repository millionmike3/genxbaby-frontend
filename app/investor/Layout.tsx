import "@/app/globals.css";
import { ReactNode } from "react";
import { auth } from "@/lib/auth";
import InvestorSidebar from "@/dashboard/layout/investor/sidebar";

export default async function InvestorLayout({
  children,
}: {
  children: ReactNode;
}) {
  const session = await auth();

  // Unauthorized users see a simple wrapper (NOT html/body)
  if (!session?.user || session.user.role !== "investor") {
    return (
      <section className="bg-slate-950 text-white p-6 min-h-screen">
        <div>Unauthorized</div>
      </section>
    );
  }

  // Authorized investor layout
  return (
    <section className="bg-slate-950 text-white min-h-screen flex">
      <InvestorSidebar />
      <main className="flex-1 p-6">{children}</main>
    </section>
  );
}
