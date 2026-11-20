"use client";

import { useEffect, useState } from "react";

export default function UnderwriterDashboard() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  async function loadDashboard() {
    const token = localStorage.getItem("auth_token");

    if (!token) {
      window.location.href = "/login";
      return;
    }

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/underwriter/dashboard`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!res.ok) {
        window.location.href = "/login";
        return;
      }

      const data = await res.json();
      setUser(data.user);
    } catch (err) {
      console.error(err);
      window.location.href = "/login";
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadDashboard();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        Loading underwriting dashboard…
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-blue-900 text-white p-10">
      <h1 className="text-4xl font-bold mb-6">Underwriter Dashboard</h1>

      <div className="bg-blue-800 p-6 rounded-xl shadow-lg">
        <h2 className="text-xl font-semibold mb-4">
          Welcome, {user?.email}
        </h2>

        <p className="text-blue-200">
          You have access to underwriting intelligence, LLPA pricing, risk
          overlays, and borrower analysis.
        </p>

        <ul className="mt-6 space-y-3 text-blue-300">
          <li>• Run underwriting decisions</li>
          <li>• Review borrower profiles</li>
          <li>• Generate conditions</li>
          <li>• Access behavioral risk scores</li>
          <li>• Validate pricing & LLPA</li>
        </ul>
      </div>
    </div>
  );
}
