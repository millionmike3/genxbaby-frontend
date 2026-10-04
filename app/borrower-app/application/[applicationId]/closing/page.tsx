"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

export default function BorrowerClosingPackagePage() {
  const { applicationId } = useParams();

  const [milestone, setMilestone] = useState("");
  const [closingDocs, setClosingDocs] = useState([]);
  const [loading, setLoading] = useState(true);

  async function load() {
    const appRes = await fetch(`/api/application/${applicationId}`);
    const appData = await appRes.json();

    if (appData.success) {
      setMilestone(appData.application.milestone);
    }

    const docRes = await fetch(`/api/documents/${applicationId}/closing`);
    const docData = await docRes.json();

    if (docData.success) {
      setClosingDocs(docData.documents);
    }

    setLoading(false);
  }

  useEffect(() => {
    load();

    const evtSource = new EventSource(
      `/api/underwriting/${applicationId}/events`
    );

    evtSource.onmessage = () => load();

    return () => evtSource.close();
  }, [applicationId]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        Loading closing package...
      </div>
    );
  }

  const isCTC = milestone === "Clear to Close";

  return (
    <main className="min-h-screen bg-slate-950 text-white p-10">
      <div className="max-w-3xl mx-auto space-y-10">

        <h1 className="text-3xl font-bold">Closing Package</h1>

        {!isCTC ? (
          <p className="text-red-400">
            Your closing package will be available once your loan is Clear to Close.
          </p>
        ) : (
          <>
            <p className="text-green-400 text-lg font-semibold">
              Your loan is Clear to Close!
            </p>

            <div className="space-y-4">
              {closingDocs.map((doc) => (
                <div
                  key={doc.id}
                  className="border border-slate-800 rounded p-4 flex justify-between"
                >
                  <p className="font-semibold">{doc.name}</p>
                  <a
                    href={doc.url}
                    target="_blank"
                    className="text-blue-400 underline text-sm"
                  >
                    View
                  </a>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </main>
  );
}
