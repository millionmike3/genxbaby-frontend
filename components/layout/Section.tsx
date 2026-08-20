// components/layout/Section.tsx
import { ReactNode } from "react";
import clsx from "clsx";

interface SectionProps {
  children: ReactNode;
  className?: string;
  maxWidth?: "md" | "lg" | "xl";
  center?: boolean;
}

const widths = {
  md: "max-w-3xl",
  lg: "max-w-5xl",
  xl: "max-w-6xl",
};

export function Section({
  children,
  className,
  maxWidth = "lg",
  center = false,
}: SectionProps) {
  return (
    <section
      className={clsx(
        "px-6 py-16 mx-auto",
        widths[maxWidth],
        center && "text-center",
        className
      )}
    >
      {children}
    </section>
  );
}
