"use client";

export default function PortalSection() {
  return (
    <section
      id="pillars"
      className="mt-10 px-6 py-12 border-t border-white/5 bg-gradient-to-b from-black via-black to-[#050607]"
    >
      <div className="max-w-5xl mx-auto">
        <h2 className="text-2xl font-semibold mb-6 text-gray-100">
          Financial Infrastructure Pillars
        </h2>

        <p className="text-gray-400 mb-8 max-w-2xl">
          The GenXBaby ecosystem is built on three coordinated financial infrastructure pillars —
          a consumer‑facing identity and capital‑access platform, a nonprofit community backbone,
          and a lending engine engineered for structured capital deployment. Together, they form
          a unified system designed to accelerate financial stability, credit readiness, and
          long‑term economic mobility.
        </p>

        <div className="grid gap-6 md:grid-cols-3">
          <PillarCard
            title="GenXBaby"
            accent="#3CF46B"
            description="A financial identity and capital‑access platform designed for emerging earners — integrating structured savings automation, early‑stage credit pathways, identity‑secured data vaults, and creator‑driven income infrastructure."
          />
          <PillarCard
            title="Resilient America Inc."
            accent="#4FB6FF"
            description="The community infrastructure backbone providing regulatory‑aligned onboarding, financial capability development, and access pathways for underserved populations across the GenXBaby ecosystem."
          />
          <PillarCard
            title="Substantial Funding LLC"
            accent="#FFB84F"
            description="The lending and capital‑strategy engine powering the ecosystem — delivering underwriting intelligence, mortgage strategy, structured capital access, and scalable financial pathways for families and emerging earners."
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
