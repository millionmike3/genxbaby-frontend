"use client";

interface LeadDetailHeaderProps {
  lead: {
    id: string;
    name?: string;
    email?: string;
    phone?: string;
    status?: string;
  };
}

export default function LeadDetailHeader({ lead }: LeadDetailHeaderProps) {
  return (
    <div className="gx-card p-6 rounded-xl flex justify-between items-center">
      <div>
        <h2 className="text-2xl font-bold text-white">
          {lead.name ?? "Unnamed Lead"}
        </h2>

        <p className="text-gray-400 mt-1">
          Lead ID: <span className="text-white">{lead.id}</span>
        </p>

        {lead.email && (
          <p className="text-gray-400 mt-1">
            Email: <span className="text-white">{lead.email}</span>
          </p>
        )}

        {lead.phone && (
          <p className="text-gray-400 mt-1">
            Phone: <span className="text-white">{lead.phone}</span>
          </p>
        )}
      </div>

      <div className="text-right">
        <span className="px-3 py-1 rounded-lg bg-white/10 text-sm text-white">
          {lead.status ?? "Unknown"}
        </span>
      </div>
    </div>
  );
}
