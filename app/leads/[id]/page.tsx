"use client";

import { useEffect, useState } from "react";
import LeadScoreCard from "@/components/leads/LeadScoreCard";
import LeadTimeline from "@/components/leads/LeadTimeline";
import LeadDetailHeader from "@/components/leads/LeadDetailHeader";
import LeadContactPanel from "@/components/leads/LeadContactPanel";

export default function LeadDetailPage({ params }) {
  const { id } = params;

  const [lead, setLead] = useState(null);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    async function fetchLead() {
      const res = await fetch(`/api/leads/${id}`);
      const data = await res.json();
      setLead(data);
    }

    async function fetchEvents() {
      const res = await fetch(`/api/events?leadId=${id}`);
      const data = await res.json();
      setEvents(data || []);
    }

    fetchLead();
    fetchEvents();
  }, [id]);

  if (!lead) return <div className="p-6">Loading...</div>;

  return (
    <div className="px-6 py-10 space-y-10">
      <LeadDetailHeader lead={lead} />
<LeadContactPanel leadId={id} />
<LeadScoreCard lead={lead} />
<LeadTimeline events={events} />
    </div>
  );
}
