"use client";

import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

export default function AdminUsersPage() {
  const [users, setUsers] = useState<any[]>([]);
  const [roles, setRoles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const [resetUser, setResetUser] = useState<any | null>(null);
  const [newPassword, setNewPassword] = useState("");

  useEffect(() => {
    async function load() {
      const base = process.env.NEXT_PUBLIC_UNDERWRITING_API;

      const usersRes = await fetch(`${base}/api/admin/users/list`, {
        headers: { "x-user-id": localStorage.getItem("userId") || "" }
      });
      const rolesRes = await fetch(`${base}/api/admin/users/roles`, {
        headers: { "x-user-id": localStorage.getItem("userId") || "" }
      });

      const usersJson = await usersRes.json();
      const rolesJson = await rolesRes.json();

      setUsers(usersJson.users || []);
      setRoles(rolesJson.roles || []);
      setLoading(false);
    }

    load();
  }, []);

  async function updateRole(userId: string, roleId: string) {
    const base = process.env.NEXT_PUBLIC_UNDERWRITING_API;

    await fetch(`${base}/api/admin/users/update-role`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-user-id": localStorage.getItem("userId") || ""
      },
      body: JSON.stringify({ targetUserId: userId, roleId })
    });

    toast.success("Role updated");
  }

  async function resetPassword() {
    const base = process.env.NEXT_PUBLIC_UNDERWRITING_API;

    await fetch(`${base}/api/admin/users/reset-password`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-user-id": localStorage.getItem("userId") || ""
      },
      body: JSON.stringify({
        targetUserId: resetUser.id,
        newPassword
      })
    });

    toast.success("Password reset");
    setResetUser(null);
    setNewPassword("");
  }

  if (loading) return <div className="p-6">Loading users…</div>;

  return (
    <div className="p-6 space-y-10">
      <h1 className="text-3xl font-semibold">Admin User Management</h1>

      <div className="overflow-auto border rounded bg-white">
        <table className="w-full text-left">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3">User ID</th>
              <th className="p-3">Email</th>
              <th className="p-3">Role</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>

          <tbody>
            {users.map((u) => {
              const currentRole = u.UserRole?.[0]?.Role?.id || "";

              return (
                <tr key={u.id} className="border-t">
                  <td className="p-3">{u.id}</td>
                  <td className="p-3">{u.email}</td>

                  <td className="p-3">
                    <select
                      defaultValue={currentRole}
                      onChange={(e) => updateRole(u.id, e.target.value)}
                      className="border rounded p-2"
                    >
                      {roles.map((r) => (
                        <option key={r.id} value={r.id}>
                          {r.name}
                        </option>
                      ))}
                    </select>
                  </td>

                  <td className="p-3">
                    <button
                      onClick={() => setResetUser(u)}
                      className="px-3 py-1 bg-red-600 text-white rounded"
                    >
                      Reset Password
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Reset Password Modal */}
      {resetUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded shadow-lg w-96 space-y-4">
            <h2 className="text-xl font-semibold">
              Reset Password for {resetUser.email}
            </h2>

            <input
              type="text"
              placeholder="New password"
              className="border rounded p-2 w-full"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />

            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setResetUser(null)}
                className="px-4 py-2 bg-gray-300 rounded"
              >
                Cancel
              </button>

              <button
                onClick={resetPassword}
                className="px-4 py-2 bg-blue-600 text-white rounded"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
