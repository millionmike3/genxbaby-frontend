"use client";

import { useState } from "react";

export default function LlpaAdminPage() {
  const [json, setJson] = useState("");

  async function handleUpload() {
    const rows = JSON.parse(json);
    await fetch("/api/admin/llpa/upload", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ rows }),
    });
    alert("LLPA grid uploaded");
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4 text-gx-neonGreen">LLPA Grid Admin</h1>
      <textarea
        className="w-full h-64 bg-black text-green-300 p-3 rounded-md"
        value={json}
        onChange={(e) => setJson(e.target.value)}
        placeholder='[{"agency":"FNMA","productType":"FIXED",...}]'
      />
      <button
        onClick={handleUpload}
        className="mt-4 px-4 py-2 bg-gx-neonGreen text-black rounded-md"
      >
        Upload LLPA Grid
      </button>
    </div>
  );
}
