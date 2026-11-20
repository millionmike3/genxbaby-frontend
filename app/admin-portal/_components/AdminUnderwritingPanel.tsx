// AdminUnderwritingPanel.tsx
import { useState } from "react";
import { runUnderwritingScore } from "../services/underwritingApi";

export function AdminUnderwritingPanel({ applicationId }: { applicationId: string }) {
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleRun() {
    setLoading(true);
    setError(null);
    try {
      const res = await runUnderwritingScore({ applicationId });
      setResult(res);
    } catch (e: any) {
      setError(e.message ?? "Underwriting failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <button onClick={handleRun} disabled={loading}>
        {loading ? "Running..." : "Run Underwriting"}
      </button>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {result && (
        <div>
          <p>Score: {result.score}</p>
          <p>Tier: {result.tier}</p>
          <p>Rate: {result.rate}%</p>
          <p>Fraud Signals: {result.fraudSignals.join(", ") || "None"}</p>
        </div>
      )}
    </div>
  );
}
