
import { getPrisma } from "@/lib/db/prisma";

export const dynamic = "force-dynamic";

export default async function BorrowerEngagementAnalyticsPage() {
  const prisma = await getPrisma();

  const context = await prisma.borrowerEngagementContext.findFirst({
    include: {
      engagementSessions: {
        orderBy: { startedAt: "desc" },
        take: 200,
      },
      channelStats: {
        orderBy: { channel: "asc" },
      },
      campaignStats: {
        orderBy: { createdAt: "desc" },
        take: 50,
      },
    },
  });

  const sessions = context.engagementSessions;
  const channels = context.channelStats;
  const campaigns = context.campaignStats;

  const avgEngagement =
    sessions.length === 0
      ? 0
      : Math.round(
          sessions.reduce(
            (sum, s) => sum + (s.engagementScore ?? 0),
            0
          ) / sessions.length
        );

  return (
    <main className="min-h-screen bg-slate-950 text-white p-6 space-y-16">
      <h1 className="text-4xl font-bold text-[#3CF46B]">
        Borrower Engagement Analytics
      </h1>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card title="Engagement Sessions" value={sessions.length} />
        <Card title="Avg Engagement Score" value={`${avgEngagement}%`} />
        <Card title="Active Campaigns" value={campaigns.length} />
      </section>

      <Section title="Channel Performance">
        {channels.length === 0 && <Empty label="No channel stats." />}
        <table className="w-full text-sm">
          <thead>
            <tr className="text-slate-400">
              <th className="text-left py-2">Channel</th>
              <th className="text-left py-2">Touches</th>
              <th className="text-left py-2">Response Rate</th>
              <th className="text-left py-2">Conversion Rate</th>
            </tr>
          </thead>
          <tbody>
            {channels.map((c) => (
              <tr key={c.id} className="border-t border-neutral-800">
                <td className="py-2">{c.channel}</td>
                <td className="py-2">{c.touchCount}</td>
                <td className="py-2">{c.responseRatePercent}%</td>
                <td className="py-2">{c.conversionRatePercent}%</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Section>

      <Section title="Engagement Sessions">
        {sessions.length === 0 && <Empty label="No engagement sessions." />}
        {sessions.map((s) => (
          <Row
            key={s.id}
            primary={`Borrower ${s.borrowerId} — Engagement ${s.engagementScore}`}
            secondary={`Channel: ${s.channel} • Duration: ${s.durationSeconds}s`}
            right={new Date(s.startedAt).toLocaleString()}
          />
        ))}
      </Section>

      <Section title="Campaign Analytics">
        {campaigns.length === 0 && <Empty label="No campaigns." />}
        {campaigns.map((c) => (
          <Row
            key={c.id}
            primary={`${c.name} — ${c.type}`}
            secondary={`Sent: ${c.sentCount} • Open: ${c.openRatePercent}% • Click: ${c.clickRatePercent}%`}
            right={new Date(c.createdAt).toLocaleDateString()}
          />
        ))}
      </Section>
    </main>
  );
}

function Card({ title, value }: { title: string; value: string | number }) {
  return (
    <div className="bg-neutral-900 border border-neutral-700 rounded-xl p-6">
      <h3 className="text-lg font-semibold text-slate-300">{title}</h3>
      <p className="text-3xl font-bold mt-2">{value}</p>
    </div>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="space-y-4">
      <h2 className="text-2xl font-bold text-[#3CF46B]">{title}</h2>
      <div className="bg-neutral-900 border border-neutral-700 rounded-xl p-4 space-y-2">
        {children}
      </div>
    </section>
  );
}

function Row({
  primary,
  secondary,
  right,
}: {
  primary: string;
  secondary?: string;
  right?: string;
}) {
  return (
    <div className="flex items-center justify-between py-2 border-b border-neutral-800 last:border-b-0">
      <div>
        <p className="text-sm font-semibold">{primary}</p>
        {secondary && (
          <p className="text-xs text-slate-400 mt-1">{secondary}</p>
        )}
      </div>
      {right && (
        <p className="text-xs text-slate-300 ml-4 whitespace-nowrap">
          {right}
        </p>
      )}
    </div>
  );
}

function Empty({ label }: { label: string }) {
  return <p className="text-xs text-slate-400">{label}</p>;
}
