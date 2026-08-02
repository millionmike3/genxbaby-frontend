"use client";

export default function PortalSection() {
  return (
    <section
      id="pillars"
      className="mt-10 px-6 py-12 border-t border-white/5 bg-gradient-to-b from-black via-black to-[#050607]"
    >
      <div className="max-w-5xl mx-auto">
        <h2 className="text-2xl font-semibold mb-6 text-gray-100">
          The GenXBaby Operating Stack
        </h2>

        <p className="text-gray-400 mb-8 max-w-2xl leading-relaxed">
          A fully integrated, AI-powered fintech operating system — combining borrower intake,
          AI underwriting, compliance audit, loan origination, investor reporting, and nonprofit
          routing into one unified platform. Polygon Amoy verified. Merkle-tree hashed. 
          Institutionally ready.
        </p>

        <div className="grid gap-6 md:grid-cols-3">
          <PillarCard
            title="AI Underwriting Engine"
            accent="#3CF46B"
            description="Real-time borrower scoring, intelligent risk tiering, and automated credit decisioning with explainable confidence intervals."
          />
          <PillarCard
            title="Resilient America Inc."
            accent="#4FB6FF"
            description="Regulatory-aligned community infrastructure powering borrower eligibility, nonprofit routing, and mission-driven capital access."
          />
          <PillarCard
            title="Substantial Funding LLC"
            accent="#FFB84F"
            description="Lending and capital strategy engine delivering underwriting intelligence, structured capital access, and mortgage workflow automation."
          />
        </div>
      </div>
    </section>
  );
}

function PillarCard({ title, description, accent }) {
  return (
    <div className="relative rounded-xl border border-white/10 bg-white/5 p-5 backdrop-blur-sm">
      <div
        className="absolute inset-x-0 -top-px h-[2px]"
        style={{ background: `linear-gradient(to right, transparent, ${accent}, transparent)` }}
      />
      <h3 className="text-lg font-semibold mb-2" style={{ color: accent }}>
        {title}
      </h3>
      <p className="text-sm text-gray-300">{description}</p>
    </div>
  );
}
