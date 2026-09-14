import "@/app/globals.css";
import { ReactNode } from "react";
import { auth } from "@/lib/auth";
import AdminSidebar from "@/dashboard/layout/admin/sidebar";

export default async function AdminLayout({
  children,
}: {
  children: ReactNode;
}) {
  const session = await auth();

  // If you want role protection, add:
  // if (!session?.user || session.user.role !== "admin") {
  //   return (
  //     <section className="bg-slate-950 text-white p-6 min-h-screen">
  //       <div>Unauthorized</div>
  //     </section>
  //   );
  // }

  return (
    <section className="min-h-screen flex bg-slate-950 text-white">
      <aside className="w-64 border-r border-slate-800 p-4">
        <AdminSidebar />
      </aside>

      <main className="flex-1 p-6">{children}</main>
    </section>
  );
}
