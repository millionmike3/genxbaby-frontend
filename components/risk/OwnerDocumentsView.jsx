"use client";

import { useState } from "react";
import { DocumentOCRFraudPanel } from "./DocumentOCRFraudPanel";

export function OwnerDocumentsView({ ownerId, documents }) {
  const [items, setItems] = useState(documents);
  const [uploading, setUploading] = useState(false);

  async function uploadDocument(e) {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);

    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/owners/${ownerId}/documents/upload`,
      {
        method: "POST",
        body: formData,
      }
    );

    const newDoc = await res.json();
    setItems([newDoc, ...items]);
    setUploading(false);
  }

  async function verifyDocument(docId, status) {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/owners/${ownerId}/documents/${docId}/verify`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      }
    );

    const updated = await res.json();
    setItems(items.map((d) => (d.id === docId ? updated : d)));
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Owner Documents</h1>

      <input
        type="file"
        onChange={uploadDocument}
        className="border p-2 rounded"
      />

      {uploading && (
        <div className="text-blue-600 font-semibold">Uploading…</div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {items.map((doc) => (
          <div key={doc.id} className="border rounded p-4 bg-white shadow space-y-4">
            
            {/* FILE INFO */}
            <div className="font-semibold">{doc.fileName}</div>
            <div className="text-sm text-gray-600">{doc.mimeType}</div>

            {/* STATUS */}
            <div className="text-sm mt-2">
              Status:{" "}
              <span
                className={
                  doc.status === "VERIFIED"
                    ? "text-green-600"
                    : doc.status === "REJECTED"
                    ? "text-red-600"
                    : "text-yellow-600"
                }
              >
                {doc.status}
              </span>
            </div>

            {/* OCR + FRAUD PANEL (CORRECT PLACEMENT) */}
            <DocumentOCRFraudPanel doc={doc} />

            {/* VERIFY / REJECT BUTTONS */}
            <div className="mt-4 space-x-2">
              <button
                onClick={() => verifyDocument(doc.id, "VERIFIED")}
                className="bg-green-600 text-white px-3 py-1 rounded"
              >
                Verify
              </button>
              <button
                onClick={() => verifyDocument(doc.id, "REJECTED")}
                className="bg-red-600 text-white px-3 py-1 rounded"
              >
                Reject
              </button>
            </div>

          </div>
        ))}
      </div>
    </div>
  );
}
