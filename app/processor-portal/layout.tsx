import Link from "next/link";
import { processorAuth } from "@/lib/auth/processor-auth";

function Unauthorized({ role }: { role?: string }) {
  return (
    <section className="bg-slate-950 text-white p-6 min-h-screen flex items-center justify-center">
      <div className="text-xl font-semibold">
        Unauthorized: This portal is for Processors. You are logged in as{" "}
        {role || "Unknown"}.
      </div>
    </section>
  );
}

export default async function ProcessorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  let session;

  try {
    // 🔐 Validate processor cookie + role
    session = await processorAuth();
  } catch {
    // ❌ If processorAuth redirected or failed, show Unauthorized
    return <Unauthorized role="Invalid or missing processor token" />;
  }

  // 🔐 Double‑check role (extra safety)
  if (session.role !== "PROCESSOR") {
    return <Unauthorized role={session.role} />;
  }

  return (
    <div className="min-h-screen bg-slate-900 text-white flex">
      <aside className="w-64 bg-slate-800/60 border-r border-slate-700 p-6 space-y-6">
        <h2 className="text-xl font-bold">Processor #{session.userId}</h2>

        <nav className="space-y-3">
          <Link href="/processor-portal">Document Checklist</Link>
          <Link href="/processor-portal/verification">Verification Queue</Link>
          <Link href="/processor-portal/files">Application Files</Link>
          <Link href="/processor-portal/ocr">OCR Extractions</Link>
          <Link href="/processor-portal/requirements">Requirements Tracker</Link>
        </nav>

        <form action="/api/logout" method="post">
          <button
            type="submit"
            className="mt-6 w-full px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg font-semibold"
          >
            Logout
          </button>
        </form>
      </aside>

      <main className="flex-1 p-10">{children}</main>
    </div>
  );
}
