"use client";

import React from "react";

type ActorDrilldownModalProps = {
  actor: string;
  timeline: any[];
  userRole: string;
  onClose: () => void;
};
export default function ActorDrilldownModal({
  actor,
  timeline,
  userRole,
  onClose,
}: ActorDrilldownModalProps) {
  const actorEvents = timeline.filter((item) => {
    const a =
      item.details?.actor ||
      item.details?.wallet ||
      item.details?.address ||
      "";

    return String(a).toLowerCase() === String(actor).toLowerCase();
  });
  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
      <div className="max-w-2xl w-full bg-slate-900 border border-slate-700 rounded-xl p-6 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">Actor Drilldown</h2>
          <button
            onClick={onClose}
            className="text-xs text-slate-400 hover:text-slate-200"
          >
            Close
          </button>
        </div>

        <div className="text-xs text-slate-300">
          <strong>Actor:</strong>{" "}
          <span className="font-mono break-all">{actor}</span>
          <br />
          <strong>Role:</strong> {userRole}
        </div>
        <div className="border border-slate-800 rounded-xl p-4 bg-slate-900/60">
          <h3 className="text-sm font-semibold mb-2">Events involving this actor</h3>

          {actorEvents.length === 0 ? (
            <p className="text-slate-400 text-xs">No events found for this actor.</p>
          ) : (
            <ul className="space-y-2 text-xs text-slate-200 max-h-64 overflow-y-auto">
              {actorEvents.map((ev, idx) => (
                <li
                  key={idx}
                  className="border border-slate-700 rounded p-3 bg-slate-800/60"
                >
                  <strong>Action:</strong> {ev.action}
                  <br />
                  <strong>Timestamp:</strong>{" "}
                  {ev.createdAt
                    ? new Date(ev.createdAt).toLocaleString()
                    : "—"}
                  <pre className="mt-1 bg-slate-800/40 p-2 rounded text-[11px] whitespace-pre-wrap">
                    {JSON.stringify(ev.details, null, 2)}
                  </pre>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
