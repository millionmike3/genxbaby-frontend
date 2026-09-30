"use client";

import { approveApplication, denyApplication, returnForEdits } from "./actions";
import { useTransition } from "react";

export default function OwnerActions({ applicationId }: { applicationId: string }) {
  const [isPending, startTransition] = useTransition();

  function handleApprove() {
    startTransition(async () => {
      await approveApplication(applicationId);
    });
  }

  function handleDeny() {
    startTransition(async () => {
      await denyApplication(applicationId);
    });
  }

  function handleReturn() {
    const reason = prompt("Enter reason for returning to borrower:");
    if (!reason) return;

    startTransition(async () => {
      await returnForEdits(applicationId, reason);
    });
  }

  return (
    <div className="flex gap-4 mt-10">
      <button
        onClick={handleApprove}
        disabled={isPending}
        className="bg-[#4EE38A] text-black font-semibold px-8 py-3 rounded-md hover:bg-[#3bc978] transition"
      >
        Approve
      </button>

      <button
        onClick={handleDeny}
        disabled={isPending}
        className="bg-red-500 text-white font-semibold px-8 py-3 rounded-md hover:bg-red-600 transition"
      >
        Deny
      </button>

      <button
        onClick={handleReturn}
        disabled={isPending}
        className="bg-yellow-400 text-black font-semibold px-8 py-3 rounded-md hover:bg-yellow-500 transition"
      >
        Return for Edits
      </button>
    </div>
  );
}
