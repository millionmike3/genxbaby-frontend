"use client";

import CasePanel from "../cases/CasePanel";

interface OwnerDrawerProps {
  ownerId: string;
  apiUrl: string;
  onClose: () => void;
}

export default function OwnerDrawer({ ownerId, apiUrl, onClose }: OwnerDrawerProps) {
  return (
    <div className="fixed right-0 top-0 w-[600px] h-full bg-[#1A1A22] border-l border-gray-700 p-6 overflow-y-auto">
      <button className="gx-btn-secondary mb-4" onClick={onClose}>
        Close
      </button>

      <h2 className="text-xl font-bold mb-4">Owner Details</h2>

      {/* CasePanel expects ownerId + apiUrl */}
      <CasePanel ownerId={ownerId} apiUrl={apiUrl} />
    </div>
  );
}
