import { requireRole } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function AdminPropertiesPage() {
  // Ensure only admins can access this page
  await requireRole(["ADMIN"]);

  // Fetch all properties
  const properties = await prisma.property.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <main className="min-h-screen bg-slate-900 text-white px-10 py-16 space-y-10">
      <h1 className="text-4xl font-bold text-[#3CF46B]">Properties</h1>

      {properties.length === 0 ? (
        <p className="text-neutral-400">No properties found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {properties.map((p) => (
            <div
              key={p.id}
              className="border border-neutral-700 bg-neutral-800/40 rounded-xl p-6"
            >
              <h2 className="text-xl font-semibold">{p.address}</h2>
              <p className="text-sm text-neutral-400">
                {p.city}, {p.state} {p.zip}
              </p>

              <div className="mt-4 space-y-1 text-sm">
                <p>
                  <span className="text-neutral-400">Value:</span>{" "}
                  ${p.value?.toLocaleString() ?? "—"}
                </p>
                <p>
                  <span className="text-neutral-400">Type:</span> {p.type ?? "—"}
                </p>
                <p>
                  <span className="text-neutral-400">Beds/Baths:</span>{" "}
                  {p.beds ?? "—"} / {p.baths ?? "—"}
                </p>
                <p>
                  <span className="text-neutral-400">Sq Ft:</span>{" "}
                  {p.sqft ?? "—"}
                </p>
                <p>
                  <span className="text-neutral-400">Year Built:</span>{" "}
                  {p.yearBuilt ?? "—"}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
