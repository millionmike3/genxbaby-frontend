import TimelineList from "@/components/timeline/TimelineList";

export default async function Page({ params }) {
  const { applicationId } = params;

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_UNDERWRITING_API}/timeline/application/${applicationId}`,
    { cache: "no-store" }
  );

  const data = await res.json();

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-neon-green mb-6">
        MLO Timeline
      </h1>

      <TimelineList events={data.events} />
    </div>
  );
}
