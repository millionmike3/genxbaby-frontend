"use client";

import { useEffect, useState } from "react";
import { fetchUnderwritingResult } from "@/lib/api";

// PolygonScan base URL (Amoy testnet by default)
const POLYGONSCAN_BASE =
  process.env.NEXT_PUBLIC_POLYGONSCAN_BASE ||
  "https://amoy.polygonscan.com/tx/";

export default function UnderwritingView({ params }: { params: { id: string } }) {
  const [data, setData] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [anchoring, setAnchoring] = useState(false);
  const [processingDecision, setProcessingDecision] = useState(false);

  // Load underwriting result
  useEffect(() => {
    const load = async () => {
      try {
        const result = await fetchUnderwritingResult(params.id);
        setData(result);
      } catch (err) {
        console.error("Failed to load underwriting result", err);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [params.id]);

  // Anchor function
  async function anchorNow() {
    try {
      setAnchoring(true);

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_UNDERWRITING_API}/api/admin/anchor/${params.id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token") || ""}`
          }
        }
      );

      if (!res.ok) throw new Error("Failed to anchor");

      alert("Anchored successfully!");
      window.location.reload();
    } catch (err) {
      console.error(err);
      alert("Anchoring failed");
    } finally {
      setAnchoring(false);
    }
  }

  // Approve function
  async function approveNow() {
    try {
      setProcessingDecision(true);

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_UNDERWRITING_API}/api/admin/underwriting/${params.id}/approve`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token") || ""}`
          }
        }
      );

      if (!res.ok) throw new Error("Failed to approve");

      alert("Application approved");
      window.location.reload();
    } catch (err) {
      console.error(err);
      alert("Approval failed");
    } finally {
      setProcessingDecision(false);
    }
  }

  // Reject function
  async function rejectNow() {
    try {
      setProcessingDecision(true);

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_UNDERWRITING_API}/api/admin/underwriting/${params.id}/reject`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token") || ""}`
          }
        }
      );

      if (!res.ok) throw new Error("Failed to reject");

      alert("Application rejected");
      window.location.reload();
    } catch (err) {
      console.error(err);
      alert("Rejection failed");
    } finally {
      setProcessingDecision(false);
    }
  }

  if (loading) return <div className="p-6">Loading underwriting…</div>;
  if (!data) return <div className="p-6">No underwriting data found.</div>;

  const { behavior, property, stock, decision, riskScore, merkleRoot, anchor, adminDecision } = data;

  return (
    <div className="p-6 space-y-8">
      <h1 className="text-2xl font-semibold">Underwriting Result</h1>

      {/* Admin Decision */}
      <section className="border rounded p-4 bg-gray-50">
        <h2 className="text-xl font-medium mb-2">Admin Decision</h2>

        {adminDecision ? (
          <p className="text-green-700 font-semibold">
            Decision: {adminDecision}
          </p>
        ) : (
          <div className="flex gap-4">
            <button
              onClick={approveNow}
              disabled={processingDecision}
              className="px-4 py-2 bg-green-600 text-white rounded disabled:opacity-50"
            >
              {processingDecision ? "Processing…" : "Approve"}
            </button>

            <button
              onClick={rejectNow}
              disabled={processingDecision}
              className="px-4 py-2 bg-red-600 text-white rounded disabled:opacity-50"
            >
              {processingDecision ? "Processing…" : "Reject"}
            </button>
          </div>
        )}
      </section>

      {/* Behavior Module */}
      <section className="border rounded p-4">
        <h2 className="text-xl font-medium mb-2">Behavior Module</h2>
        <p>Behavior Score: {behavior.behaviorScore}</p>
        <p>Fraud Score: {behavior.fraudScore}</p>
        <p>Flags: {behavior.riskFlags.join(", ") || "None"}</p>
      </section>

      {/* Property Sanitizer */}
      <section className="border rounded p-4">
        <h2 className="text-xl font-medium mb-2">Property Sanitizer</h2>
        <p>Address: {property.normalizedAddress}</p>
        <p>Collateral Score: {property.collateralScore}</p>
        <p>LTV: {property.ltv.toFixed(2)}%</p>
        <p>LTV Risk: {property.ltvRisk}</p>
      </section>

      {/* Stock Sanitizer */}
      <section className="border rounded p-4">
        <h2 className="text-xl font-medium mb-2">Stock Sanitizer</h2>
        <p>Macro Risk Score: {stock.macroRiskScore}</p>
        <p>Investor Appetite: {stock.investorAppetiteScore}</p>
        <p>Market Condition: {stock.marketCondition}</p>
      </section>

      {/* Decision */}
      <section className="border rounded p-4">
        <h2 className="text-xl font-medium mb-2">Decision</h2>
        <p>Status: {decision.status}</p>
        <p>Tier: {decision.tier}</p>
        <p>Risk Score: {riskScore}</p>
      </section>

      {/* Merkle + Anchor */}
      <section className="border rounded p-4">
        <h2 className="text-xl font-medium mb-2">Merkle & Anchor</h2>

        <p className="break-all">Merkle Root: {merkleRoot}</p>

        {anchor ? (
          <>
            <p>
              Tx Hash:{" "}
              <a
                href={`${POLYGONSCAN_BASE}${anchor.txHash}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 underline break-all"
              >
                {anchor.txHash}
              </a>
            </p>
            <p>Block: {anchor.blockNumber}</p>
            <p>Anchored At: {new Date(anchor.anchoredAt).toLocaleString()}</p>
          </>
        ) : (
          <button
            onClick={anchorNow}
            disabled={anchoring}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-50"
          >
            {anchoring ? "Anchoring…" : "Anchor on Polygon"}
          </button>
        )}
      </section>
    </div>
  );
}
