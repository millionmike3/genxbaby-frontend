"use client";

export default function AdminPortalPage() {
  return (
    
    <main className="px-6 md:px-12 lg:px-20 py-16 text-white bg-slate-900">
        <img 
     src="/images/admin.jpg" 
     alt="Admin Portal" 
     className="w-full max-w-4xl rounded-xl mb-10"
     />

      <h1 className="text-4xl font-bold mb-6">Admin Portal</h1>

      <p className="text-slate-300 leading-relaxed mb-6">
        This is the highest level—the “god view” of GenXBaby. 
      </p>

      <h2 className="text-2xl font-semibold mt-10 mb-4">Core Purpose</h2>
      <p className="text-slate-300 leading-relaxed">
        Provide ultimate control, visibility, and governance over every user, every session, every deal, and every signal in GenXBaby.
      </p>

      <h2 className="text-2xl font-semibold mt-10 mb-4">Key Capabilities</h2>
      <ul className="list-disc pl-6 text-slate-300 leading-relaxed space-y-3">
        <li>Global system oversight.</li>
        <li>User & role management.</li>
        <li>Signals & behavior engine control.</li>
        <li>Blockchain audit & Merkle verification.</li>
        <li>System‑wide analytics.</li>
        <li>Configuration of integrations.</li>
      </ul>

      <h2 className="text-2xl font-semibold mt-10 mb-4">Behavioral Intelligence</h2>
      <ul className="list-disc pl-6 text-slate-300 leading-relaxed space-y-3">
        <li>Meta‑behavior view across the entire ecosystem.</li>
        <li>Policy tuning for risk thresholds and alert rules.</li>
      </ul>

      <h2 className="text-2xl font-semibold mt-10 mb-4">Why This Matters</h2>
      <p className="text-slate-300 leading-relaxed">
        The admin portal turns GenXBaby into a financial operating system—governed, tuned, and scaled at an institutional level.
      </p>
    </main>
  );
}
