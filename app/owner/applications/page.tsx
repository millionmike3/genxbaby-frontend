import { getPrisma } from "@/lib/prisma";
import Link from "next/link";

export default async function ApplicationsListPage() {
  const prisma = getPrisma();

  const applications = await prisma.application.findMany({
    orderBy: { updatedAt: "desc" },
    include: { borrower: true },
  });

  return (
    <div className="p-8 space-y-10 text-white">
      <h1 className="text-3xl font-bold text-[#4EE38A] mb-4">
        Applications Dashboard
      </h1>

      <div className="border border-slate-800 rounded-lg">
        <table className="w-full text-sm text-slate-300">
          <thead>
            <tr className="border-b border-slate-700 bg-slate-800/40">
              <th className="py-3 px-2 text-left">Borrower</th>
              <th className="py-3 px-2 text-left">Property</th>
              <th className="py-3 px-2 text-left">Status</th>
              <th className="py-3 px-2 text-left">Updated</th>
              <th className="py-3 px-2 text-left">Action</th>
            </tr>
          </thead>

          <tbody>
            {applications.map((app) => (
              <tr key={app.id} className="border-b border-slate-800">
                <td className="py-3 px-2">
                  {app.borrower?.firstName} {app.borrower?.lastName}
                </td>

                <td className="py-3 px-2">{app.propertyAddress ?? "—"}</td>

                <td className="py-3 px-2">
                  <span
                    className={
                      app.status === "submitted"
                        ? "text-yellow-300"
                        : app.status === "approved"
                        ? "text-green-400"
                        : app.status === "denied"
                        ? "text-red-400"
                        : app.status === "returned"
                        ? "text-orange-300"
                        : "text-slate-400"
                    }
                  >
                    {app.status}
                  </span>
                </td>

                <td className="py-3 px-2">
                  {new Date(app.updatedAt).toLocaleString()}
                </td>

                <td className="py-3 px-2">
                  <Link
                    href={`/owner/applications/${app.id}`}
                    className="text-[#4EE38A] hover:underline"
                  >
                    Review
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
