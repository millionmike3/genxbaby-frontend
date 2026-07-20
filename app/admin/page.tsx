"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/api";

export default function AdminDashboard() {
  const [stats, setStats] = useState<any>(null);
  const [recentActivity, setRecentActivity] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const res = await api("/admin/dashboard");
        setStats(res.stats);
        setRecentActivity(res.recentActivity);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  if (loading) return <div className="p-10 text-center">Loading...</div>;

  return (
    <div className="p-8 space-y-8">
      <h1 className="text-3xl font-bold">Admin Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="p-6 bg-white shadow rounded-xl">
          <h2 className="text-lg font-semibold">Total Users</h2>
          <p className="text-2xl font-bold mt-2">{stats.totalUsers}</p>
        </div>

        <div className="p-6 bg-white shadow rounded-xl">
          <h2 className="text-lg font-semibold">Total Checks</h2>
          <p className="text-2xl font-bold mt-2">{stats.totalChecks}</p>
        </div>

        <div className="p-6 bg-white shadow rounded-xl">
          <h2 className="text-lg font-semibold">Fraud Flags</h2>
          <p className="text-2xl font-bold mt-2">{stats.fraudFlags}</p>
        </div>

        <div className="p-6 bg-white shadow rounded-xl">
          <h2 className="text-lg font-semibold">Pending Reviews</h2>
          <p className="text-2xl font-bold mt-2">{stats.pendingReviews}</p>
        </div>
      </div>

      <h2 className="text-xl font-semibold mt-10">Recent Activity</h2>

      <div className="space-y-4">
        {recentActivity.map((item) => (
          <div key={item.id} className="p-4 bg-white shadow rounded-xl">
            <p className="font-semibold">{item.action}</p>
            <p className="text-sm text-gray-600">{item.timestamp}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
