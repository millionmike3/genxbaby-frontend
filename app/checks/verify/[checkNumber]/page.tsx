"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/api";

export default function VerifyCheckPage({ params }: { params: { checkNumber: string } }) {
  const { checkNumber } = params;

  const [check, setCheck] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    async function load() {
      try {
        const res = await api(`/checks/verify/${checkNumber}`);
        if (!res || res.error) {
          setNotFound(true);
        } else {
          setCheck(res);
        }
      } catch (err) {
        console.error("Failed to verify check:", err);
        setNotFound(true);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, [checkNumber]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-lg">
        Verifying check...
      </div>
    );
  }

  if (notFound) {
    return (
      <div className="min-h-screen flex items-center justify-center text-center p-6">
        <div className="bg-white p-8 rounded-xl shadow max-w-md">
          <h1 className="text-2xl font-bold mb-4">Check Not Found</h1>
          <p className="text-gray-600">
            No check exists with number <strong>{checkNumber}</strong>.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8 space-y-10">
      <h1 className="text-3xl font-bold">Check Verification</h1>

      <div className="bg-white p-6 rounded-xl shadow space-y-6 max-w-2xl">

        {/* Check Header */}
        <div className="flex justify-between items-center">
          <p className="text-xl font-semibold">Check #{check.checkNumber}</p>

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
        <div className="space-y-2">
          <p><strong>Payee:</strong> {check.payee}</p>
          <p><strong>Amount:</strong> ${check.amount}</p>
          <p><strong>Date:</strong> {check.date}</p>
          {check.memo && <p><strong>Memo:</strong> {check.memo}</p>}
        </div>

        {/* Signer */}
        <div className="space-y-1">
          <p><strong>Signer:</strong> {check.signer?.name}</p>
          <p><strong>Title:</strong> {check.signer?.title}</p>
        </div>

        {/* Bank Info */}
        <div className="space-y-1">
          <p><strong>Bank:</strong> {check.bankProfile.bankName}</p>
          <p><strong>Routing:</strong> {check.bankProfile.routingNumber}</p>
          <p><strong>Account:</strong> {check.bankProfile.accountNumber}</p>
        </div>

        {/* Fraud Flags */}
        {check.fraudFlags?.length > 0 && (
          <div className="pt-4 space-y-2">
            <h2 className="text-lg font-semibold text-red-700">Fraud Alerts</h2>
            {check.fraudFlags.map((flag: any) => (
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

        {/* Timestamp */}
        <p className="text-xs text-gray-500">
          Verified: {new Date().toLocaleString()}
        </p>
      </div>
    </div>
  );
}
