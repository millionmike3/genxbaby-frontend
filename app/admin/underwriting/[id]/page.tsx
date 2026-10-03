"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

/* ============================
   Types
============================ */

type Borrower = {
  id: string;
  email: string;
  firstName: string | null;
  lastName: string | null;
  createdAt: string;
};

type Application = {
  id: string;
  loanAmount: number;
  income: number;
  employer: string | null;
  rent: number;
  city: string | null;
  dti: number | null;
  status: string;
  createdAt: string;
};

type Score = {
  id: string;
  fraudScore: number;
  riskScore: number;
  impulsivenessScore: number;
  createdAt: string;
};

type AdminDashboardResponse = {
  success: boolean;
  borrower: Borrower;
  application: Application;
  score: Score;
  fraudFlags: string[];
  persona: string;
  timeline: Application[];
  documents: {
    id: string;
    type: string;
    status: string;
    uploadedAt: string | null;
  }[];
};

/* ============================
   Helpers
============================ */

function formatCurrency(value: number | null | undefined) {
  if (value == null) return "-";
  return `$${value.toLocaleString()}`;
}

function formatPercent(value: number | null | undefined) {
  if (value == null) return "-";
  return `${value.toFixed(1)}%`;
}

function decisionColor(decision: string) {
  switch (decision) {
    case "Approved":
      return "text-[#3CF46B]";
    case "Declined":
    case "Declined (Fraud Risk)":
      return "text-red-500";
    case "Review":
      return "text-yellow-400";
    default:
      return "text-slate-300";
  }
}

function Gauge({ label, value, max }: { label: string; value: number; max: number }) {
  const pct = Math.min(100, Math.max(0, (value / max) * 100));

  return (
    <div className="space-y-1">
      <p className="text-xs text-slate-400">{label}</p>
      <div className="w-full h-3 bg-neutral-800 rounded-full overflow-hidden">
        <div
          className="h-full bg-[#3CF46B] transition-all"
          style={{ width: `${pct}%` }}
        />
      </div>
      <p className="text-xs text-slate-300">{value}</p>
    </div>
  );
}

/* ============================
   Main Component
============================ */

