"use client";

import { useEffect, useState } from "react";

interface BorrowerRow {
  id: string;
  fullName: string;
  email: string;
  latestApplication?: {
    id: string;
    loanAmount?: number;
    creditScore?: number;
    dti?: number;
    status?: string;
  };
  latestScore?: {
    fraudScore: number;
    riskScore: number;
    impulsivenessScore: number;
  };
}

export default function BorrowersPage() {
  const [search, setSearch] = useState("");
  const [borrowers, setBorrowers] = useState<BorrowerRow[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const res = await fetch("/api/admin/borrowers");
      const data = await res.json();
      setBorrowers(data.borrowers);
      setLoading(false);
    }
    load();
  }, []);

  const filtered = borrowers.filter((b) =>
    b.fullName.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6 space-y-8">
      {/* PAGE HEADER */}
      <div className="flex items-center justify-between">
        <h1 className="gx-text-primary text-2xl font-bold">Borrowers</h1>
      </div>

      {/* FILTERS */}
      <div className="gx-card p-6 grid grid-cols-1 md:grid-cols-4 gap-4">
        <div>
          <label className="gx-text-secondary text-sm">Search</label>
          <input
            type="text"
            placeholder="Search borrowers..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full mt-1 bg-[#111118] border border-[#2A2A33] rounded-lg px-3 py-2 gx-text-primary"
          />
        </div>

        <div>
          <label className="gx-text-secondary text-sm">Loan Status</label>
          <select className="w-full mt-1 bg-[#111118] border border-[#2A2A33] rounded-lg px-3 py-2 gx-text-primary">
            <option>All</option>
            <option>New</option>
            <option>In Review</option>
            <option>Approved</option>
            <option>Funded</option>
          </select>
        </div>

        <div>
          <label className="gx-text-secondary text-sm">Credit Score</label>
          <select className="w-full mt-1 bg-[#111118] border border-[#2A2A33] rounded-lg px-3 py-2 gx-text-primary">
            <option>Any</option>
            <option>700+</option>
            <option>650+</option>
            <option>600+</option>
          </select>
        </div>

        <div>
          <label className="gx-text-secondary text-sm">DTI Range</label>
          <select className="w-full mt-1 bg-[#111118] border border-[#2A2A33] rounded-lg px-3 py-2 gx-text-primary">
            <option>Any</option>
            <option>0–30%</option>
            <option>30–45%</option>
            <option>45–55%</option>
          </select>
        </div>
      </div>

      {/* BORROWERS TABLE */}
      <div className="gx-card p-6">
        <h2 className="gx-text-primary text-lg font-semibold mb-4">
          Borrower List
        </h2>

        {loading ? (
          <div className="gx-text-secondary text-sm">Loading...</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="gx-text-secondary text-sm border-b border-[#2A2A33]">
                  <th className="py-2">Name</th>
                  <th className="py-2">Loan Amount</th>
                  <th className="py-2">Credit Score</th>
                  <th className="py-2">DTI</th>
                  <th className="py-2">Behavior Score</th>
                  <th className="py-2">Status</th>
                  <th className="py-2 text-right">Action</th>
                </tr>
              </thead>

              <tbody className="gx-text-secondary">
                {filtered.map((b) => (
                  <tr
                    key={b.id}
                    className="border-b border-[#1A1A22] hover:bg-white/5 transition"
                  >
                    <td className="py-3">{b.fullName}</td>
                    <td className="py-3">
                      {b.latestApplication?.loanAmount
                        ? `$${b.latestApplication.loanAmount.toLocaleString()}`
                        : "—"}
                    </td>
                    <td className="py-3">
                      {b.latestApplication?.creditScore ?? "—"}
                    </td>
                    <td className="py-3">
                      {b.latestApplication?.dti
                        ? `${b.latestApplication.dti.toFixed(1)}%`
                        : "—"}
                    </td>
                    <td className="py-3">
                      <ScoreChip
                        score={b.latestScore?.impulsivenessScore ?? 0}
                      />
                    </td>
                    <td className="py-3">
                      <StatusBadge
                        status={b.latestApplication?.status ?? "New"}
                      />
                    </td>
                    <td className="py-3 text-right">
                      <a
                        href={`/admin/borrowers/${b.id}`}
                        className="gx-btn-secondary px-3 py-1 text-sm"
                      >
                        View
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

/* ---------------- COMPONENTS ---------------- */

function ScoreChip({ score }: { score: number }) {
  const color =
    score >= 95
      ? "bg-green-600"
      : score >= 90
      ? "bg-blue-600"
      : "bg-purple-600";

  return (
    <span
      className={`px-3 py-1 rounded-full text-white text-sm font-semibold ${color}`}
    >
      {score}
    </span>
  );
}

function StatusBadge({ status }: { status: string }) {
  const map: any = {
    New: "bg-blue-600",
    "In Review": "bg-yellow-600",
    Approved: "bg-green-600",
    Funded: "bg-purple-600",
  };

  return (
    <span
      className={`px-3 py-1 rounded-full text-white text-xs font-semibold ${map[status]}`}
    >
      {status}
    </span>
  );
}
