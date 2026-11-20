import "@/app/globals.css";
import { ReactNode } from "react";
import { cookies } from "next/headers";
import { jwtVerify } from "jose";
import AdminSidebar from "./_components/AdminSidebar";

const SECRET = process.env.JWT_SECRET!;

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
  // ----------------------------------------------------
  // 1. Read unified auth cookie
  // ----------------------------------------------------
  const cookieStore = await cookies();
  const token = cookieStore.get("auth_token")?.value;

  if (!token) {
    return <Unauthorized />;
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
    return <Unauthorized />;
  }

  // ----------------------------------------------------
  // 3. Enforce ADMIN role (uppercase enum)
  // ----------------------------------------------------
  if (payload.role !== "ADMIN") {
    return <Unauthorized />;
  }

  // ----------------------------------------------------
  // 4. Render admin portal layout
  // ----------------------------------------------------
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
