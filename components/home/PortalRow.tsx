// components/home/PortalRow.tsx
import { Button } from "@/components/ui/Button";

export function PortalRow() {
  return (
    <div className="flex flex-col sm:flex-row justify-center gap-4">

      {/* ADMIN LOGIN — Fluorescent Cyan */}
      <Button
        href="/admin/login"
        className="
          bg-[#00eaff] text-black font-semibold rounded-xl
          hover:bg-[#00eaff]/80 hover:shadow-[0_0_15px_#00eaff]
          transition-all
        "
      >
        Admin Login
      </Button>

      {/* INVESTOR PORTAL */}
      <Button href="/investors" variant="secondary">
        Investor Portal
      </Button>

      {/* BORROWER DASHBOARD */}
      <Button href="/borrowers" variant="outline">
        Borrower Dashboard
      </Button>
    </div>
  );
}
