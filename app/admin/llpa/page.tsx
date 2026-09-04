"use client";

import { useState } from "react";

export default function LlpaAdminPage() {
  const [json, setJson] = useState("");

  async function handleUpload() {
    try {
      const rows = JSON.parse(json);
      const res = await fetch("/api/admin/llpa/upload", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ rows }),
      });
      if (!res.ok) throw new Error("Upload failed");
      alert("LLPA grid uploaded");
    } catch (e) {
      alert("Invalid JSON or upload error");
    }
  }

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4 text-gx-neonGreen">
        LLPA Grid Admin
      </h1>

      <p className="mb-2 text-gx-graySoft text-sm">
        Paste an array of LLPA rows:
        {" "}
        {`[{ "agency": "FNMA", "productType": "FIXED", "occupancy": "OWNER", "propertyType": "SFR", "purpose": "PURCHASE", "ficoBucket": 700, "ltvBucket": 80, "adjustment": 0.250 }]`}
      </p>

      <textarea
        className="w-full h-64 bg-black text-green-300 p-3 rounded-md text-sm"
        value={json}
        onChange={(e) => setJson(e.target.value)}
        placeholder='[{"agency":"FNMA","productType":"FIXED","occupancy":"OWNER","propertyType":"SFR","purpose":"PURCHASE","ficoBucket":700,"ltvBucket":80,"adjustment":0.25}]'
      />

      <button
        onClick={handleUpload}
        className="mt-4 px-4 py-2 bg-gx-neonGreen text-black rounded-md font-semibold"
      >
        Upload LLPA Grid
      </button>
    </div>
  );
}
