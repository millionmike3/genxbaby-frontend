import prisma from "@/lib/prisma";

export default async function VerifyCheckPage(
  props: { params: { checkNo: string } }
) {
  const { params } = props;

  const checkNo = params.checkNo; // checkNumber is STRING in your schema

  const check = await prisma.check.findUnique({
    where: { checkNumber: checkNo }
  });

  if (!check) {
    return (
      <div className="p-6">
        <h1 className="text-xl font-bold text-red-500">Check not found</h1>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Verify Check</h1>

      <div className="gx-card p-6 rounded-xl space-y-3">
        <p className="text-gray-300 text-sm">
          <strong>Check #:</strong> {check.checkNumber}
        </p>

        <p className="text-gray-300 text-sm">
          <strong>Payee:</strong> {check.payee}
        </p>

        <p className="text-gray-300 text-sm">
          <strong>Amount:</strong> ${check.amount}
        </p>

        <p className="text-gray-300 text-sm">
          <strong>Memo:</strong> {check.memo || "None"}
        </p>

        <p className="text-gray-300 text-sm">
          <strong>Bank Profile:</strong> {check.bankProfileId}
        </p>

        <p className="text-gray-300 text-sm">
          <strong>Status:</strong> {check.status}
        </p>
      </div>
    </div>
  );
}
