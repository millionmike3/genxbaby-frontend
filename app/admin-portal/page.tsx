"use server";

export default async function AdminPortalHome() {
  return (
    <div className="space-y-10">
      <h1 className="text-4xl font-bold">Admin Dashboard</h1>

      <p className="text-slate-300 text-lg">
        Welcome to the protected Admin Portal. This is the institutional control
        center for GenXBaby — governing users, sessions, signals, fraud, 
        underwriting, and system-wide intelligence.
      </p>

      <section className="grid md:grid-cols-3 gap-6">
        <div className="bg-slate-800/70 border border-slate-700 p-6 rounded-xl">
          <h2 className="text-xl font-semibold mb-2">Users</h2>
          <p className="text-slate-400">Manage borrower, investor, owner, and admin accounts.</p>
        </div>

        <div className="bg-slate-800/70 border border-slate-700 p-6 rounded-xl">
          <h2 className="text-xl font-semibold mb-2">Sessions</h2>
          <p className="text-slate-400">Monitor live sessions, anomalies, and behavioral drift.</p>
        </div>

        <div className="bg-slate-800/70 border border-slate-700 p-6 rounded-xl">
          <h2 className="text-xl font-semibold mb-2">Signals</h2>
          <p className="text-slate-400">Control risk thresholds, alerts, and fraud signals.</p>
        </div>
      </section>
    </div>
  );
}
