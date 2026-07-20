"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/api";

export default function OwnerDashboard() {
  const [stats, setStats] = useState<any>(null);
  const [properties, setProperties] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const res = await api("/owner/dashboard");
        setStats(res.stats);
        setProperties(res.properties);
      } catch (err) {
        console.error("Failed to load owner dashboard:", err);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-lg">
        Loading owner dashboard...
      </div>
    );
  }

  return (
    <div className="p-8 space-y-10">
      <h1 className="text-3xl font-bold">Owner Dashboard</h1>

      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 bg-white shadow rounded-xl">
          <h2 className="text-lg font-semibold">Total Properties</h2>
          <p className="text-2xl font-bold mt-2">{stats.totalProperties}</p>
        </div>

        <div className="p-6 bg-white shadow rounded-xl">
          <h2 className="text-lg font-semibold">Total Rent</h2>
          <p className="text-2xl font-bold mt-2">${stats.totalRent}</p>
        </div>

        <div className="p-6 bg-white shadow rounded-xl">
          <h2 className="text-lg font-semibold">Active Tenants</h2>
          <p className="text-2xl font-bold mt-2">{stats.activeTenants}</p>
        </div>
      </div>

      {/* Properties Section */}
      <h2 className="text-xl font-semibold">Your Properties</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {properties.map((p) => (
          <div key={p.id} className="p-6 bg-white shadow rounded-xl">
            <h3 className="text-lg font-bold">{p.address}</h3>
            <p className="mt-2">Rent: ${p.rent}</p>
            <p>Status: {p.status}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
