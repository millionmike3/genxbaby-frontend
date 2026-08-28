"use client";

interface InteractiveCardProps {
  title: string;
  children: React.ReactNode;
}

export default function InteractiveCard({ title, children }: InteractiveCardProps) {
  return (
    <div className="bg-surface border border-border rounded-md p-5 shadow-card
                    transition-all duration-200 hover:border-electricBlue hover:shadow-drop">
      <h3 className="text-electricBlue font-semibold text-lg">{title}</h3>
      <div className="mt-3">{children}</div>
    </div>
  );
}
