import "@/app/globals.css";
import { ReactNode } from "react";
import { requireRole } from "@/lib/auth";
import AdminSidebar from "./_components/AdminSidebar";

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

export default async function AdminPortalLayout({
  children,
}: {
  children: ReactNode;
}) {
  try {
    await requireRole(["ADMIN"]);
  } catch {
    return <Unauthorized />;
  }

  return (
    <section className="min-h-screen bg-slate-900 text-white flex">
      <AdminSidebar />

      <main className="flex-1 p-10">{children}</main>

      <form action="/api/logout" method="post">
        <button
          type="submit"
          className="mt-6 w-full px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg font-semibold"
        >
          Logout
        </button>
      </form>
    </section>
  );
}