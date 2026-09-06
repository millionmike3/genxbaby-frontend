export default function TimelineEventItem({ event }) {
  return (
    <div className="border border-gray-700 bg-black p-4 rounded-lg shadow">
      <div className="flex justify-between">
        <h3 className="text-neon-green font-semibold">{event.title}</h3>

        <span className="text-gray-400 text-sm">
          {event?.createdAt
            ? new Date(event.createdAt).toLocaleString()
            : "No timestamp"}
        </span>
      </div>

      {event.description && (
        <p className="text-gray-300 mt-2">{event.description}</p>
      )}

      {event.payload && (
        <pre className="bg-graphite text-gray-200 p-3 rounded mt-3 text-sm overflow-x-auto">
          {JSON.stringify(event.payload, null, 2)}
        </pre>
      )}
    </div>
  );
}
