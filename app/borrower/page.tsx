"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/api";

export default function BorrowerDashboard() {
  const [profile, setProfile] = useState<any>(null);
  const [application, setApplication] = useState<any>(null);
  const [status, setStatus] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const res = await api("/borrower/dashboard");
        setProfile(res.profile);
        setApplication(res.application);
        setStatus(res.status);
      } catch (err) {
        console.error("Failed to load borrower dashboard:", err);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-lg">
        Loading borrower dashboard...
      </div>
    );
  }

  return (
    <div className="p-8 space-y-10">
      <h1 className="text-3xl font-bold">Borrower Dashboard</h1>

      {/* Borrower Profile */}
      <div className="p-6 bg-white shadow rounded-xl">
        <h2 className="text-xl font-semibold mb-4">Your Profile</h2>

        <div className="space-y-2">
          <p><strong>Name:</strong> {profile.name}</p>
          <p><strong>Email:</strong> {profile.email}</p>
          <p><strong>Phone:</strong> {profile.phone}</p>
        </div>
      </div>

      {/* Loan Application */}
      <div className="p-6 bg-white shadow rounded-xl">
        <h2 className="text-xl font-semibold mb-4">Loan Application</h2>

        {application ? (
          <div className="space-y-2">
            <p><strong>Amount Requested:</strong> ${application.amount}</p>
            <p><strong>Purpose:</strong> {application.purpose}</p>
            <p><strong>Status:</strong> {application.status}</p>
          </div>
        ) : (
          <p>You have not started an application yet.</p>
        )}
      </div>

      {/* Underwriting Status */}
      <div className="p-6 bg-white shadow rounded-xl">
        <h2 className="text-xl font-semibold mb-4">Underwriting Status</h2>

        {status ? (
          <div className="space-y-2">
            <p><strong>Documents Verified:</strong> {status.documentsVerified ? "Yes" : "No"}</p>
            <p><strong>Risk Score:</strong> {status.riskScore}</p>
            <p><strong>Funding Progress:</strong> {status.fundingProgress}%</p>
          </div>
        ) : (
          <p>No underwriting data available.</p>
        )}
      </div>
    </div>
  );
}
