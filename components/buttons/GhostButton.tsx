"use client";

import { ButtonHTMLAttributes, ReactNode } from "react";

interface GhostButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
}

export default function GhostButton(
  { children, ...props }: GhostButtonProps
) {
  return (
    <button
      {...props}
      className="px-4 py-2 rounded-md border border-gray-300 text-gray-700
                 hover:bg-gray-100 transition-all duration-150"
    >
      {children}
    </button>
  );
}
