export default function BorrowerIdentityCard({ borrower }) {
  return (
    <div className="bg-graphite p-6 rounded-lg shadow space-y-4">
      <h2 className="text-xl font-semibold text-neon-green">
        Identity & KYC
      </h2>

      <p className="text-gray-300">
        <strong>Name:</strong> {borrower.fullName}
      </p>

      <p className="text-gray-300">
        <strong>SSN Last4:</strong> {borrower.ssnLast4}
      </p>

      <p className="text-gray-300">
        <strong>DOB:</strong> {borrower.dob}
      </p>

      <p className="text-gray-300">
        <strong>Address:</strong> {borrower.address}
      </p>

      <p className="text-gray-300">
        <strong>KYC Verified:</strong>{" "}
        {borrower.kycVerified ? "Yes" : "No"}
      </p>
    </div>
  );
}
