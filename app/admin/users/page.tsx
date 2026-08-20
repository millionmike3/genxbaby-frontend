"use client";

import { useEffect, useState } from "react";
import AdminIdentityBanner from "@/components/AdminIdentityBanner";
import { api } from "@/lib/api";

export default function AdminUsersPage() {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user");
  const [message, setMessage] = useState("");

  async function loadUsers() {
    try {
      const res = await api("/users");
      setUsers(res);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadUsers();
  }, []);

  async function handleCreateUser(e: React.FormEvent) {
    e.preventDefault();
    setMessage("");

    try {
      const res = await api("/auth/register", {
        method: "POST",
        body: JSON.stringify({ username, email, password, role }),
      });

      setMessage(`User created: ${res.username}`);

      const updated = await api("/users");
      setUsers(updated);

      setUsername("");
      setEmail("");
      setPassword("");
      setRole("user");
    } catch (err: any) {
      setMessage(err.message || "Error creating user");
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-xl text-slate-300">
        Loading users…
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-8 space-y-8">
      <AdminIdentityBanner />

      <h1 className="text-3xl font-semibold">User Management</h1>

      {message && (
        <div className="p-3 bg-blue-900/40 border border-blue-700 text-blue-300 rounded-lg">
          {message}
        </div>
      )}

      {/* Create User */}
      <div className="border border-slate-800 bg-slate-900/60 p-6 rounded-xl">
        <h2 className="text-xl font-semibold mb-4">Create New User</h2>

        <form
          onSubmit={handleCreateUser}
          className="grid grid-cols-1 md:grid-cols-4 gap-4"
        >
          <input
            type="text"
            placeholder="Username"
            className="border border-slate-700 bg-slate-800 rounded-lg px-3 py-2"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />

          <input
            type="email"
            placeholder="Email"
            className="border border-slate-700 bg-slate-800 rounded-lg px-3 py-2"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Password"
            className="border border-slate-700 bg-slate-800 rounded-lg px-3 py-2"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <select
            className="border border-slate-700 bg-slate-800 rounded-lg px-3 py-2"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            <option value="user">User</option>
            <option value="borrower">Borrower</option>
            <option value="investor">Investor</option>
            <option value="owner">Owner</option>
            <option value="admin">Admin</option>
          </select>

          <button
            type="submit"
            className="md:col-span-4 bg-emerald-600 hover:bg-emerald-500 text-white py-2 rounded-lg font-semibold"
          >
            Create User
          </button>
        </form>
      </div>

      {/* User List */}
      <div className="border border-slate-800 bg-slate-900/60 p-6 rounded-xl">
        <h2 className="text-xl font-semibold mb-4">All Users</h2>

        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-slate-800 text-slate-400">
              <th className="py-2">ID</th>
              <th className="py-2">Username</th>
              <th className="py-2">Email</th>
              <th className="py-2">Role</th>
              <th className="py-2">XP</th>
              <th className="py-2">Created</th>
            </tr>
          </thead>

          <tbody>
            {users.map((u, idx) => (
              <tr key={idx} className="border-b border-slate-800">
                <td className="py-2">{u.id}</td>
                <td className="py-2">{u.username}</td>
                <td className="py-2">{u.email}</td>
                <td className="py-2">
                  <span
                    className={`px-3 py-1 rounded-full text-white text-xs ${
                      u.role === "admin"
                        ? "bg-red-600"
                        : u.role === "investor"
                        ? "bg-blue-600"
                        : u.role === "borrower"
                        ? "bg-green-600"
                        : u.role === "owner"
                        ? "bg-purple-600"
                        : "bg-gray-600"
                    }`}
                  >
                    {u.role}
                  </span>
                </td>
                <td className="py-2">{u.xp}</td>
                <td className="py-2">{u.created_at}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
