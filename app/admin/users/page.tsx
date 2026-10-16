import { requireRole } from "@/lib/auth";
import { getCurrentUser } from "@/lib/session";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function AdminUsersPage() {
  await requireRole(["ADMIN"]);
  const admin = await getCurrentUser();

  if (!admin) {
    return (
      <main className="min-h-screen flex items-center justify-center text-white">
        <h1 className="text-3xl">Not authenticated</h1>
      </main>
    );
  }

  const users = await prisma.user.findMany({
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      email: true,
      username: true,
      phone: true,
      role: true,
      createdAt: true,
    },
  });

  return (
    <main className="min-h-screen bg-slate-900 text-white p-10 space-y-10">
      <header>
        <h1 className="text-4xl font-bold text-[#3CF46B]">User Management</h1>
        <p className="text-slate-300 mt-2">
          Manage all users across the GenXBaby OS ecosystem.
        </p>
      </header>

      <section className="bg-neutral-800/40 border border-neutral-700 rounded-xl p-6">
        <h2 className="text-xl font-semibold mb-4">All Users</h2>

        <table className="w-full text-left">
          <thead className="text-slate-400 border-b border-neutral-700">
            <tr>
              <th className="py-2">ID</th>
              <th>Email</th>
              <th>Username</th>
              <th>Phone</th>
              <th>Role</th>
              <th>Created</th>
            </tr>
          </thead>

          <tbody>
            {users.map((u) => (
              <tr key={u.id} className="border-b border-neutral-800">
                <td className="py-2">{u.id}</td>
                <td>{u.email}</td>
                <td>{u.username ?? "—"}</td>
                <td>{u.phone ?? "—"}</td>
                <td className="text-[#3CF46B] font-semibold">{u.role}</td>
                <td>{new Date(u.createdAt).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </main>
  );
}
