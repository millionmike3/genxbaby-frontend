"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/api";

export function useCases() {
  const [cases, setCases] = useState<any[]>([]);

  useEffect(() => {
    async function load() {
      try {
        const res = await api("/cases"); // fetch all cases
        setCases(res);
      } catch (err) {
        console.error("Failed to load cases:", err);
      }
    }

    load();
  }, []);

  return cases;
}
