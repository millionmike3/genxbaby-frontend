async function getDocument(id: string) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/documents/${id}`,
    { cache: "no-store" }
  );

  const json = await res.json();
  return json.data ?? null;
}

export default async function DocumentPage({ params }: { params: { id: string } }) {
  const doc = await getDocument(params.id);

  if (!doc) {
    return (
      <div className="p-6">
        <h1 className="text-xl font-semibold">Document not found</h1>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">{doc.name}</h1>

      <div className="space-y-2 text-sm">
        <div><strong>Type:</strong> {doc.type}</div>
        <div>
          <strong>Uploaded:</strong>{" "}
          {new Date(doc.uploadedAt).toLocaleDateString()}
        </div>
      </div>

      <a
        href={doc.url}
        target="_blank"
        className="text-blue-600 hover:underline"
      >
        Open Document →
      </a>
    </div>
  );
}
