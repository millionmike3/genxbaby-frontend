"use client";

import { useEffect, useState } from "react";

export default function OwnerDashboardPage() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch("/api/owner/dashboard", {
          method: "GET",
          credentials: "include",
        });

        const json = await res.json();
        setData(json);
      } catch (err) {
        console.error("Failed to load owner dashboard:", err);
        setData({ success: false });
      } finally {
        setLoading(false);
      }
    }

    load();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <p className="text-slate-300">Loading owner dashboard…</p>
      </div>
    );
  }

  if (!data?.success) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <p className="text-red-500 text-sm">Failed to load owner dashboard</p>
      </div>
    );
  }

  const { owner, properties } = data;

  return (
    <div className="min-h-screen bg-black text-white pt-20 px-6 space-y-10">
      {/* Header */}
      <header>
        <h1 className="text-3xl font-bold text-[#3CF46B]">Owner Dashboard</h1>
        <p className="text-slate-400 mt-2">Welcome back, {owner.fullName}</p>
      </header>

      {/* Properties */}
      <section className="bg-neutral-900 border border-neutral-700 rounded-xl p-6">
        <h2 className="text-lg font-semibold text-[#3CF46B] mb-4">
          Your Properties
        </h2>

        {properties.length === 0 ? (
          <p className="text-slate-400">No properties found.</p>
        ) : (
          <ul className="space-y-6">
            {properties.map((p: any) => (
              <li
                key={p.id}
                className="border border-neutral-800 rounded-lg p-4 bg-neutral-800/40"
              >
                <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
                  {/* Property Info */}
                  <div>
                    <p className="font-semibold text-slate-200">
                      {p.address}, {p.city}, {p.state} {p.zip}
                    </p>
                    <p className="text-slate-400 text-sm">
                      Value: ${p.value?.toLocaleString() ?? "—"}
                    </p>
                    <p className="text-slate-400 text-sm">
                      Cashflow: ${p.cashflow?.toLocaleString() ?? "—"}
                    </p>
                  </div>

                  {/* Tenants / Payments / Maintenance */}
                  <div className="text-right">
                    <p className="text-[#3CF46B] font-bold text-lg">
                      Tenants: {p.tenants?.length ?? 0}
                    </p>
                    <p className="text-slate-400 text-sm">
                      Payments: {p.payments?.length ?? 0}
                    </p>
                    <p className="text-slate-400 text-sm">
                      Maintenance: {p.maintenance?.length ?? 0}
                    </p>
                  </div>
                </div>

                {/* Maintenance Requests */}
                {p.maintenance?.length > 0 && (
                  <div className="mt-4">
                    <h3 className="text-sm font-semibold text-[#3CF46B] mb-2">
                      Maintenance Requests
                    </h3>
                    <ul className="space-y-2 text-sm text-slate-300">
                      {p.maintenance.map((m: any) => (
                        <li key={m.id} className="flex justify-between">
                          <span>{m.description}</span>
                          <span
                            className={
                              m.status === "open"
                                ? "text-yellow-400"
                                : "text-[#3CF46B]"
                            }
                          >
                            {m.status}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
