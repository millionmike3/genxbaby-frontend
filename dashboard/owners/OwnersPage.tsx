"use client";

import { useState, useEffect } from "react";
import OwnerDrawer from "./OwnerDrawer";

interface OwnersPageProps {
  apiUrl: string;
}

interface Owner {
  id: string;
  name: string;
  email: string;
}

export default function OwnersPage({ apiUrl }: OwnersPageProps) {
  const [owners, setOwners] = useState<Owner[]>([]);
  const [selected, setSelected] = useState<Owner | null>(null);

  useEffect(() => {
    async function loadOwners() {
      try {
        const res = await fetch(`${apiUrl}/dashboard/ai/owners`);
        const json: Owner[] = await res.json();
        setOwners(json);
      } catch (err) {
        console.error("Failed to load owners:", err);
      }
    }

    loadOwners();
  }, [apiUrl]);

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Owners</h2>
      <ul className="space-y-2">
        {owners.map((owner) => (
          <li key={owner.id}>
            <button
              onClick={() => setSelected(owner)}
              className="w-full text-left px-3 py-2 rounded hover:bg-gray-100"
            >
              {owner.name} <span className="gx-text-muted">({owner.email})</span>
            </button>
          </li>
        ))}
      </ul>

      {selected && (
        <OwnerDrawer
          ownerId={selected.id}
          apiUrl={apiUrl}
          onClose={() => setSelected(null)}
        />
      )}
    </div>
  );
}
