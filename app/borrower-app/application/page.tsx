import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";

export default async function BorrowerApplicationPage() {
  const session = await auth();
  if (!session?.user) {
    return <div className="p-6 text-white">Unauthorized</div>;
  }

  const app = await prisma.application.findFirst({
    where: { borrower: { userId: session.user.id } },
    orderBy: { createdAt: "desc" },
    include: { timelineEvents: true },
  });

  if (!app) {
    return (
      <main className="min-h-screen bg-slate-950 text-white p-6">
        <h1 className="text-2xl font-bold mb-4">My Application</h1>
        <p className="text-sm text-slate-400">
          No application found.
        </p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-950 text-white p-6">
      <h1 className="text-2xl font-bold mb-4">
        Application {app.id}
      </h1>
      <p className="text-sm text-slate-400 mb-6">
        Status: {app.status}
      </p>

      <h2 className="text-sm font-semibold mb-2">
        Timeline
      </h2>
      <div className="space-y-2 text-xs">
        {app.timelineEvents
          .sort(
            (a, b) =>
              new Date(a.createdAt).getTime() -
              new Date(b.createdAt).getTime()
          )
          .map((e) => (
            <div
              key={e.id}
              className="border border-slate-800 rounded p-2"
            >
              <div className="text-slate-400">
                {new Date(e.createdAt).toLocaleString()}
              </div>
              <div>{e.message}</div>
            </div>
          ))}
      </div>
    </main>
  );
}
