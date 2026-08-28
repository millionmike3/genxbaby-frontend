"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/api";

export function useCase(caseId: string) {
  const [caseData, setCaseData] = useState<any>(null);

  useEffect(() => {
    async function load() {
      try {
        const res = await api(`/cases/${caseId}`);
        setCaseData(res);
      } catch (err) {
        console.error("Failed to load case:", err);
      }
    }

    load();
  }, [caseId]);

  return caseData;
}
