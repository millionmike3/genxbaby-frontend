import "@/app/globals.css";
import { ReactNode } from "react";
import { cookies } from "next/headers";
import { jwtVerify } from "jose";
import AdminSidebar from "@/dashboard/layout/admin/sidebar";

const SECRET = process.env.JWT_SECRET!;

export default async function AdminLayout({
  children,
}: {
  children: ReactNode;
}) {
  // ----------------------------------------------------
  // 1. Read unified auth cookie
  // ----------------------------------------------------
  const cookieStore = await cookies();
  const token = cookieStore.get("auth_token")?.value;

  if (!token) {
    return (
      <section className="bg-slate-950 text-white p-6 min-h-screen">
        <div>Unauthorized</div>
      </section>
    );
  }

  // ----------------------------------------------------
  // 2. Verify JWT using JOSE
  // ----------------------------------------------------
  let payload: any;
  try {
    const verified = await jwtVerify(
      token,
      new TextEncoder().encode(SECRET)
    );
    payload = verified.payload;
  } catch (err) {
    console.error("JWT VERIFY ERROR:", err);
    return (
      <section className="bg-slate-950 text-white p-6 min-h-screen">
        <div>Unauthorized</div>
      </section>
    );
  }

  // ----------------------------------------------------
  // 3. Enforce ADMIN role (uppercase enum)
  // ----------------------------------------------------
  if (payload.role !== "ADMIN") {
    return (
      <section className="bg-slate-950 text-white p-6 min-h-screen">
        <div>Unauthorized</div>
      </section>
    );
  }

  // ----------------------------------------------------
  // 4. Render admin layout
  // ----------------------------------------------------
  return (
    <section className="min-h-screen flex bg-slate-950 text-white">
      <aside className="w-64 border-r border-slate-800 p-4">
        <AdminSidebar />
      </aside>

      <main className="flex-1 p-6">{children}</main>
    </section>
  );
}
