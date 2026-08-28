"use client";

interface LeadScoreCardProps {
  lead: {
    hardshipBand?: string;
    investorPotentialBand?: string;
    impulsivityBand?: string;
    riskScore?: number | string;
  };
}

export default function LeadScoreCard({ lead }: LeadScoreCardProps) {
  return (
    <div className="gx-card p-6 rounded-xl">
      <h2 className="text-xl font-bold gx-text-primary mb-4">Lead Scores</h2>

      <div className="space-y-3 text-gray-300 text-sm">
        <ScoreRow label="Hardship" value={lead.hardshipBand} color="#3CF46B" />
        <ScoreRow
          label="Investor Potential"
          value={lead.investorPotentialBand}
          color="#4FB6FF"
        />
        <ScoreRow
          label="Impulsivity"
          value={lead.impulsivityBand}
          color="#FFB84F"
        />
        <ScoreRow
          label="Risk Score"
          value={lead.riskScore?.toString() ?? "N/A"}
          color="#9DD431"
        />
      </div>
    </div>
  );
}

interface ScoreRowProps {
  label: string;
  value?: string;
  color: string;
}

function ScoreRow({ label, value, color }: ScoreRowProps) {
  return (
    <div className="flex justify-between items-center">
      <span>{label}</span>
      <span
        className="px-3 py-1 rounded-lg text-black font-semibold"
        style={{ backgroundColor: color }}
      >
        {value ?? "N/A"}
      </span>
    </div>
  );
}
