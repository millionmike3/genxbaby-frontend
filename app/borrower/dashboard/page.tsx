"use client";

import { useEffect, useState } from "react";

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

type DashboardResponse = {
  success: boolean;
  borrower: Borrower;
  latestApplication: Application | null;
  latestScore: Score | null;
  applications: Application[]; // NEW: timeline
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

function getDecision(score: Score | null, app: Application | null) {
  if (!score || !app) return "No Decision";

  const { riskScore, fraudScore, impulsivenessScore } = score;
  const dti = app.dti ?? 0;

  if (fraudScore >= 180) return "Declined (Fraud Risk)";
  if (riskScore >= 730 && dti < 35 && impulsivenessScore < 70)
    return "Approved";
  if (riskScore <= 620 || dti > 45 || impulsivenessScore > 90)
    return "Declined";
  return "Review";
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

/* ============================
   Fraud Flags
============================ */

function getFraudFlags(app: Application | null, score: Score | null) {
  if (!app || !score) return [];

  const flags: string[] = [];

  if (!app.employer) flags.push("Missing employer");
  if (!app.city) flags.push("Missing city");
  if (app.loanAmount > app.income * 3)
    flags.push("Loan amount exceeds 3× income");
  if ((app.dti ?? 0) > 45) flags.push("High DTI (>45%)");
  if (score.fraudScore > 150) flags.push("High fraud score");

  return flags;
}

/* ============================
   Persona Clustering
============================ */

function getPersona(app: Application | null, score: Score | null) {
  if (!app || !score) return "Unknown";

  const { loanAmount, income, dti } = app;
  const { riskScore, fraudScore, impulsivenessScore } = score;

  if (fraudScore > 150) return "Potential Fraud";
  if (impulsivenessScore > 90) return "High Impulsiveness";
  if (dti && dti > 45) return "High Risk";
  if (income < 3000 && loanAmount > 15000) return "Low Income / High Ask";
  if (riskScore > 720) return "Stable Earner";

  return "General Borrower";
}

/* ============================
   Gauge Component
============================ */

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

export default function BorrowerDashboardPage() {
  const [data, setData] = useState<DashboardResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch("/api/borrower/dashboard", {
          method: "GET",
          credentials: "include",
        });

        const json = await res.json();

        if (!res.ok) {
          setError(json.error || "Failed to load dashboard");
        } else {
          setData(json);
        }
      } catch {
        setError("Failed to load dashboard");
      } finally {
        setLoading(false);
      }
    }

    load();
  }, []);

  const borrower = data?.borrower ?? null;
  const app = data?.latestApplication ?? null;
  const score = data?.latestScore ?? null;
  const decision = getDecision(score, app);
  const fraudFlags = getFraudFlags(app, score);
  const persona = getPersona(app, score);

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <p className="text-slate-300">Loading dashboard...</p>
      </div>
    );
  }

  if (error || !borrower) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <p className="text-red-500 text-sm">{error || "Unauthorized"}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white pt-20 px-4 md:px-8 space-y-10">
      {/* ============================
          Borrower Profile Card
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
          Application Summary + Scores
      ============================= */}
      <div className="grid gap-6 md:grid-cols-3">
        {/* Application Summary */}
        <section className="md:col-span-2 bg-neutral-900 border border-neutral-700 rounded-xl p-5">
          <h2 className="text-lg font-semibold text-[#3CF46B] mb-3">
            Latest Application
          </h2>

          {app ? (
            <div className="space-y-2 text-sm text-slate-200">
              <div className="flex justify-between">
                <span>Loan Amount</span>
                <span className="font-semibold">{formatCurrency(app.loanAmount)}</span>
              </div>
              <div className="flex justify-between">
                <span>Monthly Income</span>
                <span className="font-semibold">{formatCurrency(app.income)}</span>
              </div>
              <div className="flex justify-between">
                <span>Employer</span>
                <span className="font-semibold">{app.employer || "—"}</span>
              </div>
              <div className="flex justify-between">
                <span>Rent / Mortgage</span>
                <span className="font-semibold">{formatCurrency(app.rent)}</span>
              </div>
              <div className="flex justify-between">
                <span>City</span>
                <span className="font-semibold">{app.city || "—"}</span>
              </div>
              <div className="flex justify-between">
                <span>DTI</span>
                <span className="font-semibold">{formatPercent(app.dti ?? null)}</span>
              </div>
              <div className="flex justify-between">
                <span>Status</span>
                <span className="font-semibold">{app.status}</span>
              </div>
            </div>
          ) : (
            <p className="text-sm text-slate-400">No applications yet.</p>
          )}

          <div className="mt-4">
            <a
              href="/borrower-app/application/start"
              className="inline-flex items-center justify-center bg-[#3CF46B] text-black font-semibold px-4 py-2 rounded-lg hover:bg-[#32d05f] transition text-sm"
            >
              Start New Application
            </a>
          </div>
        </section>

        {/* Scores + Decision */}
        <section className="bg-neutral-900 border border-neutral-700 rounded-xl p-5 space-y-4">
          <h2 className="text-lg font-semibold text-[#3CF46B]">Underwriting Scores</h2>

          {score ? (
            <>
              <Gauge label="Risk Score" value={score.riskScore} max={850} />
              <Gauge label="Fraud Score" value={score.fraudScore} max={200} />
              <Gauge label="Behavior Score" value={score.impulsivenessScore} max={150} />

              <div className="mt-4 border-t border-neutral-700 pt-3">
                <p className="text-xs text-slate-400 mb-1">Underwriting Decision</p>
                <p className={`text-sm font-semibold ${decisionColor(decision)}`}>
                  {decision}
                </p>
              </div>
            </>
          ) : (
            <p className="text-sm text-slate-400">No scores yet.</p>
          )}
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
        <h2 className="text-lg font-semibold text-[#3CF46B] mb-3">Documents Required</h2>

        <ul className="list-disc list-inside text-sm text-slate-200 space-y-1">
          <li>Government ID</li>
          <li>Paystubs (last 30 days)</li>
          <li>Bank Statements (last 60 days)</li>
          <li>W‑2 or 1099</li>
          <li>Utility Bill (proof of address)</li>
        </ul>

        <p className="text-xs text-slate-400 mt-3">
          Uploading documents will speed up underwriting and reduce fraud risk.
        </p>
      </section>

      {/* ============================
          Application Timeline
      ============================= */}
      <section className="bg-neutral-900 border border-neutral-700 rounded-xl p-5">
        <h2 className="text-lg font-semibold text-[#3CF46B] mb-3">Application Timeline</h2>

        {data?.applications?.length ? (
          <div className="space-y-4">
            {data.applications.map((a) => (
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
    </div>
  );
}
