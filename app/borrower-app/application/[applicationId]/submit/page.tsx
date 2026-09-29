"use client";

import { useTransition, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { submitApplication } from "./actions";

export default function SubmitPage() {
  const router = useRouter();
  const params = useParams();
  const applicationId = params.applicationId as string;

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
          Our team will review your information and contact you shortly.
        </p>

        <button
          onClick={() => router.push("/borrower-app")}
          className="
            bg-[#4EE38A]
            text-black
            font-semibold
            px-8 py-3
            rounded-md
            hover:bg-[#3bc978]
            transition
          "
        >
          Return to Dashboard
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <h1 className="text-xl font-semibold text-slate-100 mb-4">
        Submit Your Application
      </h1>

      <p className="text-slate-300 mb-6">
        Please confirm that all information you have provided is accurate to the best of your knowledge.
        Once submitted, your application will be reviewed by our team.
      </p>

      <div className="border border-slate-700 bg-slate-800 rounded-lg p-6 mb-8">
        <p className="text-slate-300 text-sm">
          By clicking “Submit Application”, I certify that the information provided is true and correct.
        </p>
      </div>

      <button
        onClick={onSubmit}
        disabled={isPending}
        className="
          bg-[#4EE38A]
          text-black
          font-semibold
          px-8 py-3
          rounded-md
          hover:bg-[#3bc978]
          transition
          disabled:opacity-60 disabled:cursor-not-allowed
        "
      >
        {isPending ? "Submitting..." : "Submit Application"}
      </button>
    </div>
  );
}
