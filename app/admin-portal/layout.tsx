import { auth, requireRole } from "@/lib/auth";
import { ReactNode } from "react";
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
  // 🔒 Enforce admin role (auth_token + uppercase role)
  try {
    await requireRole(["ADMIN"]);
  } catch {
    return <Unauthorized />;
  }

  // 🔐 Read verified session from auth_token
  const session = await auth();
  if (!session?.user) return <Unauthorized />;

  return (
    <section className="min-h-screen bg-slate-900 text-white flex">
      <AdminSidebar />
      <main className="flex-1 p-10">{children}</main>
    </section>
  );
}
