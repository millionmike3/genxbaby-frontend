import Image from "next/image";

type CheckPreviewProps = {
  params: {
    id: string;
  };
};

export default async function CheckPreview({ params }: CheckPreviewProps) {
  const check = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/verify/check/${params.id}`
  ).then((r) => r.json());

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Check #{check.checkNumber}</h1>

      <iframe
        src={`/api/docs/check/${params.id}/download`}
        className="w-full h-[600px] border"
      />

      <div className="mt-6 space-y-2">
        <p>Payee: {check.payee}</p>
        <p>Amount: ${check.amount}</p>
        <p>Status: {check.status}</p>
        <p>Anchored: {check.anchored ? "Yes" : "No"}</p>
      </div>
    </div>
  );
}
