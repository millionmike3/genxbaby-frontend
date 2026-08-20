"use client";

export default function LeadFilters({ filters, onChange }) {
  function updateFilter(key: string, value: string) {
    onChange({ ...filters, [key]: value });
  }

  return (
    <div className="gx-card p-4 rounded-xl mb-6 flex flex-wrap gap-4">
      <FilterSelect
        label="Hardship"
        value={filters.hardshipBand || ""}
        onChange={(v) => updateFilter("hardshipBand", v)}
        options={["", "low", "medium", "high", "critical"]}
      />
      <FilterSelect
        label="Investor"
        value={filters.investorPotentialBand || ""}
        onChange={(v) => updateFilter("investorPotentialBand", v)}
        options={["", "low", "medium", "high"]}
      />
      <FilterSelect
        label="Impulsivity"
        value={filters.impulsivityBand || ""}
        onChange={(v) => updateFilter("impulsivityBand", v)}
        options={["", "low", "medium", "high"]}
      />
      <FilterSelect
        label="Status"
        value={filters.status || ""}
        onChange={(v) => updateFilter("status", v)}
        options={["", "new", "contacted", "in_conversation", "converted", "dead"]}
      />
    </div>
  );
}

function FilterSelect({ label, value, onChange, options }) {
  return (
    <div>
      <p className="text-gray-400 text-sm mb-1">{label}</p>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="bg-[#111118] text-white p-2 rounded-lg min-w-[140px]"
      >
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt === "" ? "All" : opt.charAt(0).toUpperCase() + opt.slice(1)}
          </option>
        ))}
      </select>
    </div>
  );
}
