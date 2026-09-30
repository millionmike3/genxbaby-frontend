"use client";

import { useTransition, useState } from "react";
import { useRouter } from "next/navigation";
import { submitApplication } from "./actions";

export default function SubmitClient({
  applicationId,
  status,
}: {
  applicationId: string;
  status: string;
}) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [submitted, setSubmitted] = useState(false);

  async function onSubmit() {
    startTransition(async () => {
      await submitApplication(applicationId);
      setSubmitted(true);
    });
  }

  if (submitted) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-20 text-center">
        <h1 className="text-2xl font-bold text-slate-100 mb-4">
          Application Submitted
        </h1>
        <p className="text-slate-300 mb-8">
          Thank you. Your application has been successfully submitted.
        </p>

        <button
          onClick={() => router.push("/borrower-app")}
          className="bg-[#4EE38A] text-black font-semibold px-8 py-3 rounded-md hover:bg-[#3bc978] transition"
        >
          Return to Dashboard
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <h1 className="text-xl font-semibold text-slate-100 mb-4">
        {status === "returned" ? "Resubmit Your Application" : "Submit Your Application"}
      </h1>

      {status === "returned" ? (
        <p className="text-slate-300 mb-6">
          Please confirm your corrections and resubmit your application.
        </p>
      ) : (
        <p className="text-slate-300 mb-6">
          Please confirm that all information you have provided is accurate.
        </p>
      )}

      <button
        onClick={onSubmit}
        disabled={isPending}
        className="bg-[#4EE38A] text-black font-semibold px-8 py-3 rounded-md hover:bg-[#3bc978] transition disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {status === "returned" ? "Resubmit Application" : "Submit Application"}
      </button>
    </div>
  );
}
