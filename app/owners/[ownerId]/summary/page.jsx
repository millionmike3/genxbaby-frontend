import { UnderwritingSummaryView } from "@/components/risk/UnderwritingSummaryView";

export default async function Page({ params }) {
  const { ownerId } = params;

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/underwriting/${ownerId}`,
    { cache: "no-store" }
  );

  const summary = await res.json();

  return (
    <div className="p-6">
      <UnderwritingSummaryView summary={summary} />
    </div>
  );
}