export default function AdminUnderwritingPage() {
  const params = useParams();
  const id = params.id as string;

  const [data, setData] = useState<AdminDashboardResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch(`/api/admin/underwriting/${id}`, {
          method: "GET",
          credentials: "include",
        });

        const json = await res.json();

        if (!res.ok) {
          setError(json.error || "Failed to load underwriting dashboard");
        } else {
          setData(json);
        }
      } catch {
        setError("Failed to load underwriting dashboard");
      } finally {
        setLoading(false);
      }
    }

    load();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <p className="text-slate-300">Loading underwriting dashboard...</p>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <p className="text-red-500 text-sm">{error || "Not found"}</p>
      </div>
    );
  }

  const { borrower, application, score, fraudFlags, persona, timeline, documents } = data;

  /* ============================
     Underwriting Decision Logic
  ============================= */

  const decision = (() => {
    const { riskScore, fraudScore, impulsivenessScore } = score;
    const dti = application.dti ?? 0;

    if (fraudScore >= 180) return "Declined (Fraud Risk)";
    if (riskScore >= 730 && dti < 35 && impulsivenessScore < 70)
      return "Approved";
    if (riskScore <= 620 || dti > 45 || impulsivenessScore > 90)
      return "Declined";
    return "Review";
  })();

  return (
    <div className="min-h-screen bg-black text-white pt-20 px-4 md:px-8 space-y-10">
      {/* ============================
          Header
      ============================= */}
      <header>
        <h1 className="text-3xl md:text-4xl font-bold text-[#3CF46B]">
          Underwriting Dashboard
        </h1>
        <p className="mt-2 text-sm text-slate-300">
          Reviewing application <span className="font-semibold">{application.id}</span>
        </p>
      </header>

      {/* ============================
          Borrower Profile
      ============================= */}
      <section className="bg-neutral-900 border border-neutral-700 rounded-xl p-5">
        <h2 className="text-xl font-semibold text-[#3CF46B] mb-3">
          Borrower Profile
        </h2>

        <div className="space-y-2 text-sm text-slate-200">
          <p><span className="text-slate-400">Name:</span> {borrower.firstName || borrower.email}</p>
          <p><span className="text-slate-400">Email:</span> {borrower.email}</p>
          <p><span className="text-slate-400">Member Since:</span> {new Date(borrower.createdAt).toLocaleDateString()}</p>
          <p><span className="text-slate-400">Persona:</span> {persona}</p>
        </div>
      </section>

      {/* ============================
          Application + Scores
      ============================= */}
      <div className="grid gap-6 md:grid-cols-3">
        {/* Application Summary */}
        <section className="md:col-span-2 bg-neutral-900 border border-neutral-700 rounded-xl p-5">
          <h2 className="text-lg font-semibold text-[#3CF46B] mb-3">
            Application Details
          </h2>

          <div className="space-y-2 text-sm text-slate-200">
            <div className="flex justify-between">
              <span>Loan Amount</span>
              <span className="font-semibold">{formatCurrency(application.loanAmount)}</span>
            </div>
            <div className="flex justify-between">
              <span>Income</span>
              <span className="font-semibold">{formatCurrency(application.income)}</span>
            </div>
            <div className="flex justify-between">
              <span>Employer</span>
              <span className="font-semibold">{application.employer || "—"}</span>
            </div>
            <div className="flex justify-between">
              <span>Rent</span>
              <span className="font-semibold">{formatCurrency(application.rent)}</span>
            </div>
            <div className="flex justify-between">
              <span>City</span>
              <span className="font-semibold">{application.city || "—"}</span>
            </div>
            <div className="flex justify-between">
              <span>DTI</span>
              <span className="font-semibold">{formatPercent(application.dti)}</span>
            </div>
            <div className="flex justify-between">
              <span>Status</span>
              <span className="font-semibold">{application.status}</span>
            </div>
          </div>
        </section>

        {/* Scores */}
        <section className="bg-neutral-900 border border-neutral-700 rounded-xl p-5 space-y-4">
          <h2 className="text-lg font-semibold text-[#3CF46B]">Scores</h2>

          <Gauge label="Risk Score" value={score.riskScore} max={850} />
          <Gauge label="Fraud Score" value={score.fraudScore} max={200} />
          <Gauge label="Behavior Score" value={score.impulsivenessScore} max={150} />

          <div className="mt-4 border-t border-neutral-700 pt-3">
            <p className="text-xs text-slate-400 mb-1">Underwriting Decision</p>
            <p className={`text-sm font-semibold ${decisionColor(decision)}`}>
              {decision}
            </p>
          </div>
        </section>
      </div>

      {/* ============================
          Fraud Flags
      ============================= */}
      <section className="bg-neutral-900 border border-neutral-700 rounded-xl p-5">
        <h2 className="text-lg font-semibold text-[#3CF46B] mb-3">Fraud Flags</h2>

        {fraudFlags.length > 0 ? (
          <ul className="list-disc list-inside text-sm text-red-400 space-y-1">
            {fraudFlags.map((flag, idx) => (
              <li key={idx}>{flag}</li>
            ))}
          </ul>
        ) : (
          <p className="text-sm text-slate-400">No fraud indicators detected.</p>
        )}
      </section>

      {/* ============================
          Documents Required
      ============================= */}
      <section className="bg-neutral-900 border border-neutral-700 rounded-xl p-5">
        <h2 className="text-lg font-semibold text-[#3CF46B] mb-3">Documents</h2>

        {documents.length ? (
          <ul className="space-y-2 text-sm text-slate-200">
            {documents.map((doc) => (
              <li key={doc.id} className="flex justify-between">
                <span>{doc.type}</span>
                <span className="text-slate-400">{doc.status}</span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-sm text-slate-400">No documents uploaded.</p>
        )}
      </section>

      {/* ============================
          Application Timeline
      ============================= */}
      <section className="bg-neutral-900 border border-neutral-700 rounded-xl p-5">
        <h2 className="text-lg font-semibold text-[#3CF46B] mb-3">Application Timeline</h2>

        {timeline.length ? (
          <div className="space-y-4">
            {timeline.map((a) => (
              <div key={a.id} className="border-b border-neutral-700 pb-3">
                <p className="text-sm text-slate-200">
                  <span className="font-semibold">{formatCurrency(a.loanAmount)}</span>{" "}
                  requested on{" "}
                  {new Date(a.createdAt).toLocaleDateString()}
                </p>
                <p className="text-xs text-slate-400">Status: {a.status}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-slate-400">No past applications.</p>
        )}
      </section>

      {/* ============================
          Admin Actions
      ============================= */}
      <section className="bg-neutral-900 border border-neutral-700 rounded-xl p-5">
        <h2 className="text-lg font-semibold text-[#3CF46B] mb-3">Actions</h2>

        <div className="flex gap-4">
          <button className="bg-[#3CF46B] text-black font-semibold px-4 py-2 rounded-lg hover:bg-[#32d05f] transition">
            Approve
          </button>

          <button className="bg-red-600 text-white font-semibold px-4 py-2 rounded-lg hover:bg-red-500 transition">
            Decline
          </button>

          <button className="bg-yellow-500 text-black font-semibold px-4 py-2 rounded-lg hover:bg-yellow-400 transition">
            Request Documents
          </button>
        </div>
      </section>
    </div>
  );
}
