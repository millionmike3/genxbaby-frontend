"use client";

import { useState } from "react";

export default function ApplicationSearch({ onSearch }) {
  const [query, setQuery] = useState("");

  return (
    <div className="bg-graphite p-4 rounded-lg shadow flex gap-4">
      <input
        type="text"
        placeholder="Search by name, SSN last4, or application ID"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="flex-1 bg-black text-white p-3 rounded-lg border border-gray-700"
      />

      <button
        onClick={() => onSearch(query)}
        className="bg-neon-green text-black px-6 py-3 rounded-lg font-semibold"
      >
        Search
      </button>
    </div>
  );
}
