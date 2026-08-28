"use client";

import { ButtonHTMLAttributes, ReactNode } from "react";

interface DestructiveButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
}

export default function DestructiveButton(
  { children, ...props }: DestructiveButtonProps
) {
  return (
    <button
      {...props}
      className="bg-danger text-white font-medium px-4 py-2 rounded-md
                 hover:bg-danger/90 transition-all duration-150"
    >
      {children}
    </button>
  );
}
