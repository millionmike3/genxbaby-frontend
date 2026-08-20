export default function LeadScoreCard({ lead }) {
  return (
    <div className="gx-card p-6 rounded-xl">
      <h2 className="text-xl font-bold gx-text-primary mb-4">Lead Scores</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <ScoreBox title="Hardship" score={lead.hardshipScore} band={lead.hardshipBand} />
        <ScoreBox title="Investor Potential" score={lead.investorPotentialScore} band={lead.investorPotentialBand} />
        <ScoreBox title="Impulsivity" score={lead.impulsivityScore} band={lead.impulsivityBand} />
      </div>
    </div>
  );
}

function ScoreBox({ title, score, band }) {
  return (
    <div className="bg-[#111118] p-4 rounded-lg">
      <h3 className="font-semibold mb-2">{title}</h3>
      <p className="text-3xl font-bold gx-text-primary">{score}</p>
      <p className="text-gray-400 capitalize">{band}</p>
    </div>
  );
}
