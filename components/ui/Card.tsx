// components/ui/Card.tsx
import { ReactNode } from "react";
import clsx from "clsx";

interface CardProps {
  title?: string;
  accentColor?: string;
  children: ReactNode;
  className?: string;
}

export function Card({ title, accentColor = "#9DD431", children, className }: CardProps) {
  return (
    <div
      className={clsx(
        "bg-gx-surface border border-gx-border rounded-xl p-6 shadow-[0_0_40px_rgba(0,0,0,0.6)]",
        className
      )}
    >
      {title && (
        <h3 className="font-semibold text-xl mb-3" style={{ color: accentColor }}>
          {title}
        </h3>
      )}
      <div className="text-gx-grayText text-sm">{children}</div>
    </div>
  );
}
