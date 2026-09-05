"use client";

import { motion } from "framer-motion";

const testimonials = [
  {
    text: "GenxBaby transformed how we evaluate borrowers. The behavioral engine is a game changer.",
    author: "Senior Underwriter",
    image: "/images/genxbaby-team.jpg",
  },
  {
    text: "Our investor reporting is now real‑time and automated. This platform is institutional‑grade.",
    author: "Fund Manager",
    image: "/images/genxbaby-investor.jpg",
  },
  {
    text: "We finally have a financial tool that helps our family plan for the future.",
    author: "Homeowner",
    image: "/images/genxbaby-family.jpg",
  },
];

export default function TestimonialCarousel() {
  return (
    <section className="px-4 py-16 bg-slate-900">
      <div className="mx-auto max-w-6xl grid gap-10 md:grid-cols-3">
        {testimonials.map((t, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="
              rounded-2xl border border-slate-800 bg-slate-950/60
              p-5 shadow-xl shadow-black/40
            "
          >
            <div className="rounded-xl overflow-hidden mb-4">
              <img src={t.image} alt={t.author} className="w-full h-auto object-cover" />
            </div>
            <p className="text-slate-300 text-sm mb-3">{t.text}</p>
            <p className="text-slate-100 font-semibold text-sm">{t.author}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
