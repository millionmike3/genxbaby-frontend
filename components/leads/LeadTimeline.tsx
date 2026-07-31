export default function LeadTimeline({ events }) {
  return (
    <div className="gx-card p-6 rounded-xl">
      <h2 className="text-xl font-bold gx-text-primary mb-4">Behavior Timeline</h2>

      <div className="space-y-4">
        {events.map((event) => (
          <div key={event.id} className="bg-[#111118] p-4 rounded-lg">
            <p className="font-semibold">{event.eventType}</p>
            <p className="text-gray-400 text-sm">{new Date(event.timestamp).toLocaleString()}</p>
            {event.description && (
              <p className="text-gray-500 mt-1">{event.description}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
