"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

export default function LOApplicationDetailPage() {
  const { applicationId } = useParams();

  const [app, setApp] = useState<any>(null);
  const [docs, setDocs] = useState<any[]>([]);
  const [timeline, setTimeline] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  async function load() {
    const appRes = await fetch(`/api/application/${applicationId}`);
    const appData = await appRes.json();

    const docRes = await fetch(`/api/application/${applicationId}/checklist`);
    const docData = await docRes.json();

    const tlRes = await fetch(
      `${process.env.NEXT_PUBLIC_UNDERWRITING_API}/timeline/application/${applicationId}`
    );
    const tlData = await tlRes.json();

    if (appData.success) setApp(appData.application);
    if (docData.success) setDocs(docData.documents);
    setTimeline(tlData.events);

    setLoading(false);
  }

  useEffect(() => {
    load();
  }, []);

  if (loading || !app) {
    return (
      <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center">
        Loading application details...
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-slate-950 text-white p-10">
      <div className="max-w-5xl mx-auto space-y-10">
        <h1 className="text-3xl font-bold">Application Detail</h1>

        <section className="border border-slate-800 rounded p-6">
          <h2 className="text-xl font-semibold">Borrower</h2>
          <p>{app.borrower?.firstName} {app.borrower?.lastName}</p>
          <p className="text-slate-400 text-sm">{app.borrower?.email}</p>
        </section>

        <section className="border border-slate-800 rounded p-6">
          <h2 className="text-xl font-semibold">Property</h2>
          <p>{app.propertyAddress}</p>
        </section>

        <section className="border border-slate-800 rounded p-6">
          <h2 className="text-xl font-semibold">Documents</h2>
          {docs.map((d) => (
            <div key={d.id} className="flex justify-between border-b border-slate-800 py-2">
              <p>{d.label}</p>
              <span className={d.satisfied ? "text-green-400" : "text-red-400"}>
                {d.satisfied ? "Completed" : "Required"}
              </span>
            </div>
          ))}
        </section>

        <section className="border border-slate-800 rounded p-6">
          <h2 className="text-xl font-semibold">Timeline</h2>
          {timeline.map((t) => (
            <p key={t.id} className="text-slate-300">
              {t.eventType} — {new Date(t.createdAt).toLocaleString()}
            </p>
          ))}
        </section>
      </div>
    </main>
  );
}
