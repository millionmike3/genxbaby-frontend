// components/ui/DesignSystem.tsx

export const Button = {
  primary: `
    px-6 py-3 rounded-full bg-[#3CF46B] text-black font-semibold
    shadow-[0_0_30px_rgba(60,244,107,0.9)]
    hover:bg-[#32d45f] transition
  `,
  secondary: `
    px-6 py-3 rounded-full border border-slate-600 text-slate-200
    hover:border-[#3CF46B] hover:text-[#3CF46B] transition
  `,
  admin: `
    px-6 py-3 rounded-full bg-blue-600 text-white font-semibold
    hover:bg-blue-500 transition
  `,
};

export const Card = `
  rounded-2xl border border-slate-800 bg-slate-900/60
  shadow-xl shadow-black/40
  p-5 transition hover:border-[#3CF46B]
`;

export const Typography = {
  h1: "text-4xl sm:text-6xl md:text-8xl font-extrabold tracking-tight",
  h2: "text-2xl md:text-3xl font-bold",
  h3: "text-lg md:text-xl font-semibold",
  p: "text-base sm:text-lg text-slate-300 leading-relaxed",
};

export const Shadow = {
  neon: "drop-shadow-[0_0_25px_#3CF46B]",
  soft: "shadow-[0_0_15px_rgba(0,0,0,0.4)]",
};
