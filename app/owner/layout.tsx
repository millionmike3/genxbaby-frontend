import Link from "next/link";

export default function OwnerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-slate-900 text-slate-100">
      {/* Owner Portal Navigation */}
      <aside className="w-full border-b border-slate-700 bg-slate-800/40">
        <nav className="flex items-center gap-8 px-6 py-4 text-sm">
          <Link
            href="/owner/applications"
            className="hover:text-[#4EE38A] transition-colors"
          >
            Applications
          </Link>

          <Link
            href="/owner/underwriting"
            className="hover:text-[#4EE38A] transition-colors"
          >
            Underwriting Dashboard
          </Link>
        </nav>
      </aside>

      {/* Owner Portal Content */}
      <main className="p-6">{children}</main>
    </div>
  );
}
