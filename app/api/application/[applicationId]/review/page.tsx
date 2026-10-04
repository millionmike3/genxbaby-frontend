"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

export default function ApplicationViewerPage() {
  const { applicationId } = useParams();
  const [app, setApp] = useState(null);
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

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        <p>Loading application...</p>
      </div>
    );
  }

  if (!app) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-400">
        <p>Application not found.</p>
      </div>
    );
  }

  const borrower = app.borrower;
  const uw = app.underwritingCase;

  return (
    <main className="min-h-screen bg-slate-950 text-white p-10">
      <div className="max-w-5xl mx-auto space-y-10">

        {/* Header */}
        <section>
          <h1 className="text-4xl font-bold">Application Viewer</h1>
          <p className="text-slate-400 mt-2">
            Review all details submitted in the 1003.
          </p>
        </section>

        {/* IDs */}
        <section className="border border-slate-800 rounded p-6 space-y-2">
          <h2 className="text-xl font-semibold">Identifiers</h2>
          <p><strong>Application ID:</strong> {app.id}</p>
          <p><strong>Underwriting Case ID:</strong> {uw?.id ?? "Not Created"}</p>
          <p><strong>Status:</strong> {app.status}</p>
        </section>

        {/* Borrower Info */}
        <section className="border border-slate-800 rounded p-6 space-y-4">
          <h2 className="text-xl font-semibold">Borrower Information</h2>
          <p><strong>Name:</strong> {borrower.fullName}</p>
          <p><strong>Email:</strong> {borrower.email}</p>
          <p><strong>Phone:</strong> {borrower.phone}</p>
          <p><strong>DOB:</strong> {new Date(borrower.dob).toLocaleDateString()}</p>
          <p><strong>Citizenship:</strong> {borrower.citizenship}</p>
        </section>

        {/* Loan Info */}
        <section className="border border-slate-800 rounded p-6 space-y-4">
          <h2 className="text-xl font-semibold">Loan Details</h2>
          <p><strong>Loan Amount:</strong> ${app.loanAmount?.toLocaleString()}</p>
          <p><strong>Loan Purpose:</strong> {app.loanPurpose}</p>
          <p><strong>Units:</strong> {app.units}</p>
          <p><strong>Occupancy:</strong> {app.occupancy}</p>
          <p><strong>Property Type:</strong> {app.propertyType}</p>
        </section>

        {/* Property Info */}
        <section className="border border-slate-800 rounded p-6 space-y-4">
          <h2 className="text-xl font-semibold">Property Information</h2>
          <p><strong>Address:</strong> {app.propertyAddress}</p>
          <p><strong>City:</strong> {app.propertyCity}</p>
          <p><strong>State:</strong> {app.propertyState}</p>
          <p><strong>Zip:</strong> {app.propertyZip}</p>
          <p><strong>County:</strong> {app.propertyCounty}</p>
        </section>

        {/* Underwriting */}
        <section className="border border-slate-800 rounded p-6 space-y-4">
          <h2 className="text-xl font-semibold">Underwriting Status</h2>
          <p><strong>Status:</strong> {uw?.status ?? "Pending"}</p>
          <p><strong>Assigned Underwriter:</strong> {uw?.assignedTo ?? "Not Assigned"}</p>
        </section>

        {/* Timeline */}
        <section className="border border-slate-800 rounded p-6 space-y-4">
          <h2 className="text-xl font-semibold">Timeline</h2>

          <ul className="space-y-2 text-slate-300">
            <li>✓ Application Submitted</li>
            <li>✓ Borrower Created</li>
            <li>✓ Employment, Income, Assets & Liabilities Recorded</li>
            <li>✓ Property Details Captured</li>
            <li>✓ Underwriting Case Opened</li>
            <li>⏳ Awaiting Underwriter Review</li>
          </ul>
        </section>

        {/* Full JSON */}
        <section className="border border-slate-800 rounded p-6 space-y-4">
          <h2 className="text-xl font-semibold">Full 1003 JSON</h2>
          <pre className="bg-slate-900 p-4 rounded text-xs overflow-auto">
            {JSON.stringify(app.full1003Json, null, 2)}
          </pre>
        </section>

      </div>
    </main>
  );
}
