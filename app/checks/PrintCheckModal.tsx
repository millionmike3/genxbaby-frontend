"use client";

import { useEffect, useRef } from "react";
import { CheckHistoryItem } from "./history/types";
import ModernCashiersCheck from "./ModernCashiersCheck";

interface PrintCheckModalProps {
  check: CheckHistoryItem;
  onClose: () => void;
}

export default function PrintCheckModal({
  check,
  onClose,
}: PrintCheckModalProps) {
  const printRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (printRef.current) {
      window.print();
    }
  }, []);

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-6">
      <div className="bg-white rounded shadow-xl p-6 w-full max-w-3xl">
        <button
          onClick={onClose}
          className="mb-4 px-4 py-2 bg-gray-700 text-white rounded"
        >
          Close
        </button>

        <div ref={printRef}>
          <ModernCashiersCheck check={check} bulkChecks={[]} />
        </div>
      </div>
    </div>
  );
}
