"use client";

export default function TopNav() {
  return (
    <header className="w-full px-6 py-4 bg-gx-deepBlack border-b border-gx-border flex items-center justify-between">
      <h1 className="text-xl font-semibold tracking-gxWide text-gx-graySoft">
        GenXBaby Portal
      </h1>

      <div className="flex items-center gap-4 text-gx-graySoft">
        <span className="hover:text-gx-neonGreen transition cursor-pointer">
          Notifications
        </span>
        <span className="hover:text-gx-electricBlue transition cursor-pointer">
          Profile
        </span>
      </div>
    </header>
  );
}
