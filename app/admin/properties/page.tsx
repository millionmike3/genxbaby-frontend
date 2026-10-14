// app/admin/properties/page.tsx

import { requireRole } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export default async function AdminPropertiesPage() {
  await requireRole(["admin"]);

  const properties = await prisma.property.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <main className="min-h-screen bg-slate-900 text-white px-10 py-16 space-y-10">
      <h1 className="text-4xl font-bold text-[#3CF46B]">Properties</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {properties.map((p) => (
          <div
            key={p.id}
            className="border border-neutral-700 bg-neutral-800/40 rounded-xl p-6"
          >
            <h2 className="text-xl font-semibold">{p.address}</h2>
            <p className="text-sm text-neutral-400">{p.city}, {p.state} {p.zip}</p>

            <div className="mt-4 space-y-1 text-sm">
              <p>Value: ${p.value}</p>
              <p>Type: {p.type}</p>
              <p>Beds/Baths: {p.beds} / {p.baths}</p>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
