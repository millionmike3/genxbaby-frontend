// app/admin/layout.tsx
import { requireRole } from "@/lib/authz";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Enforce admin role before rendering anything
  await requireRole(["admin"]);

  return (
    <div className="min-h-screen w-full bg-black text-white flex">
      {/* Admin Sidebar (optional) */}
      <aside className="w-64 border-r border-gray-800 bg-gray-900/60 p-6">
        <h2 className="text-xl font-bold mb-4">Admin Panel</h2>

        <nav className="space-y-3 text-gray-300">
          <a href="/admin" className="block hover:text-white">Dashboard</a>
          <a href="/admin/users" className="block hover:text-white">Users</a>
          <a href="/admin/roles" className="block hover:text-white">Roles</a>
          <a href="/admin/settings" className="block hover:text-white">Settings</a>
        </nav>
      </aside>

      {/* Main Admin Content */}
      <main className="flex-1 p-8">
        {children}
      </main>
    </div>
  );
}
