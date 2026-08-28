"use client";

interface SidebarProps {
  onNavigate: (key: string) => void;
}

export default function Sidebar({ onNavigate }: SidebarProps) {
  const items = [
    { key: "owners", label: "Owners" },
    { key: "fraud", label: "Fraud Intelligence" },
    { key: "heatmap", label: "Fraud Heatmap" },
    { key: "investigator", label: "Investigator Chat" },
  ];

  return (
    <aside className="gx-card p-4 w-64">
      <h2 className="text-lg font-bold mb-4">Dashboard</h2>
      <ul className="space-y-2">
        {items.map((item) => (
          <li key={item.key}>
            <button
              onClick={() => onNavigate(item.key)}
              className="w-full text-left px-3 py-2 rounded hover:bg-gray-100"
            >
              {item.label}
            </button>
          </li>
        ))}
      </ul>
    </aside>
  );
}
