"use client";

import { useEffect, useState } from "react";

export function useOwnerPipeline(orgId: string) {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<any>(null);

  async function fetchData() {
    try {
      setLoading(true);
      const token = localStorage.getItem("gx_token") || "";
      const res = await fetch(`/api/owner/${orgId}/pipeline`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setData(await res.json());
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (orgId) fetchData();
  }, [orgId]);

  return { data, loading, error, refresh: fetchData };
}
