import { getPrisma } from "@/lib/db/prisma";
import { auth } from "@/lib/auth";

export default async function BorrowerDisclosuresPage() {
  const session = await auth();
  if (!session?.user) {
    return (
      <main className="min-h-screen bg-slate-950 text-white p-6">
        Unauthorized
      </main>
    );
  }

  const prisma = await getPrisma();

  const app = await prisma.application.findFirst({
    where: { borrower: { userId: session.user.id } },
    orderBy: { createdAt: "desc" },
    include: { disclosures: true },
  });

  if (!app) {
    return (
      <main className="min-h-screen bg-slate-950 text-white p-6">
        <h1 className="text-2xl font-bold mb-4">Disclosures</h1>
        <p className="text-sm text-slate-400">
          No application found.
        </p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-950 text-white p-6">
      <h1 className="text-2xl font-bold mb-4">Disclosures</h1>
      <p className="text-sm text-slate-400 mb-4">
        Application: {app.id}
      </p>

      <div className="space-y-3 text-sm">
        {app.disclosures.map((d) => (
          <div
            key={d.id}
            className="border border-slate-800 rounded p-3 flex justify-between items-center"
          >
            <div>
              <div className="font-semibold">
                {d.type === "initial" ? "Initial Disclosures" : d.type}
              </div>
              <div className="text-xs text-slate-400">
                {new Date(d.createdAt).toLocaleString()}
              </div>
            </div>
            <a
              href={d.url}
              target="_blank"
              className="text-[#4EE38A] text-xs font-semibold"
            >
              View PDF
            </a>
          </div>
        ))}
      </div>
    </main>
  );
}
