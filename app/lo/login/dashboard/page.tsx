export default function LoanOfficerDashboard() {
  return (
    <div className="min-h-screen bg-black text-white p-10">
      <h1 className="text-3xl font-bold mb-6 text-[#3CF46B]">
        Loan Officer Dashboard
      </h1>

      <div className="space-y-8">
        <section className="bg-neutral-900 p-6 rounded-xl border border-neutral-700">
          <h2 className="text-xl font-semibold mb-4">Pipeline Overview</h2>
          <p className="text-neutral-400">
            Borrower applications, statuses, and pipeline metrics will appear here.
          </p>
        </section>

        <section className="bg-neutral-900 p-6 rounded-xl border border-neutral-700">
          <h2 className="text-xl font-semibold mb-4">Borrower Insights</h2>
          <p className="text-neutral-400">
            Behavior scores, fraud indicators, and borrower analytics will load here.
          </p>
        </section>

        <section className="bg-neutral-900 p-6 rounded-xl border border-neutral-700">
          <h2 className="text-xl font-semibold mb-4">Tasks & Follow-ups</h2>
          <p className="text-neutral-400">
            LO tasks, follow-up reminders, and communication logs will appear here.
          </p>
        </section>
      </div>
    </div>
  );
}
