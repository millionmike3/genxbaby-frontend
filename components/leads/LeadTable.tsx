export default function LeadTable({ leads }) {
  return (
    <div className="gx-card p-6 rounded-xl">
      <table className="w-full text-left">
        <thead>
          <tr className="text-gray-400">
            <th>Name</th>
            <th>Hardship</th>
            <th>Investor</th>
            <th>Impulsivity</th>
            <th>Status</th>
            <th></th>
          </tr>
        </thead>

        <tbody>
          {leads.map((lead) => (
            <tr key={lead.id} className="border-t border-white/10">
              <td className="py-3">{lead.name}</td>
              <td>{lead.hardshipBand}</td>
              <td>{lead.investorPotentialBand}</td>
              <td>{lead.impulsivityBand}</td>
              <td>{lead.status}</td>
              <td>
                <a
                  href={`/leads/${lead.id}`}
                  className="gx-text-primary hover:underline"
                >
                  View
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
