import { OwnerDocumentsView } from "@/components/risk/OwnerDocumentsView";

export default async function Page({ params }) {
  const { ownerId } = params;

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/owners/${ownerId}/documents`,
    { cache: "no-store" }
  );

  const documents = await res.json();

  return (
    <div className="p-6">
      <OwnerDocumentsView ownerId={ownerId} documents={documents} />
    </div>
  );
}
