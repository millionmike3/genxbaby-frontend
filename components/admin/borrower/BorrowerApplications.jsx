export default function BorrowerApplications({ applications }) {
  return (
    <div className="bg-graphite p-6 rounded-lg shadow">
      <h2 className="text-xl font-semibold text-neon-green mb-4">
        Applications ({applications.length})
      </h2>

      <div className="space-y-4">
        {applications.map((app) => (
          <div
            key={app.id}
            className="p-4 bg-black rounded-lg border border-gray-700"
          >
            <p className="text-gray-300">
              <strong>Application ID:</strong> {app.id}
            </p>

            <p className="text-gray-300">
              <strong>Loan Amount:</strong> ${app.amount.toLocaleString()}
            </p>

            <p className="text-gray-300">
              <strong>Status:</strong> {app.decisionStatus}
            </p>

            <div className="mt-3 flex gap-4">
              <a
                href={`/admin/audit/${app.id}`}
                className="text-neon-green underline"
              >
                View Audit Logs
              </a>

              <a
                href={`/audit/${app.id}`}
                className="text-neon-green underline"
              >
                Open Audit Explorer
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
