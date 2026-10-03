"use server";

export default async function BorrowerMessagesPage() {
  return (
    <div className="space-y-10 text-white">
      <h1 className="text-4xl font-bold mb-4">Messages</h1>
      <p className="text-slate-300 text-lg">
        View communications related to your loan application and mortgage.
      </p>

      <div className="bg-slate-800/40 p-6 rounded-xl border border-slate-700">
        <p className="text-slate-300">
          Messaging system coming soon.
        </p>
      </div>
    </div>
  );
}
