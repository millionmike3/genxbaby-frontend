"use client";

import { useState } from "react";
import ApplicationSearch from "./ApplicationSearch";
import ApplicationSummaryCard from "./ApplicationSummaryCard";

export default function AdminHome() {
  const [results, setResults] = useState([]);

  const handleSearch = async (query) => {
    if (!query) return;

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_UNDERWRITING_API}/admin/search?query=${query}`
    );

    const data = await res.json();
    setResults(data.results || []);
  };

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-neon-green">
        GENXBABY Admin Dashboard
      </h1>

      <p className="text-gray-400">
        Search borrowers, applications, and audit history.
      </p>

      <ApplicationSearch onSearch={handleSearch} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
        {results.map((app) => (
          <ApplicationSummaryCard key={app.id} app={app} />
        ))}
      </div>
    </div>
  );
}
