import { Suspense } from "react";

async function getDocuments(id: string) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/application/${id}/documents`,
    { cache: "no-store" }
  );

  const json = await res.json();
  return json.data ?? [];
}

export default async function ApplicationDocumentsPage({ params }: { params: { id: string } }) {
  const docs = await getDocuments(params.id);

  return (
    <div className="p-6 space-y-10">
      <h1 className="text-2xl font-bold">Documents</h1>

      <Suspense fallback={<div>Loading...</div>}>
        <DocumentsTable docs={docs} />
      </Suspense>
    </div>
  );
}

function DocumentsTable({ docs }: { docs: any[] }) {
  if (docs.length === 0) {
    return <p className="text-gray-500 text-sm">No documents uploaded.</p>;
  }

  return (
    <table className="w-full text-sm">
      <thead>
        <tr className="border-b">
          <th className="py-2 text-left">Name</th>
          <th className="py-2 text-left">Type</th>
          <th className="py-2 text-left">Uploaded</th>
          <th className="py-2 text-left">View</th>
        </tr>
      </thead>
      <tbody>
        {docs.map((doc) => (
          <tr key={doc.id} className="border-b">
            <td className="py-2">{doc.name}</td>
            <td className="py-2">{doc.type}</td>
            <td className="py-2">
              {new Date(doc.uploadedAt).toLocaleDateString()}
            </td>
            <td className="py-2">
              <a
                href={doc.url}
                target="_blank"
                className="text-blue-600 hover:underline"
              >
                View →
              </a>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
