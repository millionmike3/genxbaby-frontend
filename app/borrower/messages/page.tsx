
import { getPrisma } from "@/lib/db/prisma";

export const dynamic = "force-dynamic";

export default async function BorrowerMessagesPage() {
  const prisma = await getPrisma();

  const borrowerId = "CURRENT_BORROWER_ID";

  const borrower = await prisma.borrower.findUnique({
    where: { id: borrowerId },
    include: {
      messages: {
        orderBy: { createdAt: "desc" },
        take: 50,
      },
      loan: true,
    },
  });

  const messages = borrower.messages;

  return (
    <main className="min-h-screen bg-slate-950 text-white p-6 space-y-12">
      <h1 className="text-4xl font-bold text-[#3CF46B]">
        Messages With Your Loan Officer
      </h1>

      <section className="bg-neutral-900 border border-neutral-700 rounded-xl p-6 space-y-4">
        {messages.length === 0 && (
          <p className="text-xs text-slate-400">
            You don’t have any messages yet.
          </p>
        )}

        {messages.map((m) => (
          <MessageRow
            key={m.id}
            from={m.fromRole}
            subject={m.subject}
            body={m.body}
            createdAt={m.createdAt}
          />
        ))}
      </section>
    </main>
  );
}

function MessageRow({
  from,
  subject,
  body,
  createdAt,
}: {
  from: string;
  subject: string;
  body: string;
  createdAt: Date;
}) {
  const fromLabel =
    from === "LOAN_OFFICER" ? "Your Loan Officer" : "You";

  return (
    <div className="border-b border-neutral-800 pb-3 mb-3">
      <div className="flex justify-between items-center">
        <p className="text-sm font-semibold">{subject}</p>
        <p className="text-xs text-slate-400">
          {new Date(createdAt).toLocaleString()}
        </p>
      </div>
      <p className="text-xs text-slate-400 mt-1">{fromLabel}</p>
      <p className="text-sm text-slate-300 mt-2 whitespace-pre-line">
        {body}
      </p>
    </div>
  );
}
