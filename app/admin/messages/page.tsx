import { getPrisma } from "@/lib/db/prisma";

export default async function AdminMessagesPage() {
  const prisma = await getPrisma();

  const messages = await prisma.adminMessage.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="space-y-10">
      <h1 className="text-4xl font-bold mb-4">Admin Messaging Board</h1>

      <div className="space-y-4">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className="bg-slate-800/60 p-6 rounded-xl border border-slate-700"
          >
            <h2 className="text-xl font-semibold">{msg.name}</h2>
            <p className="text-slate-300 text-sm">{msg.email}</p>

            <p className="text-slate-200 mt-4">{msg.message}</p>

            <p className="text-slate-500 text-xs mt-4">
              {msg.createdAt.toDateString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
