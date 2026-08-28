"use client";

import { useEffect, useState } from "react";

interface FraudTimelineProps {
  apiUrl: string;
}

interface TimelineEvent {
  id: string;
  date: string;
  description: string;
}

export default function FraudTimeline({ apiUrl }: FraudTimelineProps) {
  const [events, setEvents] = useState<TimelineEvent[]>([]);

  useEffect(() => {
    async function loadTimeline() {
      try {
        const res = await fetch(`${apiUrl}/dashboard/ai/fraud-timeline`);
        const json: TimelineEvent[] = await res.json();
        setEvents(json);
      } catch (err) {
        console.error("Failed to load fraud timeline:", err);
      }
    }

    loadTimeline();
  }, [apiUrl]);

  if (events.length === 0) {
    return (
      <div className="gx-card p-6">
        <h2 className="text-lg font-bold">Fraud Timeline</h2>
        <p>No events available.</p>
      </div>
    );
  }

  return (
    <div className="gx-card p-6">
      <h2 className="text-lg font-bold mb-4">Fraud Timeline</h2>
      <ul className="list-disc pl-6">
        {events.map((event) => (
          <li key={event.id}>
            {event.date}: {event.description}
          </li>
        ))}
      </ul>
    </div>
  );
}
