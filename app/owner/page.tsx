"use client";

export default function OwnerPortalPage() {
  return (
    <main className="px-6 md:px-12 lg:px-20 py-16 text-white bg-slate-900">
        <img 
  src="/images/owner.jpg" 
  alt="Owner Portal" 
  className="w-full max-w-4xl rounded-xl mb-10"
/>

      <h1 className="text-4xl font-bold mb-6">Owner Portal</h1>

      <p className="text-slate-300 leading-relaxed mb-6">
        This is the control room for organizations—nonprofits, portfolio owners, funds, and enterprises.
      </p>

      <h2 className="text-2xl font-semibold mt-10 mb-4">Core Purpose</h2>
      <p className="text-slate-300 leading-relaxed">
        Give owners a single pane of glass to oversee deals, people, behavior, compliance, and risk across the entire ecosystem.
      </p>

      <h2 className="text-2xl font-semibold mt-10 mb-4">Key Capabilities</h2>
      <ul className="list-disc pl-6 text-slate-300 leading-relaxed space-y-3">
        <li>Portfolio & deal oversight.</li>
        <li>Compliance routing.</li>
        <li>Behavior heatmaps.</li>
        <li>Fraud & anomaly alerts.</li>
        <li>Certified check & POF management.</li>
        <li>Role‑based access & governance.</li>
      </ul>

      <h2 className="text-2xl font-semibold mt-10 mb-4">Behavioral Intelligence</h2>
      <ul className="list-disc pl-6 text-slate-300 leading-relaxed space-y-3">
        <li>Cross‑persona insight.</li>
        <li>Risk dashboards with trend lines and alerts.</li>
      </ul>

      <h2 className="text-2xl font-semibold mt-10 mb-4">Why This Matters</h2>
      <p className="text-slate-300 leading-relaxed">
        The owner portal makes GenXBaby an enterprise‑grade governance and intelligence platform.
      </p>
    </main>
  );
}
