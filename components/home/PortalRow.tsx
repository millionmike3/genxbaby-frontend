// components/home/PortalRow.tsx
import { Button } from "@/components/ui/Button";

export function PortalRow() {
  return (
    <div className="flex flex-col sm:flex-row justify-center gap-4">
      <Button href="/admin/login" variant="primary">
        Admin Login
      </Button>

      <Button href="/investors" variant="secondary">
        Investor Portal
      </Button>

      <Button href="/borrowers" variant="outline">
        Borrower Dashboard
      </Button>
    </div>
  );
}
