"use server";

export default async function AdminAuditPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">Audit Log</h1>
      <p className="text-slate-300 mb-6">
        View system-wide audit logs, blockchain proofs, and Merkle verification.
      </p>
    </div>
  );
}
