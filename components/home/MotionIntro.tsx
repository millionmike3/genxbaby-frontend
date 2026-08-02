"use client";

import { useEffect, useState } from "react";

export default function MotionIntro() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(false), 1800);
    return () => clearTimeout(timer);
  }, []);

  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-black">
      <div className="animate-pulse tracking-widest">
        <span className="text-3xl font-semibold text-gray-200">GEN</span>
        <span className="mx-2 text-3xl font-semibold text-[#3CF46B]">X</span>
        <span className="text-3xl font-semibold text-gray-200">BABY</span>
      </div>
    </div>
  );
}
