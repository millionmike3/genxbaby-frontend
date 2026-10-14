import { getPrisma } from "@/lib/db/prisma";
import { cookies } from "next/headers";
import { jwtVerify } from "jose";
import DashboardClient from "./DashboardClient";

export const dynamic = "force-dynamic";

export default async function LoanOfficerDashboard() {
  const cookieStore = cookies();
  const session = cookieStore.get("session")?.value;

  if (!session) {
    return (
      <main className="min-h-screen bg-slate-950 text-white p-6">
        <h1>Unauthorized</h1>
      </main>
    );
  }

  const { payload } = await jwtVerify(
    session,
    new TextEncoder().encode(process.env.JWT_SECRET!)
  );

  const prisma = await getPrisma();

  const officer = await prisma.loanOfficer.findUnique({
    where: { id: payload.officerId },
    include: {
      loans: true,
    },
  });

  if (!officer) {
    return (
      <main className="min-h-screen bg-slate-950 text-white p-6">
        <h1>Officer not found</h1>
      </main>
    );
  }

  return (
    <DashboardClient
      initialOfficer={{
        id: officer.id,
        fullName: officer.fullName,
        email: officer.email,
        loans: officer.loans,
      }}
    />
  );
}
