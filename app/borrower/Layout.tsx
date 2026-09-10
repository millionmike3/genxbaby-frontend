import "@/app/globals.css";
import { ReactNode } from "react";
import { auth } from "@/lib/auth";
import BorrowerSidebar from "@/dashboard/layout/borrower/sidebar";

export default async function BorrowerLayout({
  children,
}: {
  children: ReactNode;
}) {
  const session = await auth();

  if (!session?.user || session.user.role !== "borrower") {
    return (
      <html>
        <body className="bg-slate-950 text-white p-6">
          <div>Unauthorized</div>
        </body>
      </html>
    );
  }

  return (
    <html>
      <body className="bg-slate-950 text-white">
        <div className="flex min-h-screen">
          <BorrowerSidebar />
          <main className="flex-1">{children}</main>
        </div>
      </body>
    </html>
  );
}
