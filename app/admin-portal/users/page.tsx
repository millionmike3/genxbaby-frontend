"use server";

export default async function AdminUsersPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">Users</h1>
      <p className="text-slate-300 mb-6">
        Manage borrower, investor, owner, and admin accounts.
      </p>
    </div>
  );
}
