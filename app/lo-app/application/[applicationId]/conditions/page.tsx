"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

type ConditionItem = {
  id: string;
  label: string;
  reason: string;
  satisfied: boolean;
  waived: boolean;
  type: string;
  fileUrl?: string;
};

export default function LOConditionsManagementPage() {
  const { applicationId } = useParams();

  const [conditions, setConditions] = useState<ConditionItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  async function load() {
    const res = await fetch(`/api/application/${applicationId}/checklist`);
    const data = await res.json();

    if (data.success) {
      setConditions(
        data.documents.filter((d: any) => d.type === "CONDITION")
      );
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

  async function updateCondition(id: string, action: string) {
    setUpdating(true);

    await fetch(`/api/lo/conditions/update`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        applicationId,
        conditionId: id,
        action,
      }),
    });

    await load();
    setUpdating(false);
  }

  async function requestDocument(id: string) {
    const message = prompt(
      "Enter a message to the borrower requesting additional documentation:"
    );

    if (!message) return;

    await fetch(`/api/messages/${applicationId}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        senderRole: "LOAN_OFFICER",
        message: `Condition Update: ${message}`,
      }),
    });

    alert("Message sent to borrower.");
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950 text-white">
        Loading conditions...
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-slate-950 text-white p-10">
      <div className="max-w-4xl mx-auto space-y-10">
        <h1 className="text-3xl font-bold">Conditions Management</h1>
        <p className="text-slate-400">
          Review, update, and manage borrower conditions.
        </p>

        {conditions.length === 0 ? (
          <p className="text-slate-400 text-sm">No conditions for this loan.</p>
        ) : (
          <div className="space-y-4">
            {conditions.map((c) => (
              <div
                key={c.id}
                className="border border-slate-800 rounded p-4 flex flex-col gap-3"
              >
                <div className="flex justify-between">
                  <div>
                    <p className="font-semibold">{c.label}</p>
                    <p className="text-xs text-slate-400">{c.reason}</p>

                    {c.fileUrl && (
                      <a
                        href={c.fileUrl}
                        target="_blank"
                        className="text-blue-400 underline text-sm mt-1 inline-block"
                      >
                        View Borrower Upload
                      </a>
                    )}
                  </div>

                  <div className="text-right">
                    {c.satisfied ? (
                      <span className="text-green-400 text-sm font-semibold">
                        Satisfied
                      </span>
                    ) : c.waived ? (
                      <span className="text-yellow-400 text-sm font-semibold">
                        Waived
                      </span>
                    ) : (
                      <span className="text-red-400 text-sm font-semibold">
                        Required
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex gap-3">
                  {!c.satisfied && !c.waived && (
                    <>
                      <button
                        disabled={updating}
                        onClick={() => updateCondition(c.id, "SATISFY")}
                        className="px-3 py-2 bg-green-600 rounded text-sm font-semibold"
                      >
                        Mark Satisfied
                      </button>

                      <button
                        disabled={updating}
                        onClick={() => updateCondition(c.id, "WAIVE")}
                        className="px-3 py-2 bg-yellow-600 rounded text-sm font-semibold"
                      >
                        Waive Condition
                      </button>

                      <button
                        disabled={updating}
                        onClick={() => requestDocument(c.id)}
                        className="px-3 py-2 bg-blue-600 rounded text-sm font-semibold"
                      >
                        Request Document
                      </button>
                    </>
                  )}

                  {(c.satisfied || c.waived) && (
                    <button
                      disabled={updating}
                      onClick={() => updateCondition(c.id, "REOPEN")}
                      className="px-3 py-2 bg-slate-700 rounded text-sm font-semibold"
                    >
                      Reopen Condition
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
