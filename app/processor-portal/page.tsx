import { auth } from "@/lib/auth";

function Unauthorized({ role }: { role?: string }) {
  return (
    <section className="bg-slate-950 text-white p-6 min-h-screen flex items-center justify-center">
      <div className="text-xl font-semibold">
        Unauthorized: This portal is for Processors and Underwriters. You are logged in as{" "}
        {role || "Unknown"}.
      </div>
    </section>
  );
}

export default async function ProcessorDashboard() {
  const session = await auth();

  // 🚦 Must be logged in
  if (!session || !session.userId) {
    return <Unauthorized role="No active session" />;
  }

  // 🚦 Processor dashboard
  if (session.role === "PROCESSOR") {
    return (
      <div className="space-y-10 text-white">
        <h1 className="text-4xl font-bold mb-4">Processor Dashboard</h1>
        <p className="text-slate-300">
          Document verification, OCR review, and requirement clearing.
        </p>

        <section className="bg-slate-800/60 p-6 rounded-xl border border-slate-700">
          <h2 className="text-2xl font-semibold mb-2">Tasks</h2>
          <ul className="list-disc list-inside text-slate-300 space-y-2">
            <li>Review uploaded mortgage applications</li>
            <li>Run OCR extractions for document accuracy</li>
            <li>Clear outstanding requirements</li>
            <li>Forward verified files to Underwriter for risk analysis</li>
          </ul>
        </section>
      </div>
    );
  }

  // 🚦 Underwriter dashboard (full access, not "supportive view")
  if (session.role === "UNDERWRITER") {
    return (
      <div className="space-y-10 text-white">
        <h1 className="text-4xl font-bold mb-4">Underwriter Dashboard</h1>
        <p className="text-slate-300">
          Full access to processor outputs, risk analysis tools, and underwriting decisions.
        </p>

        <section className="bg-slate-800/60 p-6 rounded-xl border border-slate-700">
          <h2 className="text-2xl font-semibold mb-2">Underwriter Tools</h2>
          <ul className="list-disc list-inside text-slate-300 space-y-2">
            <li>Review processor‑verified documents</li>
            <li>Analyze OCR results and fraud signals</li>
            <li>Approve or reject cleared requirements</li>
            <li>Generate underwriting decisions and reports</li>
          </ul>
        </section>
      </div>
    );
  }

  // 🚦 Block all other roles
  return <Unauthorized role={session.role} />;
}
