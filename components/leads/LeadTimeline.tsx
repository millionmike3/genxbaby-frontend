"use client";

interface LeadTimelineEvent {
  id: string;
  label: string;
  timestamp: string;
  color?: string;
}

interface LeadTimelineProps {
  events: LeadTimelineEvent[];
}

export default function LeadTimeline({ events }: LeadTimelineProps) {
  return (
    <div className="gx-card p-6 rounded-xl">
      <h2 className="text-xl font-bold gx-text-primary mb-4">Behavior Timeline</h2>

      <div className="space-y-4">
        {events.map((event) => (
          <TimelineItem key={event.id} event={event} />
        ))}
      </div>
    </div>
  );
}

interface TimelineItemProps {
  event: LeadTimelineEvent;
}

function TimelineItem({ event }: TimelineItemProps) {
  return (
    <div className="flex items-start gap-3">
      <div
        className="w-3 h-3 rounded-full mt-1"
        style={{ backgroundColor: event.color ?? "#3CF46B" }}
      />

      <div>
        <p className="text-white font-medium">{event.label}</p>
        <p className="text-gray-400 text-sm">{new Date(event.timestamp).toLocaleString()}</p>
      </div>
    </div>
  );
}
