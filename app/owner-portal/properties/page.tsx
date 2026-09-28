import { getPrisma } from "@/lib/db/prisma";
import { cookies } from "next/headers";
import { getSession } from "@/lib/session";

export default async function OwnerPropertiesPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get("session")?.value;

  const session = await getSession(token);
  if (!session) throw new Error("Not authenticated");
  if (session.role !== "owner") throw new Error("Unauthorized");

  const prisma = await getPrisma();

  const user = await prisma.user.findUnique({
    where: { id: Number(session.userId) },
  });

  const entities = await prisma.ownershipEntity.findMany({
    where: { ownerId: user.id },
    include: {
      properties: {
        include: {
          financials: true,
          ownerEquity: true,
          rentRoll: true,
        },
      },
    },
  });

  return (
    <main className="px-6 md:px-12 lg:px-20 py-16 text-white bg-slate-900">
      <h1 className="text-4xl font-bold mb-6">Properties</h1>

      {entities.length === 0 ? (
        <p className="text-slate-400">No ownership entities found.</p>
      ) : (
        entities.map((entity) => (
          <section
            key={entity.id}
            className="mb-10 bg-slate-800/60 p-6 rounded-xl border border-slate-700"
          >
            <h2 className="text-2xl font-semibold mb-2">
              {entity.name} ({entity.type})
            </h2>
            <p className="text-slate-400 mb-4">
              EIN: {entity.ein ?? "—"} • Ownership:{" "}
              {entity.ownershipPercent ?? "—"}%
            </p>

            {entity.properties.length === 0 ? (
              <p className="text-slate-400">No properties under this entity.</p>
            ) : (
              <div className="space-y-6">
                {entity.properties.map((prop) => (
                  <div
                    key={prop.id}
                    className="bg-slate-900/40 p-4 rounded-lg border border-slate-700"
                  >
                    <h3 className="text-xl font-semibold mb-2">
                      {prop.address}, {prop.city}, {prop.state}
                    </h3>

                    <p>
                      <strong>Type:</strong> {prop.type}
                    </p>
                    <p>
                      <strong>Purchase Price:</strong>{" "}
                      {`$${prop.purchasePrice.toLocaleString()}`}
                    </p>
                    <p>
                      <strong>Current Value:</strong>{" "}
                      {prop.currentValue
                        ? `$${prop.currentValue.toLocaleString()}`  
                        : "—"}
                    </p>

                    {prop.financials && (
                      <div className="mt-3 text-sm text-slate-400">
                        <p>
                          <strong>NOI:</strong>{" "}
                          {prop.financials.noi
                            ? `$${prop.financials.noi.toLocaleString()}`
                            : "—"}
                        </p>
                        <p>
                          <strong>Cap Rate:</strong>{" "}
                          {prop.financials.capRate
                            ? `${prop.financials.capRate.toFixed(2)}%`
                            : "—"}
                        </p>
                      </div>
                    )}

                    {prop.ownerEquity && (
                      <div className="mt-3 text-sm text-slate-400">
                        <p>
                          <strong>Equity:</strong>{" "}
                          {`$${prop.ownerEquity.equityAmount.toLocaleString()}`}
                        </p>
                        <p>
                          <strong>Equity %:</strong>{" "}
                          {prop.ownerEquity.equityPercent ?? "—"}%
                        </p>
                      </div>
                    )}

                    {prop.rentRoll.length > 0 && (
                      <div className="mt-4">
                        <h4 className="font-semibold mb-2">Rent Roll</h4>
                        <ul className="space-y-2 text-sm text-slate-300">
                          {prop.rentRoll.map((unit) => (
                            <li
                              key={unit.id}
                              className="border border-slate-700 rounded-lg p-3"
                            >
                              <p>
                                <strong>Unit:</strong>{" "}
                                {unit.unitNumber ?? "—"}
                              </p>
                              <p>
                                <strong>Rent:</strong>{" "}
                                {`$${unit.rent.toLocaleString()}`}
                              </p>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </section>
        ))
      )}
    </main>
  );
}
