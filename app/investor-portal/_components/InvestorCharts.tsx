"use client";

import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  LineChart,
  Line,
  XAxis,
  YAxis,
  BarChart,
  Bar,
} from "recharts";

/* ---------------------------------------------
   Shared Colors
--------------------------------------------- */
const COLORS = ["#4EE38A", "#38bdf8", "#f472b6", "#facc15", "#a78bfa"];

/* ---------------------------------------------
   Performance Chart (IRR + Volatility)
--------------------------------------------- */
type PerformancePoint = {
  label: string;
  irr: number;
  volatility: number;
};

export function InvestorPerformanceChart({ data }: { data: PerformancePoint[] }) {
  return (
    <div className="bg-slate-800/60 rounded-xl p-6 border border-slate-700">
      <h2 className="text-xl font-semibold mb-4">Performance Over Time</h2>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <XAxis dataKey="label" stroke="#94a3b8" />
            <YAxis stroke="#94a3b8" />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="irr"
              stroke="#4EE38A"
              strokeWidth={2}
              name="IRR"
            />
            <Line
              type="monotone"
              dataKey="volatility"
              stroke="#38bdf8"
              strokeWidth={2}
              name="Volatility"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

/* ---------------------------------------------
   Cashflow Chart (Monthly Distributions)
--------------------------------------------- */
type CashflowPoint = {
  label: string;
  amount: number;
};

export function InvestorCashflowChart({ data }: { data: CashflowPoint[] }) {
  return (
    <div className="bg-slate-800/60 rounded-xl p-6 border border-slate-700">
      <h2 className="text-xl font-semibold mb-4">Cashflow by Period</h2>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <XAxis dataKey="label" stroke="#94a3b8" />
            <YAxis stroke="#94a3b8" />
            <Tooltip />
            <Bar
              dataKey="amount"
              fill="#4EE38A"
              name="Cashflow"
              radius={[6, 6, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

/* ---------------------------------------------
   Equity Growth Chart (Total Equity Over Time)
--------------------------------------------- */
export function InvestorEquityGrowthChart({ data }: { data: any[] }) {
  return (
    <div className="bg-slate-800/60 rounded-xl p-6 border border-slate-700">
      <h2 className="text-xl font-semibold mb-4">Equity Growth Over Time</h2>
      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <XAxis dataKey="label" stroke="#94a3b8" />
            <YAxis stroke="#94a3b8" />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="equity"
              stroke="#4EE38A"
              strokeWidth={2}
              name="Equity"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

/* ---------------------------------------------
   Allocation Pie Chart (Portfolio Mix)
--------------------------------------------- */
export function InvestorAllocationPieChart({ data }: { data: any[] }) {
  return (
    <div className="bg-slate-800/60 rounded-xl p-6 border border-slate-700">
      <h2 className="text-xl font-semibold mb-4">Allocation Mix</h2>
      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="label"
              cx="50%"
              cy="50%"
              outerRadius={100}
              label
            >
              {data.map((_, i) => (
                <Cell key={i} fill={COLORS[i % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
