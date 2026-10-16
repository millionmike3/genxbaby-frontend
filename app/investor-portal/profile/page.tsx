import { auth } from "@/lib/auth";
import { getPrisma } from "@/lib/db/prisma";

export default async function InvestorProfilePage() {
  // 🔐 Read verified session from auth_token
  const session = await auth();
  if (!session?.user) {
    throw new Error("Not authenticated");
  }

  const prisma = await getPrisma();

  // Fetch investor profile using unified session.user.id
  const investor = await prisma.investorProfile.findFirst({
    where: { investorId: session.user.id },
  });

  return (
    <div className="space-y-10">
      <div>
        <h1 className="text-4xl font-bold mb-4">Profile & Settings</h1>
        <p className="text-slate-300 text-lg">
          Your contact details, banking info, preferences, and risk profile.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Contact Info */}
        <div className="bg-slate-800/60 p-6 rounded-xl border border-slate-700 space-y-2">
          <h2 className="text-xl font-semibold mb-2">Contact Information</h2>
          <p className="text-slate-300">
            <strong>Name:</strong> {investor?.name ?? "—"}
          </p>
          <p className="text-slate-300">
            <strong>Email:</strong> {investor?.email ?? "—"}
          </p>
          <p className="text-slate-300">
            <strong>Phone:</strong> {investor?.phone ?? "—"}
          </p>
          <p className="text-slate-300">
            <strong>Address:</strong> {investor?.address ?? "—"}
          </p>
        </div>

        {/* Banking Info */}
        <div className="bg-slate-800/60 p-6 rounded-xl border border-slate-700 space-y-2">
          <h2 className="text-xl font-semibold mb-2">Banking Information</h2>
          <p className="text-slate-300">
            <strong>Bank Name:</strong> {investor?.bankName ?? "—"}
          </p>
          <p className="text-slate-300">
            <strong>Account Type:</strong> {investor?.accountType ?? "—"}
          </p>
          <p className="text-slate-300">
            <strong>Routing:</strong> {investor?.routingMasked ?? "—"}
          </p>
          <p className="text-slate-300">
            <strong>Account:</strong> {investor?.accountMasked ?? "—"}
          </p>
        </div>

        {/* Preferences */}
        <div className="bg-slate-800/60 p-6 rounded-xl border border-slate-700 space-y-2">
          <h2 className="text-xl font-semibold mb-2">Preferences</h2>
          <p className="text-slate-300">
            <strong>Communication:</strong>{" "}
            {investor?.communicationPreference ?? "—"}
          </p>
          <p className="text-slate-300">
            <strong>Report Frequency:</strong>{" "}
            {investor?.reportFrequency ?? "—"}
          </p>
          <p className="text-slate-300">
            <strong>Notification Channel:</strong>{" "}
            {investor?.notificationChannel ?? "—"}
          </p>
        </div>

        {/* Risk Profile */}
        <div className="bg-slate-800/60 p-6 rounded-xl border border-slate-700 space-y-2">
          <h2 className="text-xl font-semibold mb-2">Risk Profile</h2>
          <p className="text-slate-300">
            <strong>Risk Tolerance:</strong>{" "}
            {investor?.riskTolerance ?? "—"}
          </p>
          <p className="text-slate-300">
            <strong>Investment Horizon:</strong>{" "}
            {investor?.investmentHorizon ?? "—"}
          </p>
          <p className="text-slate-300">
            <strong>Objective:</strong>{" "}
            {investor?.investmentObjective ?? "—"}
          </p>
        </div>
      </div>
    </div>
  );
}
