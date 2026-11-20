import { cookies } from "next/headers";
import { getSession } from "@/lib/session";
import { getPrisma } from "@/lib/db/prisma";

export default async function OwnerPortalEquityPage() {
  // Read cookie
  const cookieStore = await cookies();
  const token = cookieStore.get("auth_token")?.value;

  if (!token) throw new Error("Not authenticated");

  // Decode JWT
  const session = await getSession(token);
  if (!session) throw new Error("Invalid session token");

  const userId = session.userId ?? null;
  if (!userId) {
    console.error("SESSION OBJECT:", session);
    throw new Error("Session missing userId");
  }

  const prisma = getPrisma();

  // Fetch user
  const user = await prisma.user.findUnique({
    where: { id: userId },
  });
  if (!user) throw new Error("User not found");

  // Fetch owner + properties + financials
  const owner = await prisma.owner.findFirst({
    where: { userId },
    include: {
      properties: {
        include: {
          ownerEquity: true,
          financials: true,
        },
      },
    },
  });
  if (!owner) {
    console.error("OWNER LOOKUP FAILED — session.userId =", userId);
    throw new Error("Owner record not found");
  }

  // Aggregate metrics
  const totalEquity =
    owner.properties.reduce(
      (sum, p) => sum + (p.ownerEquity?.equityAmount ?? 0),
      0
    ) ?? 0;

  const loanPaydownYTD =
    owner.properties.reduce(
      (sum, p) => sum + (p.financials?.loanPaydownYTD ?? 0),
      0
    ) ?? 0;

  const appreciationYTD =
    owner.properties.reduce(
      (sum, p) => sum + (p.financials?.appreciationYTD ?? 0),
      0
    ) ?? 0;

  const equityData = [
    { label: "Total Equity", value: `$${totalEquity.toLocaleString()}` },
    { label: "Loan Paydown (YTD)", value: `$${loanPaydownYTD.toLocaleString()}` },
    { label: "Appreciation (YTD)", value: `$${appreciationYTD.toLocaleString()}` },
  ];

  return (
    <div className="space-y-10 text-white">
      <div>
        <h1 className="text-4xl font-bold mb-4">Equity</h1>
        <p className="text-slate-300 text-lg">
          Track your equity growth across your portfolio, including loan
          paydown, appreciation, and total owner equity.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {equityData.map((e) => (
          <div
            key={e.label}
            className="bg-slate-800/60 rounded-xl p-6 border border-slate-700"
          >
            <h3 className="text-sm text-slate-300">{e.label}</h3>
            <p className="text-3xl font-semibold mt-2">{e.value}</p>
          </div>
        ))}
      </div>

      <section className="bg-slate-800/40 p-6 rounded-xl border border-slate-700">
        <h3 className="text-lg font-semibold mb-2">Equity Insights</h3>
        <p className="text-slate-300">
          Detailed equity charts, appreciation trends, and loan amortization
          breakdowns will appear here as your portfolio intelligence expands.
        </p>
      </section>
    </div>
  );
}
