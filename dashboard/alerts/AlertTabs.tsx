"use client";

interface AlertTabsProps {
  tab: string;
  setTab: (value: string) => void;
}

export default function AlertTabs({ tab, setTab }: AlertTabsProps) {
  const tabs = ["ALL", "HIGH", "MEDIUM", "LOW"];

  return (
    <div className="flex gap-2 mb-4">
      {tabs.map((t) => (
        <button
          key={t}
          onClick={() => setTab(t)}
          className={`px-3 py-1 rounded ${
            tab === t ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-700"
          }`}
        >
          {t}
        </button>
      ))}
    </div>
  );
}
