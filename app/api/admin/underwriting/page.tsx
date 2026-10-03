"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type Borrower = {
  id: string;
  email: string;
  firstName: string | null;
  lastName: string | null;
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

type Item = {
  application: Application;
  borrower: Borrower;
  score: Score | null;
};

type ListResponse = {
  success: boolean;
  items: Item[];
};

function formatCurrency(value: number | null | undefined) {
  if (value == null) return "-";
  return `$${value.toLocaleString()}`;
}

function formatPercent(value: number | null | undefined) {
  if (value == null) return "-";
  return `${value.toFixed(1)}%`;
}

function decisionFromScore(score: Score | null, app: Application) {
  if (!score) return "No Scores";

  const { riskScore, fraudScore, impulsivenessScore } = score;
  const dti = app.dti ?? 0;

  if (fraudScore >= 180) return "Declined (Fraud)";
  if (riskScore >= 730 && dti < 35 && impulsivenessScore < 70) return "Approved";
  if (riskScore <= 620 || dti > 45 || impulsivenessScore > 90) return "Declined";
  return "Review";
}

function decisionColor(decision: string) {
  switch (decision) {
    case "Approved":
      return "text-[#3CF46B]";
    case "Declined":
    case "Declined (Fraud)":
      return "text-red-500";
    case "Review":
      return "text-yellow-400";
    default:
      return "text-slate-300";
  }
}

export default function AdminUnderwritingHomePage() {
  const [data, setData] = useState<ListResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch("/api/admin/underwriting/list", {
          method: "GET",
          credentials: "include",
        });

        const json = await res.json();

        if (!res.ok) {
          setError(json.error || "Failed to load applications");
        } else {
          setData(json);
        }
      } catch {
        setError("Failed to load applications");
      } finally {
        setLoading(false);
      }
    }

    load();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <p className="text-slate-300">Loading applications...</p>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <p className="text-red-500 text-sm">{error || "Error"}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white pt-20 px-4 md:px-8">
      <header className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-[#3CF46B]">
          Underwriting Queue
        </h1>
        <p className="mt-2 text-sm text-slate-300">
          All borrower applications, sorted by newest first.
        </p>
      </header>

      <div className="bg-neutral-900 border border-neutral-700 rounded-xl overflow-hidden">
        <div className="grid grid-cols-6 gap-3 px-4 py-3 text-xs font-semibold text-slate-300 border-b border-neutral-700">
          <span>Borrower</span>
          <span>Loan</span>
          <span>DTI</span>
          <span>Risk / Fraud</span>
          <span>Status</span>
          <span>Action</span>
        </div>

        {data.items.length === 0 && (
          <div className="px-4 py-4 text-sm text-slate-400">
            No applications found.
          </div>
        )}

        {data.items.map(({ application, borrower, score }) => {
          const decision = decisionFromScore(score, application);

          return (
            <div
              key={application.id}
              className="grid grid-cols-6 gap-3 px-4 py-3 text-xs border-b border-neutral-800 hover:bg-neutral-800/60 transition"
            >
              <div className="flex flex-col">
                <span className="text-slate-100">
                  {borrower.firstName || borrower.email}
                </span>
                <span className="text-slate-500">{borrower.email}</span>
              </div>

              <div className="flex flex-col">
                <span className="text-slate-100">
                  {formatCurrency(application.loanAmount)}
                </span>
                <span className="text-slate-500">
                  Income: {formatCurrency(application.income)}
                </span>
              </div>

              <div className="flex flex-col">
                <span className="text-slate-100">
                  {formatPercent(application.dti)}
                </span>
                <span className="text-slate-500">
                  Rent: {formatCurrency(application.rent)}
                </span>
              </div>

              <div className="flex flex-col">
                <span className="text-slate-100">
                  {score ? `${score.riskScore} / ${score.fraudScore}` : "—"}
                </span>
                <span className="text-slate-500">
                  {score ? `Beh: ${score.impulsivenessScore}` : ""}
                </span>
              </div>

              <div className="flex flex-col">
                <span className="text-slate-100">{application.status}</span>
                <span className={`font-semibold ${decisionColor(decision)}`}>
                  {decision}
                </span>
              </div>

              <div className="flex items-center">
                <Link
                  href={`/admin/underwriting/${application.id}`}
                  className="inline-flex items-center justify-center bg-[#3CF46B] text-black font-semibold px-3 py-1 rounded-md hover:bg-[#32d05f] transition"
                >
                  Review
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
