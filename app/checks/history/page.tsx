"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/api";

export default function CheckHistoryPage() {
  const [checks, setChecks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const res = await api("/checks/history");
        setChecks(res);
      } catch (err) {
        console.error("Failed to load check history:", err);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-lg">
        Loading check history...
      </div>
    );
  }

  return (
    <div className="p-8 space-y-10">
      <h1 className="text-3xl font-bold">Check History</h1>

      {checks.length === 0 && (
        <p className="text-gray-600">No checks have been created yet.</p>
      )}

      <div className="space-y-6">
        {checks.map((check) => (
          <div
            key={check.id}
            className="border p-6 rounded-xl bg-white shadow space-y-4"
          >
            {/* Header */}
            <div className="flex justify-between items-center">
              <p className="font-semibold text-xl">
                Check #{check.checkNumber}
              </p>

              <span
                className={`px-3 py-1 rounded text-sm font-semibold ${
                  check.status === "valid"
                    ? "bg-green-200 text-green-800"
                    : check.status === "voided"
                    ? "bg-red-200 text-red-800"
                    : "bg-yellow-200 text-yellow-800"
                }`}
              >
                {check.status.toUpperCase()}
              </span>
            </div>

            {/* Check Details */}
            <div className="space-y-1">
              <p><strong>Payee:</strong> {check.payee}</p>
              <p><strong>Amount:</strong> ${check.amount}</p>
              <p><strong>Date:</strong> {check.date}</p>
              {check.memo && <p><strong>Memo:</strong> {check.memo}</p>}
            </div>

            {/* Signer */}
            <div>
              <p>
                <strong>Signer:</strong> {check.signer?.name} ({check.signer?.title})
              </p>
            </div>

            {/* Bank Info */}
            <div className="space-y-1">
              <p><strong>Bank:</strong> {check.bankProfile.bankName}</p>
              <p><strong>Routing:</strong> {check.bankProfile.routingNumber}</p>
              <p><strong>Account:</strong> {check.bankProfile.accountNumber}</p>
            </div>

            {/* Created Timestamp */}
            <p className="text-xs text-gray-500">
              Created: {new Date(check.createdAt).toLocaleString()}
            </p>

            {/* Fraud Flags */}
            {check.fraudFlags?.length > 0 && (
  <div className="mt-2 space-y-1">
    {check.fraudFlags.map((flag: { id: string; message: string; severity: string }) => (
      <p
        key={flag.id}
        className={`text-sm ${
          flag.severity === "critical"
            ? "text-red-700"
            : flag.severity === "warning"
            ? "text-yellow-700"
            : "text-gray-600"
        }`}
      >
        ⚠️ {flag.message}
      </p>
    ))}
  </div>
)}


            {/* Verify Link */}
            <div className="pt-2">
              <a
                href={`/checks/verify/${check.checkNumber}`}
                className="text-blue-600 underline font-medium"
              >
                Verify Check
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
