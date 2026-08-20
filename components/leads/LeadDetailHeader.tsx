export default function LeadDetailHeader({ lead }) {
  return (
    <div className="gx-card p-6 rounded-xl flex justify-between items-center">
      <div>
        <h1 className="text-2xl font-bold gx-text-primary">{lead.name}</h1>
        <p className="text-gray-400">{lead.email}</p>
        {lead.phone && <p className="text-gray-400">{lead.phone}</p>}
      </div>

      <div className="text-right">
        <p className="text-gray-400">Status</p>
        <p className="text-xl font-semibold capitalize">{lead.status}</p>
      </div>
    </div>
  );
}
