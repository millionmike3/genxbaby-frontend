"use server";

export default async function AdminSystemConfigPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">System Configuration</h1>
      <p className="text-slate-300 mb-6">
        Configure system-wide settings, environment flags, and operational modes.
      </p>
    </div>
  );
}
