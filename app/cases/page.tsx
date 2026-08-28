"use client";

import { useCases } from "@/hooks/useCases";

export default function CaseListPage() {
  const cases = useCases();

  if (!cases || cases.length === 0) {
    return <div>No cases found.</div>;
  }

  return (
    <div>
      <h1>Cases</h1>
      <ul>
        {cases.map((c: any) => (
          <li key={c.id}>{JSON.stringify(c)}</li>
        ))}
      </ul>
    </div>
  );
}
