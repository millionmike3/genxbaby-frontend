
import { getPrisma } from "@/lib/db/prisma";

export const dynamic = "force-dynamic";

export default async function ServicingTransferPage() {
  const prisma = await getPrisma();

  // Assume servicing admin identity resolved via session/middleware
  const adminId = "CURRENT_SERVICING_ADMIN_ID";

  const context = await prisma.servicingAdmin.findUnique({
    where: { id: adminId },
    include: {
      transferBatches: {
        orderBy: { createdAt: "desc" },
        take: 50,
      },
      transferLoans: {
        orderBy: { createdAt: "desc" },
        take: 200,
      },
      transferEvents: {
        orderBy: { createdAt: "desc" },
        take: 200,
      },
      counterparties: {
        orderBy: { name: "asc" },
      },
    },
  });

  const batches = context.transferBatches;
  const loans = context.transferLoans;
  const events = context.transferEvents;
  const counterparties = context.counterparties;

  const totalTransferUPB = loans.reduce(
    (sum, l) => sum + (l.unpaidPrincipalBalance ?? 0),
    0
  );

  const pendingLoans = loans.filter((l) => l.status === "PENDING").length;
  const inFlightLoans = loans.filter((l) => l.status === "IN_FLIGHT").length;
  const completedLoans = loans.filter((l) => l.status === "COMPLETED").length;
  const failedLoans = loans.filter((l) => l.status === "FAILED").length;

  return (
    <main className="min-h-screen bg-slate-950 text-white p-6 space-y-16">
      <h1 className="text-4xl font-bold text-[#3CF46B]">
        Servicing Transfer Module
      </h1>

      {/* Top summary */}
      <section className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card
          title="Total UPB in Transfer"
          value={`$${totalTransferUPB.toLocaleString()}`}
        />
        <Card
          title="Pending / In‑Flight"
          value={`${pendingLoans} / ${inFlightLoans}`}
        />
        <Card
          title="Completed Transfers"
          value={completedLoans}
        />
        <Card
          title="Failed Transfers"
          value={failedLoans}
        />
      </section>

      {/* Counterparties */}
      <Section title="Servicing Counterparties">
        {counterparties.length === 0 && (
          <Empty label="No servicing counterparties configured." />
        )}
        {counterparties.map((c) => (
          <Row
            key={c.id}
            primary={c.name}
            secondary={`Type: ${c.type} • Boarding SLA: ${c.boardingSlaDays} days`}
            right={`Active: ${c.isActive ? "Yes" : "No"}`}
          />
        ))}
      </Section>

      {/* Transfer batches */}
      <Section title="Transfer Batches">
        {batches.length === 0 && (
          <Empty label="No transfer batches created yet." />
        )}
        {batches.map((b) => (
          <Row
            key={b.id}
            primary={`Batch ${b.id} — Counterparty: ${b.counterpartyName}`}
            secondary={`Loans: ${b.loanCount} • UPB: $${Number(
              b.totalUpb ?? 0
            ).toLocaleString()}`}
            right={`Created ${new Date(b.createdAt).toLocaleDateString()}`}
          />
        ))}
      </Section>

      {/* Loan‑level transfer status */}
      <Section title="Loan‑Level Transfer Status">
        {loans.length === 0 && (
          <Empty label="No loans currently in transfer workflow." />
        )}
        <table className="w-full text-sm">
          <thead>
            <tr className="text-slate-400">
              <th className="text-left py-2">Loan</th>
              <th className="text-left py-2">UPB</th>
              <th className="text-left py-2">From / To</th>
              <th className="text-left py-2">Status</th>
              <th className="text-left py-2">Boarding Date</th>
            </tr>
          </thead>
          <tbody>
            {loans.map((l) => (
              <tr
                key={l.id}
                className="border-t border-neutral-800"
              >
                <td className="py-2">{l.loanId}</td>
                <td className="py-2">
                  ${Number(l.unpaidPrincipalBalance ?? 0).toLocaleString()}
                </td>
                <td className="py-2">
                  {l.fromServicer} → {l.toServicer}
                </td>
                <td className="py-2">{l.status}</td>
                <td className="py-2">
                  {l.boardingDate
                    ? new Date(l.boardingDate).toLocaleDateString()
                    : "-"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Section>

      {/* Transfer events / timeline */}
      <Section title="Transfer Events Timeline">
        {events.length === 0 && (
          <Empty label="No transfer events recorded yet." />
        )}
        {events.map((e) => (
          <Row
            key={e.id}
            primary={`Loan ${e.loanId} — ${e.eventType}`}
            secondary={e.details}
            right={new Date(e.createdAt).toLocaleString()}
          />
        ))}
      </Section>
    </main>
  );
}

function Card({ title, value }: { title: string; value: string | number }) {
  return (
    <div className="bg-neutral-900 border border-neutral-700 rounded-xl p-6">
      <h3 className="text-lg font-semibold text-slate-300">{title}</h3>
      <p className="text-3xl font-bold mt-2">{value}</p>
    </div>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="space-y-4">
      <h2 className="text-2xl font-bold text-[#3CF46B]">{title}</h2>
      <div className="bg-neutral-900 border border-neutral-700 rounded-xl p-4 space-y-2">
        {children}
      </div>
    </section>
  );
}

function Row({
  primary,
  secondary,
  right,
}: {
  primary: string;
  secondary?: string;
  right?: string;
}) {
  return (
    <div className="flex items-center justify-between py-2 border-b border-neutral-800 last:border-b-0">
      <div>
        <p className="text-sm font-semibold">{primary}</p>
        {secondary && (
          <p className="text-xs text-slate-400 mt-1">{secondary}</p>
        )}
      </div>
      {right && (
        <p className="text-xs text-slate-300 ml-4 whitespace-nowrap">
          {right}
        </p>
      )}
    </div>
  );
}

function Empty({ label }: { label: string }) {
  return <p className="text-xs text-slate-400">{label}</p>;
}
