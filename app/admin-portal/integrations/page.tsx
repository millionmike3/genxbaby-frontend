"use server";

export default async function AdminIntegrationsPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">Integrations</h1>
      <p className="text-slate-300 mb-6">
        Manage API keys, webhooks, and external system integrations.
      </p>
    </div>
  );
}
