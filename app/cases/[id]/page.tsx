"use client";

import { useCase } from "@/hooks/useCase";

export default function CasePage({ params }: { params: { id: string } }) {
  const caseData = useCase(params.id);

  if (!caseData) {
    return <div>Loading case...</div>;
  }

  return (
    <div>
      <h1>Case {params.id}</h1>
      <pre>{JSON.stringify(caseData, null, 2)}</pre>
    </div>
  );
}

