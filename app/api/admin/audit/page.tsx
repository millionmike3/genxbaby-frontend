"use client";

import { useEffect, useState } from "react";
import AdminIdentityBanner from "@/components/AdminIdentityBanner";

export default function AuditPage() {
  const [logs, setLogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch("/api/admin/audit/list");
        const json = await res.json();

        if (!res.ok) {
          setError(json.error || "Failed to load logs");
        } else {
          setLogs(json.logs || []);
        }
      } catch (err) {
        console.error("AUDIT FETCH ERROR:", err);
        setError("Network error");
      }

      setLoading(false);
    }

    load();
  }, []);

  if (loading) {
    return <div className="p-6">Loading audit logs…</div>;
  }

  if (error) {
    return (
      <div className="p-6 text-red-500">
        <AdminIdentityBanner />
        <h1 className="text-xl font-bold mb-2">Audit Logs</h1>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-6">
      <AdminIdentityBanner />

      <h1 className="text-2xl font-bold">Audit Logs</h1>

      <table className="w-full text-left">
        <thead>
          <tr className="border-b">
            <th className="py-2">Admin</th>
            <th className="py-2">Action</th>
            <th className="py-2">Metadata</th>
            <th className="py-2">IP</th>
            <th className="py-2">Time</th>
          </tr>
        </thead>

        <tbody>
          {logs.map((log) => {
            const adminEmail = log.admin?.email ?? "Unknown";
            const adminWallet = log.admin?.walletAddress ?? "—";

            const created =
              log.createdAt
                ? new Date(log.createdAt).toLocaleString()
                : "—";

            const metadata =
              log.metadata && typeof log.metadata === "object"
                ? JSON.stringify(log.metadata, null, 2)
                : "—";

            return (
              <tr key={log.id} className="border-b">
                <td className="py-2">
                  {adminEmail}
                  <br />
                  <span className="text-xs text-gray-500">
                    {adminWallet}
                  </span>
                </td>

                <td className="py-2">{log.action ?? "—"}</td>

                <td className="py-2 text-xs">
                  <pre className="bg-gray-100 p-2 rounded whitespace-pre-wrap break-all">
                    {metadata}
                  </pre>
                </td>

                <td className="py-2">{log.ip ?? "—"}</td>

                <td className="py-2">{created}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
