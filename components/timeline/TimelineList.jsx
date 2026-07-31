import TimelineEventItem from "./TimelineEventItem";

export default function TimelineList({ events }) {
  if (!events || events.length === 0) {
    return (
      <p className="text-gray-400 text-center mt-10">
        No timeline events yet.
      </p>
    );
  }

  return (
    <div className="space-y-6">
      {events.map((event) => (
        <TimelineEventItem key={event.id} event={event} />
      ))}
    </div>
  );
}
