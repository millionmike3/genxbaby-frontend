import "@/app/globals.css";
import { ReactNode } from "react";
import { auth } from "@/lib/auth";
import { classify } from "@/lib/scoring";
import AdminSidebar from "@/dashboard/layout/admin/sidebar";

export default async function AdminLayout({
  children,
}: {
  children: ReactNode;
}) {
  const session = await auth();

  // You currently do NOT have scoring data in session
  const latest = null;

  // Safe fallback values
  const riskBand = "Unknown";
  const behaviorBand = "Unknown";
  const fraudBand = "Normal";

  return (
    <div className="min-h-screen flex bg-slate-950 text-white">
      <aside className="w-64 border-r border-slate-800 p-4">
        <AdminSidebar />

      </aside>

      <main className="flex-1 p-6">{children}</main>
    </div>
  );
}
