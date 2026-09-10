import { prisma } from "@/lib/prisma";

async function getSubmittedApplications() {
  return prisma.application.findMany({
    where: { status: "submitted" },
    orderBy: { createdAt: "desc" },
    take: 50,
    include: {
      borrower: true, // ⭐ REQUIRED so app.borrower.fullName works
    },
  });
}

export default async function AdminDisclosuresPage() {
  const apps = await getSubmittedApplications();

  return (
    <main className="min-h-screen bg-slate-950 text-white p-6">
      <h1 className="text-2xl font-bold mb-4">Disclosure Generator</h1>
      <p className="text-sm text-slate-400 mb-6">
        Generate initial disclosures for submitted applications.
      </p>

      <table className="w-full text-sm text-slate-300">
        <thead>
          <tr className="border-b border-slate-800">
            <th className="py-2 text-left">Application</th>
            <th className="py-2 text-left">Borrower</th>
            <th className="py-2 text-left">Status</th>
            <th className="py-2 text-left">Actions</th>
          </tr>
        </thead>

        <tbody>
          {apps.map((app) => (
            <tr key={app.id} className="border-b border-slate-900">
              <td className="py-2">{app.id}</td>

              {/* FIXED: borrower.fullName */}
              <td className="py-2">{app.borrower.fullName}</td>

              <td className="py-2">{app.status}</td>

              <td className="py-2">
                <form action={`/api/disclosures/generate`} method="post">
                  <input type="hidden" name="applicationId" value={app.id} />
                  <button
                    type="submit"
                    className="px-3 py-1 rounded bg-[#4EE38A] text-black text-xs font-semibold"
                  >
                    Generate Disclosures
                  </button>
                </form>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}
