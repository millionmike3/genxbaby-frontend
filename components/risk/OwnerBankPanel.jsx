"use client";

export default function OwnerBankPanel({ banks }) {
  return (
    <div className="border rounded-lg p-4 bg-white shadow">
      <h2 className="text-xl font-semibold mb-4">Bank Profiles</h2>

      {banks.length === 0 && (
        <div className="text-gray-500 text-sm">No banks found.</div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {banks.map((bank) => (
          <div
            key={bank.id}
            className="border rounded p-3 bg-gray-50 shadow-sm space-y-2"
          >
            <div className="text-lg font-semibold">{bank.bankName}</div>

            <div className="text-sm text-gray-600">
              Routing: {bank.routingNumber}
            </div>

            <div className="text-sm text-gray-600">
              Account: {bank.accountNumber}
            </div>

            <div className="text-sm text-gray-600">
              Type: {bank.accountType}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
