"use server";

import { requireRole } from "@/lib/auth";
import { getPrisma } from "@/lib/db/prisma";
import { cookies } from "next/headers";
import { getSession } from "@/lib/session";

import OwnerDashboardWidgets from "./_components/OwnerDashboardWidgets";
import OwnerCharts from "./_components/charts/OwnerCharts";

export default async function OwnerPortalHome() {
  // Enforce owner role
  await requireRole(["owner"]);

  // Read JWT from cookie (must await cookies() in Next.js 16)
  const cookieStore = await cookies();
  const token = cookieStore.get("session")?.value;

  // Validate session
  const session = await getSession(token);
  if (!session) throw new Error("Not authenticated");

  const prisma = await getPrisma();

  // Fetch user
  const user = await prisma.user.findUnique({
    where: { id: Number(session.userId) },
  });

  if (!user) throw new Error("User not found");

  // Fetch owner record
  const owner = await prisma.owner.findFirst({
    where: { userId: user.id },
    include: {
      properties: {
        include: {
          ownerEquity: true,
          rentRoll: true,
          financials: true,
        },
      },
      mortgageAssets: {
        include: {
          payments: true,
        },
      },
    },
  });

  return (
    <div className="space-y-10 text-white px-6 md:px-12 lg:px-20 py-16 bg-slate-900">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold mb-4">Owner Portal</h1>
        <p className="text-slate-300 text-lg">
          Welcome, {owner?.name ?? user.email}. Use the navigation to access your
          properties, mortgage assets, performance analytics, cashflow, and
          equity intelligence.
        </p>
      </div>

      {/* Dashboard Widgets */}
      <OwnerDashboardWidgets />

      {/* Charts */}
      <div className="mt-10">
        <OwnerCharts />
      </div>
    </div>
  );
}
