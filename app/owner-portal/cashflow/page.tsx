import { cookies } from "next/headers";
import { getSession } from "@/lib/session";
import { getPrisma } from "@/lib/db/prisma";

export default async function PortalCashflowPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get("auth_token")?.value;

  if (!token) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        Not authenticated
      </div>
    );
  }

  const session = await getSession(token);
  if (!session) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        Invalid session token
      </div>
    );
  }

  const userId = session.userId ?? null;
  if (!userId) {
    console.error("SESSION OBJECT:", session);
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        Session missing userId
      </div>
    );
  }

  const prisma = getPrisma();

  // Fetch the user
  const user = await prisma.user.findUnique({ where: { id: userId } });
  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        User not found
      </div>
    );
  }

  // 🚦 Role‑aware branching
  if (session.role === "OWNER") {
    const owner = await prisma.owner.findFirst({ where: { userId } });
    if (!owner) {
      return (
        <div className="min-h-screen flex items-center justify-center text-white">
          No Owner record found for this account.
        </div>
      );
    }

    const properties = await prisma.property.findMany({
      where: { ownershipEntity: { ownerId: owner.userId } },
      include: { rentRoll: true, financials: true },
    });

    const mortgages = await prisma.mortgageAsset.findMany({
      where: { ownerId: owner.id },
      include: { payments: true },
    });

    const rentIncome = properties.reduce(
      (sum, p) => sum + p.rentRoll.reduce((s, r) => s + r.rent, 0),
      0
    );
    const mortgageIncome = mortgages.reduce(
      (sum, m) => sum + m.payments.reduce((s, p) => s + p.amount, 0),
      0
    );
    const expenses = properties.reduce(
      (sum, p) => sum + (p.financials?.expenses ?? 0),
      0
    );
    const netCashflow = rentIncome + mortgageIncome - expenses;

    return (
      <div className="space-y-10 text-white">
        <h1 className="text-4xl font-bold mb-4">Cashflow</h1>

        <section className="bg-slate-800/60 p-6 rounded-xl border border-slate-700">
          <h2 className="text-2xl font-semibold mb-2">Net Cashflow</h2>
          <p className="text-4xl font-bold text-[#4EE38A]">
            {`$${netCashflow.toLocaleString()}`}
          </p>
        </section>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-slate-800/60 p-6 rounded-xl border border-slate-700">
            <h3 className="text-xl font-semibold mb-2">Rent Income</h3>
            <p className="text-3xl font-bold">{`$${rentIncome.toLocaleString()}`}</p>
          </div>
          <div className="bg-slate-800/60 p-6 rounded-xl border border-slate-700">
            <h3 className="text-xl font-semibold mb-2">Mortgage Payment Income</h3>
            <p className="text-3xl font-bold">{`$${mortgageIncome.toLocaleString()}`}</p>
          </div>
          <div className="bg-slate-800/60 p-6 rounded-xl border border-slate-700">
            <h3 className="text-xl font-semibold mb-2">Expenses</h3>
            <p className="text-3xl font-bold text-red-400">
              {`$${expenses.toLocaleString()}`}
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (session.role === "ADMIN") {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        <h1 className="text-4xl font-bold">Admin Dashboard</h1>
        <p className="mt-4 text-lg text-slate-300">
          Welcome, Admin. Cashflow data is only available to Owners.
        </p>
      </div>
    );
  }

  if (session.role === "INVESTOR") {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        <h1 className="text-4xl font-bold">Investor Dashboard</h1>
        <p className="mt-4 text-lg text-slate-300">
          Welcome, Investor. Portfolio and performance data will appear here.
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center text-white">
      Unknown role: {session.role}
    </div>
  );
}
