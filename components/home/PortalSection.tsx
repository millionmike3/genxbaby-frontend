"use client";

export default function PortalSection() {
  return (
    <section
      id="portal"
      className="mt-10 px-6 py-12 border-t border-white/5 bg-gradient-to-b from-black via-black to-[#050607]"
    >
      <div className="max-w-5xl mx-auto">
        <h2 className="text-2xl font-semibold mb-6 text-gray-100">
          Multi‑Brand Portal
        </h2>

        <p className="text-gray-400 mb-8 max-w-2xl">
          Three pillars, one ecosystem—Gen X Baby for youth innovation, Resilient America
          for community infrastructure, and Substantial Funding for strategic capital.
        </p>

        <div className="grid gap-6 md:grid-cols-3">
          <PortalCard
            title="Gen X Baby"
            accent="#3CF46B"
            description="Digital creativity, youth‑driven projects, and next‑gen storytelling."
          />
          <PortalCard
            title="Resilient America"
            accent="#4FB6FF"
            description="Nonprofit operations, community assets, and resilient infrastructure."
          />
          <PortalCard
            title="Substantial Funding"
            accent="#FFB84F"
            description="Mortgage strategy, capital access, and structured funding solutions."
          />
        </div>
      </div>
    </section>
  );
}

function PortalCard({
  title,
  description,
  accent,
}: {
  title: string;
  description: string;
  accent: string;
}) {
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
