"use client";

import { ButtonHTMLAttributes, ReactNode } from "react";

interface NeonButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
}

export default function NeonButton(
  { children, ...props }: NeonButtonProps
) {
  return (
    <button
      {...props}
      className="px-4 py-2 rounded-md bg-purple-600 text-white font-medium
                 shadow-[0_0_10px_rgba(168,85,247,0.7)]
                 hover:shadow-[0_0_15px_rgba(168,85,247,0.9)]
                 transition-all duration-150"
    >
      {children}
    </button>
  );
}
