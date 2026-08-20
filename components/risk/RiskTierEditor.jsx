"use client";

import { useState } from "react";

export function RiskTierEditor({ tiers }) {
  const [items, setItems] = useState(tiers);
  const [saving, setSaving] = useState(false);

  async function saveTier(tierName, updated) {
    setSaving(true);

    await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/risk/tiers/${tierName}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updated),
      }
    );

    setSaving(false);
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Risk Tier Editor</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {items.map((tier) => (
          <TierCard
            key={tier.tier}
            tier={tier}
            onSave={(updated) => saveTier(tier.tier, updated)}
          />
        ))}
      </div>

      {saving && (
        <div className="text-green-600 font-semibold">
          Saving changes…
        </div>
      )}
    </div>
  );
}
