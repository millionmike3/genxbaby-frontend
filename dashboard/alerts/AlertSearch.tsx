"use client";

interface AlertSearchProps {
  search: string;
  setSearch: (value: string) => void;
}

export default function AlertSearch({ search, setSearch }: AlertSearchProps) {
  return (
    <input
      type="text"
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      placeholder="Search alerts..."
      className="w-full p-2 rounded-lg bg-white/10 text-white border border-white/20"
    />
  );
}
