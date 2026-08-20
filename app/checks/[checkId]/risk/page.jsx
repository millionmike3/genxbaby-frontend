import { CheckRiskTimelineView } from "@/components/risk/CheckRiskTimelineView";

export default async function Page({ params }) {
  const { checkId } = params;

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/checks/${checkId}/risk-history`,
    { cache: "no-store" }
  );

  const events = await res.json();

  return (
    <div className="p-6">
      <CheckRiskTimelineView checkId={checkId} events={events} />
    </div>
  );
}
