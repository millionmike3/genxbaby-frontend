"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/api";

export function useChecks(bankProfileId: string) {
  const [checks, setChecks] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    async function load() {
      try {
        setLoading(true);

        // Build query string manually because fetch has no "params"
        const query = bankProfileId
          ? `/checks?bankProfileId=${bankProfileId}`
          : `/checks`;

        const res = await api(query); // fetch wrapper, no .get()
        setChecks(res);
      } catch (err) {
        console.error("Failed to load checks:", err);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, [bankProfileId]);

  return { checks, loading };
}
