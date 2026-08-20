// components/ui/Button.tsx
"use client";

import { ReactNode } from "react";
import clsx from "clsx";

type Variant = "primary" | "secondary" | "outline";

interface ButtonProps {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: Variant;
  className?: string;
}

const base =
  "inline-flex items-center justify-center px-6 py-3 rounded-lg font-semibold transition focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gx-electricBlue";

const variants: Record<Variant, string> = {
  primary: "bg-gx-limeSignal text-black hover:bg-[#8BC42C]",
  secondary: "bg-gx-surface text-gray-200 border border-gx-royalViolet hover:bg-[#1F1F1F]",
  outline:
    "bg-transparent text-gray-200 border border-gx-neonGreen hover:bg-gx-neonGreen hover:text-black",
};

export function Button({ children, href, onClick, variant = "primary", className }: ButtonProps) {
  const classes = clsx(base, variants[variant], className);

  if (href) {
    return (
      <a href={href} className={classes}>
        {children}
      </a>
    );
  }

  return (
    <button onClick={onClick} className={classes}>
      {children}
    </button>
  );
}
