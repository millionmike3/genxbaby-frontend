"use client";

import { useEffect, useState } from "react";
import AdminIdentityBanner from "@/components/AdminIdentityBanner";

export default function AdminSettingsPage() {
  const [admin, setAdmin] = useState<any>(null);
  const [message, setMessage] = useState("");
  const [password, setPassword] = useState("");
  const [wallet, setWallet] = useState("");
  const [loading, setLoading] = useState(true);

  async function loadAdmin() {
    try {
      const res = await fetch("/api/admin/me");
      const json = await res.json();

      if (!res.ok || !json.admin) {
        setMessage(json.error || "Failed to load admin profile");
        setLoading(false);
        return;
      }

      setAdmin(json.admin);
      setWallet(json.admin.walletAddress || "");
    } catch (err) {
      console.error("ADMIN LOAD ERROR:", err);
      setMessage("Network error loading admin profile");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadAdmin();
  }, []);

  async function updatePassword() {
    try {
      setMessage("Updating password...");
      const res = await fetch("/api/admin/settings/update-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      const json = await res.json();
      setMessage(json.success ? "Password updated!" : json.error);
    } catch (err) {
      console.error("PASSWORD UPDATE ERROR:", err);
      setMessage("Failed to update password");
    }
  }

  async function updateWallet() {
    if (!wallet.startsWith("0x")) {
      setMessage("Wallet must start with 0x");
      return;
    }

    try {
      setMessage("Updating wallet...");
      const res = await fetch("/api/admin/settings/update-wallet", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ wallet }),
      });

      const json = await res.json();
      setMessage(json.success ? "Wallet updated!" : json.error);
    } catch (err) {
      console.error("WALLET UPDATE ERROR:", err);
      setMessage("Failed to update wallet");
    }
  }

  if (loading) {
    return <div className="p-6">Loading settings…</div>;
  }

  if (!admin) {
    return (
      <div className="p-6 text-red-500">
        Failed to load admin profile.
      </div>
    );
  }

  const created =
    admin.createdAt ? new Date(admin.createdAt).toLocaleString() : "—";

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <AdminIdentityBanner />

      <h1 className="text-2xl font-bold">Admin Settings</h1>

      {message && (
        <div className="p-3 bg-blue-100 text-blue-700 rounded">
          {message}
        </div>
      )}

      {/* Profile Card */}
      <div className="p-4 bg-white/10 rounded-xl text-white space-y-2">
        <h2 className="text-lg font-semibold">Profile</h2>
        <p>Email: {admin.email ?? "Unknown"}</p>
        <p>Role: {admin.role ?? "Unknown"}</p>
        <p>Wallet: {admin.walletAddress || "None"}</p>
        <p>Created: {created}</p>
      </div>

      {/* Change Password */}
      <div className="p-4 bg-white/10 rounded-xl text-white space-y-3">
        <h2 className="text-lg font-semibold">Change Password</h2>
        <input
          type="password"
          placeholder="New password"
          className="w-full p-2 rounded bg-white/20"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          onClick={updatePassword}
          className="px-4 py-2 bg-purple-700 rounded text-white"
        >
          Update Password
        </button>
      </div>

      {/* Wallet Address */}
      <div className="p-4 bg-white/10 rounded-xl text-white space-y-3">
        <h2 className="text-lg font-semibold">Wallet Address</h2>
        <input
          type="text"
          placeholder="0x..."
          className="w-full p-2 rounded bg-white/20"
          value={wallet}
          onChange={(e) => setWallet(e.target.value)}
        />
        <button
          onClick={updateWallet}
          className="px-4 py-2 bg-purple-700 rounded text-white"
        >
          Update Wallet
        </button>
      </div>
    </div>
  );
}
