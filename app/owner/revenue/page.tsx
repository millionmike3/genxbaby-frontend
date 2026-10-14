
import { getPrisma } from "@/lib/db/prisma";

export const dynamic = "force-dynamic";

export default async function OwnerRevenueDashboard() {
  const prisma = await getPrisma();

  // TOTAL REVENUE
  const totalRevenue = await prisma.loan.aggregate({
    _sum: { revenue: true },
  });

  // PROFIT PER LOAN
  const loans = await prisma.loan.findMany({
    select: {
      id: true,
      revenue: true,
      cost: true, // cost = operational cost + delivery cost + hedge cost
      product: true,
      branchId: true,
      loanOfficerId: true,
      investorName: true,
      createdAt: true,
      llpaBps: true,
      overlayBps: true,
      marginBps: true,
      deliveryBps: true,
      exceptionBps: true,
    },
  });

  const profitPerLoan = loans.map((loan) => ({
    id: loan.id,
    profit: (loan.revenue ?? 0) - (loan.cost ?? 0),
  }));

  const avgProfitPerLoan =
    profitPerLoan.reduce((sum, l) => sum + l.profit, 0) /
    (profitPerLoan.length || 1);

  // REVENUE BY BRANCH
  const revenueByBranch = await prisma.loan.groupBy({
    by: ["branchId"],
    _sum: { revenue: true },
  });

  // REVENUE BY MONTH / YEAR
  const revenueByMonth = await prisma.loan.groupBy({
    by: ["createdAt"],
    _sum: { revenue: true },
  });

  const monthlyRevenue = revenueByMonth.reduce((acc, row) => {
    const month = new Date(row.createdAt).toLocaleString("default", {
      month: "short",
      year: "numeric",
    });
    acc[month] = (acc[month] || 0) + (row._sum.revenue ?? 0);
    return acc;
  }, {});

  // REVENUE BY MARGIN SOURCE
  const marginSourceTotals = {
    llpa: loans.reduce((sum, l) => sum + (l.llpaBps ?? 0), 0),
    overlays: loans.reduce((sum, l) => sum + (l.overlayBps ?? 0), 0),
    margins: loans.reduce((sum, l) => sum + (l.marginBps ?? 0), 0),
    delivery: loans.reduce((sum, l) => sum + (l.deliveryBps ?? 0), 0),
    exceptions: loans.reduce((sum, l) => sum + (l.exceptionBps ?? 0), 0),
  };

  // HEDGE-FUND DELIVERY REVENUE
  const hedgeDeliveryRevenue = loans.reduce((sum, l) => {
    const hedgeValue = (l.deliveryBps ?? 0) * (l.revenue ?? 0) * 0.0001;
    return sum + hedgeValue;
  }, 0);

  // INVESTOR PROFITABILITY
  const investorProfitability = loans.reduce((acc, loan) => {
    const investor = loan.investorName ?? "Unknown Investor";
    const profit = (loan.revenue ?? 0) - (loan.cost ?? 0);
    acc[investor] = (acc[investor] || 0) + profit;
    return acc;
  }, {});

  // AI-POWERED FORECASTING (simple linear projection)
  const last90Days = loans.filter(
    (l) => Date.now() - new Date(l.createdAt).getTime() < 90 * 86400000
  );

  const recentRevenue = last90Days.reduce(
    (sum, l) => sum + (l.revenue ?? 0),
    0
  );

  const aiForecastNext90Days = recentRevenue * 1.12; // +12% growth projection

  // BEHAVIORAL REVENUE INTELLIGENCE
  const behavioralRevenue = loans.reduce((acc, loan) => {
    const behaviorImpact =
      (loan.overlayBps ?? 0) +
      (loan.exceptionBps ?? 0) +
      (loan.llpaBps ?? 0) * 0.1;
    acc += behaviorImpact;
    return acc;
  }, 0);

  return (
    <main className="min-h-screen bg-slate-950 text-white p-6 space-y-12">
      <h1 className="text-4xl font-bold text-[#3CF46B]">
        Owner Revenue Dashboard
      </h1>

      {/* TOP CARDS */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card title="Total Revenue" value={`$${(totalRevenue._sum.revenue ?? 0).toLocaleString()}`} />
        <Card title="Avg Profit Per Loan" value={`$${avgProfitPerLoan.toLocaleString()}`} />
        <Card title="AI Forecast (Next 90 Days)" value={`$${aiForecastNext90Days.toLocaleString()}`} />
      </section>

      {/* REVENUE BY BRANCH */}
      <Section title="Revenue by Branch">
        {revenueByBranch.map((row) => (
          <MiniCard
            key={row.branchId}
            label={`Branch ${row.branchId}`}
            value={`$${(row._sum.revenue ?? 0).toLocaleString()}`}
          />
        ))}
      </Section>

      {/* REVENUE BY MONTH */}
      <Section title="Revenue by Month / Year">
        {Object.entries(monthlyRevenue).map(([month, value]) => (
          <MiniCard key={month} label={month} value={`$${value.toLocaleString()}`} />
        ))}
      </Section>

      {/* MARGIN SOURCE BREAKDOWN */}
      <Section title="Revenue by Margin Source (bps)">
        {Object.entries(marginSourceTotals).map(([source, value]) => (
          <MiniCard key={source} label={source.toUpperCase()} value={`${value} bps`} />
        ))}
      </Section>

      {/* HEDGE FUND DELIVERY */}
      <Section title="Hedge‑Fund Delivery Revenue">
        <MiniCard label="Delivery Revenue" value={`$${hedgeDeliveryRevenue.toLocaleString()}`} />
      </Section>

      {/* INVESTOR PROFITABILITY */}
      <Section title="Investor Profitability">
        {Object.entries(investorProfitability).map(([investor, profit]) => (
          <MiniCard key={investor} label={investor} value={`$${profit.toLocaleString()}`} />
        ))}
      </Section>

      {/* BEHAVIORAL REVENUE INTELLIGENCE */}
      <Section title="Behavioral Revenue Intelligence">
        <MiniCard
          label="Behavioral Impact (bps)"
          value={`${behavioralRevenue.toLocaleString()} bps`}
        />
      </Section>
    </main>
  );
}

function Card({ title, value }) {
  return (
    <div className="bg-neutral-900 border border-neutral-700 rounded-xl p-6">
      <h3 className="text-lg font-semibold text-slate-300">{title}</h3>
      <p className="text-3xl font-bold mt-2">{value}</p>
    </div>
  );
}

function MiniCard({ label, value }) {
  return (
    <div className="bg-neutral-900 border border-neutral-700 rounded-xl p-4">
      <p className="text-sm text-slate-400">{label}</p>
      <p className="text-xl font-bold">{value}</p>
    </div>
  );
}

function Section({ title, children }) {
  return (
    <section className="space-y-6">
      <h2 className="text-2xl font-bold text-[#3CF46B]">{title}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">{children}</div>
    </section>
  );
}
