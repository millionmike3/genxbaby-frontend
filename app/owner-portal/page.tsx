import { requireRole } from "@/lib/auth";
import { getPrisma } from "@/lib/db/prisma";
import { cookies } from "next/headers";
import { getSession } from "@/lib/session";

import OwnerDashboardWidgets from "./_components/OwnerDashboardWidgets";
import OwnerCharts from "./_components/charts/OwnerCharts";

export default async function OwnerPortalHome() {
  // Enforce owner role
  await requireRole(["OWNER"]);

  // Read JWT from cookie
  const cookieStore = await cookies();
  const token = cookieStore.get("auth_token")?.value;
  if (!token) throw new Error("Not authenticated");

  // Decode session
  const session = await getSession(token);
  if (!session) throw new Error("Not authenticated");

  const prisma = await getPrisma();

  // ⭐ FIXED: User.id must come from session.userId
  const user = await prisma.user.findUnique({
    where: { id: session.userId },
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
      <div>
        <h1 className="text-4xl font-bold mb-4">Owner Portal</h1>
        <p className="text-slate-300 text-lg">
          Welcome, {owner?.name ?? user.email}. Use the navigation to access your
          properties, mortgage assets, performance analytics, cashflow, and equity intelligence.
        </p>
      </div>

      <OwnerDashboardWidgets />

      <div className="mt-10">
        <OwnerCharts />
      </div>
    </div>
  );
}
