"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Bell } from "lucide-react";
import { toast } from "react-hot-toast";

export default function TopNav() {
  const [hasNew, setHasNew] = useState(false);
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    const url = `${process.env.NEXT_PUBLIC_UNDERWRITING_API}/api/admin/notifications/stream`;
    const events = new EventSource(url);

    events.onopen = () => {
      setConnected(true);
    };

    events.onerror = () => {
      setConnected(false);
    };

    events.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);

        if (Array.isArray(data)) {
          setHasNew(true);

          data.forEach((n) => {
            toast(n.message);
          });
        }
      } catch {}
    };

    return () => events.close();
  }, []);

  function clearNotifications() {
    setHasNew(false);
  }

  return (
    <nav className="w-full h-16 bg-black flex items-center justify-between px-6 border-b border-gray-800">
      <div className="flex items-center space-x-6">
        <Link href="/admin/dashboard" className="text-white font-semibold">
          GenxBaby Admin
        </Link>

        <span
          className={`text-xs ${
            connected ? "text-green-400" : "text-red-400"
          }`}
        >
          {connected ? "Live" : "Offline"}
        </span>
      </div>

      <div className="flex items-center space-x-6">
        <Link href="/admin/audit" className="text-gray-300 hover:text-white">
          Audit Logs
        </Link>

        <Link href="/admin/users" className="text-gray-300 hover:text-white">
          Users
        </Link>

        {/* Notification Bell */}
        <div className="relative cursor-pointer" onClick={clearNotifications}>
          <Bell className="text-white w-6 h-6" />

          {hasNew && (
            <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
          )}
        </div>
      </div>
    </nav>
  );
}
