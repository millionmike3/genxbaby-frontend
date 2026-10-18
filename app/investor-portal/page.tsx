export default function InvestorDashboard() {
  return (
    <div className="text-white">
      <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
        Investor Dashboard
      </h1>

      <p className="text-slate-300 mb-10">
        Institutional-grade investor intelligence, deal prospecting, behavioral analytics,
        and real-time pricing tools.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Proof of Funds */}
        <div className="p-6 rounded-xl border border-purple-600 bg-gradient-to-br from-purple-900/60 to-purple-700/40 shadow-lg shadow-purple-900/40 hover:shadow-purple-700/60 transition">
          <h2 className="text-xl font-semibold mb-2 text-purple-300">Proof of Funds</h2>
          <p className="text-purple-100">Generate certified proof-of-funds documents.</p>
        </div>

        {/* Deal Prospecting */}
        <div className="p-6 rounded-xl border border-blue-600 bg-gradient-to-br from-blue-900/60 to-blue-700/40 shadow-lg shadow-blue-900/40 hover:shadow-blue-700/60 transition">
          <h2 className="text-xl font-semibold mb-2 text-blue-300">Deal Prospecting</h2>
          <p className="text-blue-100">Analyze investment opportunities and deal flow.</p>
        </div>

        {/* Behavioral Risk Engine */}
        <div className="p-6 rounded-xl border border-emerald-600 bg-gradient-to-br from-emerald-900/60 to-emerald-700/40 shadow-lg shadow-emerald-900/40 hover:shadow-emerald-700/60 transition">
          <h2 className="text-xl font-semibold mb-2 text-emerald-300">Behavioral Risk Engine</h2>
          <p className="text-emerald-100">AI-driven behavioral risk scoring.</p>
        </div>

        {/* Pricing Engine */}
        <div className="p-6 rounded-xl border border-amber-600 bg-gradient-to-br from-amber-900/60 to-amber-700/40 shadow-lg shadow-amber-900/40 hover:shadow-amber-700/60 transition">
          <h2 className="text-xl font-semibold mb-2 text-amber-300">Pricing Engine</h2>
          <p className="text-amber-100">Real-time mortgage pricing and LLPA automation.</p>
        </div>
      </div>
    </div>
  );
}
