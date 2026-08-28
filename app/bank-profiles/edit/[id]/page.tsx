export default async function EditBankProfilePage({
  params,
}: {
  params: { id: string };
}) {
  const backendUrl = process.env.BACKEND_URL;

  const res = await fetch(
    `${backendUrl}/api/bank-profiles/details?id=${params.id}`,
    {
      cache: "no-store",
    }
  );

  if (!res.ok) {
    return <div className="p-10">Failed to load bank profile.</div>;
  }

  const profile = await res.json();

  return (
    <div className="p-10 max-w-xl mx-auto space-y-6">
      <h1 className="text-3xl font-bold">Edit Bank Profile</h1>

      {/* Render your edit form here */}
      <pre className="bg-gray-100 p-4 rounded">{JSON.stringify(profile, null, 2)}</pre>
    </div>
  );
}
