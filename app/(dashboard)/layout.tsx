"use client";

import DashboardSidebar from "@/components/DashboardSidebar";
import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-[#0B0B0F]">
      {/* your entire dashboard code */}
      {children}
    </div>
  );
}
