"use client";

import { useEffect, useState } from "react";
import AdminIdentityBanner from "@/components/AdminIdentityBanner";

export default function AdminRolesPage() {
  const [admins, setAdmins] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  async function loadAdmins() {
    try {
      const res = await fetch("/api/admin/roles/list");
      const json = await res.json();
      setAdmins(json.admins || []);
    } catch (err) {
      console.error("Error loading admins:", err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadAdmins();
  }, []);

  async function grant(wallet: string) {
    setMessage("Granting admin role…");

    try {
      const res = await fetch("/api/admin/roles/grant", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ wallet }),
      });

      const json = await res.json();

      if (json.success) {
        setMessage("Admin role granted!");
        loadAdmins();
      } else {
        setMessage(json.error || "Failed to grant role");
      }
    } catch (err: any) {
      setMessage(err.message || "Error granting role");
    }
  }

  async function revoke(wallet: string) {
    setMessage("Revoking admin role…");

    try {
      const res = await fetch("/api/admin/roles/revoke", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ wallet }),
      });

      const json = await res.json();

      if (json.success) {
        setMessage("Admin role revoked!");
        loadAdmins();
      } else {
        setMessage(json.error || "Failed to revoke role");
      }
    } catch (err: any) {
      setMessage(err.message || "Error revoking role");
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-slate-300 text-lg">
        Loading admin roles…
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto p-8 space-y-8 text-slate-100">
      <AdminIdentityBanner />

      <h1 className="text-3xl font-semibold">Admin Role Management</h1>

      {message && (
        <div className="p-3 bg-blue-900/40 border border-blue-700 text-blue-300 rounded-lg">
          {message}
        </div>
      )}

      <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-6">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-slate-800 text-slate-400">
              <th className="py-2">Email</th>
              <th className="py-2">Wallet</th>
              <th className="py-2">Role</th>
              <th className="py-2">Actions</th>
            </tr>
          </thead>

          <tbody>
            {admins.map((a) => (
              <tr key={a.id} className="border-b border-slate-800">
                <td className="py-2 text-slate-300">{a.email}</td>
                <td className="py-2 text-slate-300">
                  {a.walletAddress || "None"}
                </td>
                <td className="py-2">
                  <span
                    className={`px-3 py-1 rounded-full text-white text-xs ${
                      a.role === "admin"
                        ? "bg-red-600"
                        : "bg-slate-600"
                    }`}
                  >
                    {a.role}
                  </span>
                </td>

                <td className="py-2 space-x-3">
                  <button
                    onClick={() => grant(a.walletAddress)}
                    className="px-3 py-1 bg-green-600 hover:bg-green-500 text-white rounded"
                  >
                    Grant Admin
                  </button>

                  <button
                    onClick={() => revoke(a.walletAddress)}
                    className="px-3 py-1 bg-red-600 hover:bg-red-500 text-white rounded"
                  >
                    Revoke Admin
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
