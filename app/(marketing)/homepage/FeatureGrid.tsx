"use client";

export function FeatureGrid() {
  const features = [
    {
      title: "Real‑Time Pricing",
      desc: "LLPA‑aware pricing engine with behavioral sensitivity scoring.",
    },
    {
      title: "Bluetooth Intelligence",
      desc: "Proximity‑based risk signals powered by device analytics.",
    },
    {
      title: "Behavior Volatility",
      desc: "Track impulsiveness, volatility, and session‑level risk.",
    },
    {
      title: "Unified Underwriting",
      desc: "Cross‑engine scoring for fraud, anomalies, and pricing risk.",
    },
  ];

  return (
    <section className="w-full py-20 px-6 md:px-12 lg:px-20 bg-black text-white">
      <h2 className="text-3xl font-bold mb-10">Platform Features</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {features.map((f) => (
          <div
            key={f.title}
            className="p-6 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition"
          >
            <h3 className="text-xl font-semibold mb-3">{f.title}</h3>
            <p className="text-gray-300 text-sm leading-relaxed">{f.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
