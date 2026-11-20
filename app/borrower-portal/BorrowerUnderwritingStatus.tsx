// BorrowerUnderwritingStatus.tsx
import { useEffect, useState } from "react";
import { getBorrowerUnderwritingStatus } from "../services/borrowerApi";

export function BorrowerUnderwritingStatus({ applicationId }: { applicationId: string }) {
  const [status, setStatus] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      try {
        const data = await getBorrowerUnderwritingStatus(applicationId);
        setStatus(data);
      } catch (e: any) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, [applicationId]);

  if (loading) return <p>Loading underwriting status…</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div>
      <h2>Your Underwriting Status</h2>

      <p>Status: <strong>{status.status}</strong></p>

      {status.rate && <p>Your Rate: {status.rate}%</p>}
      {status.tier && <p>Your Tier: {status.tier}</p>}

      <p>{status.message}</p>
    </div>
  );
}
