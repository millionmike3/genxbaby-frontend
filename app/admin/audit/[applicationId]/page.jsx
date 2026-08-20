import AuditLogsDashboard from "@/components/admin/audit/AuditLogsDashboard";

export default async function Page({ params }) {
  const { applicationId } = params;

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_UNDERWRITING_API}/audit/logs/${applicationId}`,
    { cache: "no-store" }
  );

  const auditData = await res.json();

  return (
    <div className="p-8">
      <AuditLogsDashboard data={auditData} />
    </div>
  );
}
