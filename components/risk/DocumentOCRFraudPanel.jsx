"use client";

import { useState } from "react";

export function DocumentOCRFraudPanel({ doc }) {
  const [ocrText, setOcrText] = useState(null);
  const [fraud, setFraud] = useState(null);

  async function runOCR() {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/ocr/extract/${doc.id}`,
      { method: "POST" }
    );
    const data = await res.json();
    setOcrText(data.text);
  }

  async function runFraud() {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/fraud/analyze/${doc.id}`,
      { method: "POST" }
    );
    const data = await res.json();
    setFraud(data);
  }

  return (
    <div className="border rounded-lg p-4 bg-white shadow space-y-4">
      <h2 className="text-xl font-semibold">OCR & Fraud Analysis</h2>

      <button
        onClick={runOCR}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Run OCR
      </button>

      {ocrText && (
        <div className="text-sm bg-gray-50 p-3 rounded border">
          <pre className="whitespace-pre-wrap">{ocrText}</pre>
        </div>
      )}

      <button
        onClick={runFraud}
        className="bg-red-600 text-white px-4 py-2 rounded"
      >
        Run Fraud Analysis
      </button>

      {fraud && (
        <div className="text-sm bg-gray-50 p-3 rounded border">
          <div className="font-semibold">
            Fraud Score: {fraud.fraudScore}
          </div>
          <ul className="list-disc ml-4">
            {fraud.issues.map((i) => (
              <li key={i}>{i}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
