import { getPrisma } from "@/lib/db/prisma";

export default async function AdminFundingPage() {
  const prisma = await getPrisma();

  const requests = await prisma.fundingRequest.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      investor: true,
    },
  });

  return (
    <div className="space-y-10">
      <h1 className="text-4xl font-bold mb-4">Funding Requests</h1>

      <div className="space-y-4">
        {requests.map((req) => (
          <div
            key={req.id}
            className="bg-slate-800/60 p-6 rounded-xl border border-slate-700 flex flex-col md:flex-row md:justify-between gap-4"
          >
            <div>
              <h3 className="text-xl font-semibold">
                {req.investor?.name ?? "Investor"} — {req.type}
              </h3>
              <p className="text-slate-300 mt-2">
                <strong>Amount:</strong> ${req.amount.toLocaleString()}
              </p>
              <p className="text-slate-300">
                <strong>Status:</strong> {req.status}
              </p>
              <p className="text-slate-500 text-sm mt-1">
                {req.createdAt.toDateString()}
              </p>
            </div>

            {req.status === "PENDING" && (
              <div className="flex items-center gap-3">
                <form action={`/api/admin/funding/approve`} method="POST">
                  <input type="hidden" name="id" value={req.id} />
                  <button className="px-4 py-2 bg-green-600 hover:bg-green-500 text-white rounded-lg">
                    Approve
                  </button>
                </form>

                <form action={`/api/admin/funding/reject`} method="POST">
                  <input type="hidden" name="id" value={req.id} />
                  <button className="px-4 py-2 bg-red-600 hover:bg-red-500 text-white rounded-lg">
                    Reject
                  </button>
                </form>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
