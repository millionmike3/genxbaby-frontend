export default function InvestorCRMPage() {
  return (
    <div className="text-white">
      <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-blue-400 to-cyan-500 bg-clip-text text-transparent">
        Investor CRM
      </h1>

      <p className="text-slate-300 mb-10">
        Manage investor relationships, communication history, deal interactions, and
        portfolio engagement insights.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="p-6 rounded-xl border border-blue-600 bg-gradient-to-br from-blue-900/60 to-blue-700/40 shadow-lg shadow-blue-900/40 hover:shadow-blue-700/60 transition">
          <h2 className="text-xl font-semibold mb-2 text-blue-300">Contacts</h2>
          <p className="text-blue-100">View and manage investor contacts and profiles.</p>
        </div>

        <div className="p-6 rounded-xl border border-cyan-600 bg-gradient-to-br from-cyan-900/60 to-cyan-700/40 shadow-lg shadow-cyan-900/40 hover:shadow-cyan-700/60 transition">
          <h2 className="text-xl font-semibold mb-2 text-cyan-300">Communication Log</h2>
          <p className="text-cyan-100">Track calls, emails, meetings, and interactions.</p>
        </div>

        <div className="p-6 rounded-xl border border-indigo-600 bg-gradient-to-br from-indigo-900/60 to-indigo-700/40 shadow-lg shadow-indigo-900/40 hover:shadow-indigo-700/60 transition">
          <h2 className="text-xl font-semibold mb-2 text-indigo-300">Deal Engagement</h2>
          <p className="text-indigo-100">Monitor investor interest and deal activity.</p>
        </div>

        <div className="p-6 rounded-xl border border-purple-600 bg-gradient-to-br from-purple-900/60 to-purple-700/40 shadow-lg shadow-purple-900/40 hover:shadow-purple-700/60 transition">
          <h2 className="text-xl font-semibold mb-2 text-purple-300">Portfolio Insights</h2>
          <p className="text-purple-100">Analyze investor behavior and portfolio trends.</p>
        </div>
      </div>
    </div>
  );
}
