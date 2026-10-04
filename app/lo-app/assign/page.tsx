"use client";

import { useEffect, useState } from "react";

export default function LoanOfficerAssignmentPage() {
  const [apps, setApps] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [loList, setLoList] = useState<any[]>([]);

  async function load() {
    const res = await fetch("/api/lo/pipeline", { cache: "no-store" });
    const data = await res.json();

    const loRes = await fetch("/api/admin/loan-officers");
    const loData = await loRes.json();

    if (data.success) setApps(data.applications);
    if (loData.success) setLoList(loData.loanOfficers);

    setLoading(false);
  }

  async function assign(appId: string, loId: string) {
    await fetch("/api/lo/assign", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ appId, loId }),
    });

    load();
  }

  useEffect(() => {
    load();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center">
        Loading borrower assignment...
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-slate-950 text-white p-10">
      <div className="max-w-5xl mx-auto space-y-10">
        <h1 className="text-3xl font-bold">Borrower Assignment</h1>
        <p className="text-slate-400">Assign borrowers to loan officers.</p>

        <div className="space-y-4">
          {apps.map((app) => (
            <div
              key={app.id}
              className="border border-slate-800 rounded p-4 flex justify-between"
            >
              <div>
                <p className="font-semibold">
                  {app.borrower?.firstName} {app.borrower?.lastName}
                </p>
                <p className="text-slate-400 text-sm">App ID: {app.id}</p>
                <p className="text-slate-400 text-sm">
                  Assigned LO: {app.assignedLO ?? "None"}
                </p>
              </div>

              <select
                className="bg-slate-900 border border-slate-700 rounded px-3 py-2 text-sm"
                onChange={(e) => assign(app.id, e.target.value)}
              >
                <option value="">Assign LO...</option>
                {loList.map((lo) => (
                  <option key={lo.id} value={lo.id}>
                    {lo.name}
                  </option>
                ))}
              </select>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
