export default function UnderwriterDashboard() {
  return (
    <div className="min-h-screen bg-black text-white p-10">
      <h1 className="text-3xl font-bold mb-6 text-[#3CF46B]">
        Underwriter Dashboard
      </h1>

      <div className="space-y-8">
        <section className="bg-neutral-900 p-6 rounded-xl border border-neutral-700">
          <h2 className="text-xl font-semibold mb-4">Pipeline Overview</h2>
          <p className="text-neutral-400">
            Active loans, risk flags, and underwriting tasks will appear here.
          </p>
        </section>

        <section className="bg-neutral-900 p-6 rounded-xl border border-neutral-700">
          <h2 className="text-xl font-semibold mb-4">Fraud & Behavior Scores</h2>
          <p className="text-neutral-400">
            Fraud clusters, persona clusters, and behavior analytics will load here.
          </p>
        </section>

        <section className="bg-neutral-900 p-6 rounded-xl border border-neutral-700">
          <h2 className="text-xl font-semibold mb-4">Underwriting Actions</h2>
          <p className="text-neutral-400">
            Approvals, conditions, and decision history will appear here.
          </p>
        </section>
      </div>
    </div>
  );
}
