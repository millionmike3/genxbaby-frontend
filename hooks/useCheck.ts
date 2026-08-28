"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/api";

export function useCheck(checkId: string) {
  const [check, setCheck] = useState<any>(null);

  useEffect(() => {
    async function load() {
      try {
        const res = await api(`/checks/${checkId}`); // fetch wrapper, no .get()
        setCheck(res);
      } catch (err) {
        console.error("Failed to load check:", err);
      }
    }

    load();
  }, [checkId]);

  return check;
}
