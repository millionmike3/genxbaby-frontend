"use client";

import { useEffect, useState, useMemo } from "react";
import { useParams } from "next/navigation";

type ApplicationWithRelations = {
  id: string;
  status: string;
  loanAmount: number | null;
  propertyValue: number | null;
  incomeMonthly: number | null;
  debtsMonthly: number | null;
  borrower: {
    fullName: string | null;
    email: string | null;
    phone: string | null;
    ssn: string | null;
  };
  underwritingCase: {
    id: string;
    status: string;
    fraudScore: number | null;
    riskScore: number | null;
    routingScore: number | null;
  } | null;
};

export default function UnderwritingDashboardPage() {
  const { applicationId } = useParams();
  useEffect(() => {
    const es = new EventSource(
      `/api/underwriting/${applicationId}/events`
    );

    es.onmessage = (event) => {
  try {
    const data = JSON.parse(event.data);

    if (data.type === "UNDERWRITING_UPDATED") {
      setApp((prev) => ({
        ...prev!,
        underwritingCase: data.case
      }));
    }

  } catch (e) {
    console.error("Event parse error", e);
  }
};


    return () => {
      es.close();
    };
  }, [applicationId]);
  const [app, setApp] = useState<ApplicationWithRelations | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const res = await fetch(`/api/application/${applicationId}`);
      const data = await res.json();

      if (data.success) {
        setApp(data.data);
      }

      setLoading(false);
    }

    load();
  }, [applicationId]);

  const metrics = useMemo(() => {
    if (!app) return null;

    const income = app.incomeMonthly ?? 0;
    const debts = app.debtsMonthly ?? 0;
    const loanAmount = app.loanAmount ?? 0;
    const propertyValue = app.propertyValue ?? 0;

    const dti = income > 0 ? (debts / income) * 100 : null;
    const ltv = propertyValue > 0 ? (loanAmount / propertyValue) * 100 : null;

    const dtiBand =
      dti == null ? "N/A" :
      dti < 36 ? "Prime" :
      dti < 43 ? "Acceptable" :
      dti < 50 ? "Stressed" :
      "High Risk";

    const ltvBand =
      ltv == null ? "N/A" :
      ltv <= 80 ? "Conservative" :
      ltv <= 90 ? "Aggressive" :
      "High Risk";

    const fraudScore = app.underwritingCase?.fraudScore ?? null;
    const riskScore = app.underwritingCase?.riskScore ?? null;
    const routingScore = app.underwritingCase?.routingScore ?? null;

    const fraudBand =
      fraudScore == null ? "N/A" :
      fraudScore < 300 ? "Low" :
      fraudScore < 600 ? "Medium" :
      "High";

    const riskBand =
      riskScore == null ? "N/A" :
      riskScore < 300 ? "Prime" :
      riskScore < 600 ? "Near Prime" :
      "Subprime";

    const routingBand =
      routingScore == null ? "N/A" :
      routingScore < 300 ? "Retail" :
      routingScore < 600 ? "Broker" :
      "Specialty";

    const ausFinding =
      dti != null && ltv != null
        ? dti < 43 && ltv <= 90
          ? "Approve/Eligible"
          : dti < 50 && ltv <= 95
          ? "Refer/Eligible"
          : "Refer with Caution"
        : "Insufficient Data";

    const fraudFlags: string[] = [];
    if (fraudScore && fraudScore >= 600) fraudFlags.push("High fraud score");
    if (ltv && ltv > 95) fraudFlags.push("LTV > 95%");
    if (dti && dti > 50) fraudFlags.push("DTI > 50%");
    if (!fraudFlags.length) fraudFlags.push("No critical fraud flags detected");

    return {
      dti,
      ltv,
      dtiBand,
      ltvBand,
      fraudScore,
      riskScore,
      routingScore,
      fraudBand,
      riskBand,
      routingBand,
      ausFinding,
      fraudFlags,
    };
  }, [app]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        <p>Loading underwriting dashboard...</p>
      </div>
    );
  }

  if (!app || !metrics) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-400">
        <p>Application not found or insufficient data.</p>
      </div>
    );
  }

  const { borrower, underwritingCase } = app;

  return (
    <main className="min-h-screen bg-slate-950 text-white p-10">
      <div className="max-w-6xl mx-auto space-y-10">

        {/* Header */}
        <section className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Underwriting Dashboard</h1>
            <p className="text-slate-400 mt-2">
              Application {app.id} • Case {underwritingCase?.id ?? "N/A"}
            </p>
          </div>
          <div className="text-right">
            <p className="text-sm text-slate-400">Status</p>
            <p className="text-lg font-semibold">{underwritingCase?.status ?? app.status}</p>
          </div>
        </section>

        {/* Borrower Snapshot */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="border border-slate-800 rounded p-6 space-y-2">
            <h2 className="text-xl font-semibold">Borrower</h2>
            <p><strong>Name:</strong> {borrower.fullName}</p>
            <p><strong>Email:</strong> {borrower.email}</p>
            <p><strong>Phone:</strong> {borrower.phone}</p>
            <p><strong>SSN:</strong> {borrower.ssn}</p>
          </div>

          <div className="border border-slate-800 rounded p-6 space-y-2">
            <h2 className="text-xl font-semibold">Loan & Property</h2>
            <p><strong>Loan Amount:</strong> ${app.loanAmount?.toLocaleString()}</p>
            <p><strong>Property Value:</strong> ${app.propertyValue?.toLocaleString()}</p>
            <p><strong>Monthly Income:</strong> ${app.incomeMonthly?.toLocaleString()}</p>
            <p><strong>Monthly Debts:</strong> ${app.debtsMonthly?.toLocaleString()}</p>
          </div>
        </section>

        {/* Core Metrics: DTI & LTV */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="border border-slate-800 rounded p-6">
            <h3 className="text-lg font-semibold mb-2">DTI</h3>
            <p className="text-3xl font-bold">
              {metrics.dti != null ? `${metrics.dti.toFixed(1)}%` : "N/A"}
            </p>
            <p className="text-slate-400 mt-1">{metrics.dtiBand}</p>
          </div>

          <div className="border border-slate-800 rounded p-6">
            <h3 className="text-lg font-semibold mb-2">LTV</h3>
            <p className="text-3xl font-bold">
              {metrics.ltv != null ? `${metrics.ltv.toFixed(1)}%` : "N/A"}
            </p>
            <p className="text-slate-400 mt-1">{metrics.ltvBand}</p>
          </div>

          <div className="border border-slate-800 rounded p-6">
            <h3 className="text-lg font-semibold mb-2">AUS-style Finding</h3>
            <p className="text-xl font-bold">{metrics.ausFinding}</p>
          </div>
        </section>

        {/* Scores */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="border border-slate-800 rounded p-6">
            <h3 className="text-lg font-semibold mb-2">Fraud Score</h3>
            <p className="text-2xl font-bold">
              {metrics.fraudScore ?? "N/A"}
            </p>
            <p className="text-slate-400 mt-1">{metrics.fraudBand}</p>
          </div>

          <div className="border border-slate-800 rounded p-6">
            <h3 className="text-lg font-semibold mb-2">Risk Score</h3>
            <p className="text-2xl font-bold">
              {metrics.riskScore ?? "N/A"}
            </p>
            <p className="text-slate-400 mt-1">{metrics.riskBand}</p>
          </div>

          <div className="border border-slate-800 rounded p-6">
            <h3 className="text-lg font-semibold mb-2">Routing Score</h3>
            <p className="text-2xl font-bold">
              {metrics.routingScore ?? "N/A"}
            </p>
            <p className="text-slate-400 mt-1">{metrics.routingBand}</p>
          </div>
        </section>

        {/* Fraud Flags */}
        <section className="border border-slate-800 rounded p-6 space-y-3">
          <h2 className="text-xl font-semibold">Fraud Flags</h2>
          <ul className="list-disc list-inside text-slate-300">
            {metrics.fraudFlags.map((flag, idx) => (
              <li key={idx}>{flag}</li>
            ))}
          </ul>
        </section>

        {/* Timeline */}
        <section className="border border-slate-800 rounded p-6 space-y-3">
          <h2 className="text-xl font-semibold">Timeline</h2>
          <ul className="space-y-2 text-slate-300">
            <li>✓ Application Submitted</li>
            <li>✓ Borrower & 1003 Data Captured</li>
            <li>✓ Underwriting Case Opened</li>
            <li>⏳ Awaiting Underwriter Decision</li>
          </ul>
        </section>
        <button
  onClick={async () => {
    await fetch(`/api/underwriting/${applicationId}/run`, {
      method: "POST",
    });
    // then refetch application
  }}
  className="px-4 py-2 bg-blue-600 rounded text-white font-semibold"
>
  Run Underwriting Engine
</button>

      </div>
    </main>
  );
}
