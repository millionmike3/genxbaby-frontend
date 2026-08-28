"use client";

import { ButtonHTMLAttributes, ReactNode } from "react";

interface PrimaryButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
}

export default function PrimaryButton(
  { children, ...props }: PrimaryButtonProps
) {
  return (
    <button
      {...props}
      className="bg-primary text-white font-medium px-4 py-2 rounded-md
                 hover:bg-primary/90 transition-all duration-150"
    >
      {children}
    </button>
  );
}
