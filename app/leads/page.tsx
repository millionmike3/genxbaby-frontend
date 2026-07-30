"use client";

import { useEffect, useState } from "react";
import LeadTable from "@/components/leads/LeadTable";
import LeadFilters from "@/components/leads/LeadFilters";

export default function LeadsPage() {
  const [leads, setLeads] = useState([]);
const [filters, setFilters] = useState({});
  useEffect(() => {
    async function fetchLeads() {
      const res = await fetch("/api/leads");
      const data = await res.json();
      setLeads(data || []);
    }
    fetchLeads();
  }, []);
import LeadImporter from "@/components/leads/LeadImporter";
// ...
<LeadImporter />
<LeadFilters filters={filters} onChange={setFilters} />
<LeadTable leads={leads} />

  return (
    <div className="px-6 py-10">
      <h1 className="text-3xl font-bold gx-text-primary mb-6">Lead CRM</h1>

      <LeadTable leads={leads} />
    </div>
  );
}
