export default function Page({ params }: { params: { id: string } }) {
  const { id } = params;

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold">Admin Dashboard</h1>

      <div className="mt-4 text-gray-700">
        Viewing dashboard for ID: <span className="font-semibold">{id}</span>
      </div>

      {/* Add your dashboard content here */}
    </div>
  );
}
