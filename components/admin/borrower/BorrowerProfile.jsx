import BorrowerIdentityCard from "./BorrowerIdentityCard";
import BorrowerApplications from "./BorrowerApplications";

export default function BorrowerProfile({ data }) {
  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-neon-green">
        Borrower Profile
      </h1>

      <BorrowerIdentityCard borrower={data.borrower} />

      <BorrowerApplications applications={data.applications} />
    </div>
  );
}
