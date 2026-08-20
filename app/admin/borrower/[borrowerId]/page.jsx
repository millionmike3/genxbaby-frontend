import BorrowerProfile from "@/components/admin/borrower/BorrowerProfile";

export default async function Page({ params }) {
  const { borrowerId } = params;

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_UNDERWRITING_API}/admin/borrower/${borrowerId}`,
    { cache: "no-store" }
  );

  const borrowerData = await res.json();

  return (
    <div className="p-8">
      <BorrowerProfile data={borrowerData} />
    </div>
  );
}
