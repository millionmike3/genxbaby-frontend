"use client";

import { useEffect, useState } from "react";
import LeadImporter from "@/components/leads/LeadImporter";
import LeadFilters from "@/components/leads/LeadFilters";
import LeadTable from "@/components/leads/LeadTable";

export default function LeadsPage() {
  const [filters, setFilters] = useState({});
  const [leads, setLeads] = useState([]);

  async function fetchLeads() {
    try {
      const res = await fetch("/api/leads");
      const data = await res.json();
      setLeads(data.leads || []);
    } catch (err) {
      console.error("FETCH LEADS ERROR:", err);
    }
  }

  useEffect(() => {
    fetchLeads();
  }, []);

  return (
    <div className="max-w-6xl mx-auto space-y-6 p-4">
      <h1 className="text-2xl font-bold">Lead Management</h1>

      {/* Importer */}
      <LeadImporter onImported={fetchLeads} />

      {/* Filters */}
      <LeadFilters filters={filters} onChange={setFilters} />

      {/* Table */}
      <LeadTable leads={leads} filters={filters} />
    </div>
  );
}
