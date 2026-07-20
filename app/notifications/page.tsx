"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/api";

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const res = await api("/notifications");
        setNotifications(res);
      } catch (err) {
        console.error("Failed to load notifications:", err);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, []);

  async function markAsRead(id: string) {
    try {
      await api(`/notifications/read/${id}`, { method: "POST" });

      // Update UI instantly
      setNotifications((prev) =>
        prev.map((n) => (n.id === id ? { ...n, read: true } : n))
      );
    } catch (err) {
      console.error("Failed to mark notification as read:", err);
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-lg">
        Loading notifications...
      </div>
    );
  }

  return (
    <div className="p-8 space-y-10">
      <h1 className="text-3xl font-bold">Notifications</h1>

      {notifications.length === 0 && (
       <p className="text-gray-600">You have no notifications.</p>

      )}

      <div className="space-y-4">
        {notifications.map((n) => (
          <div
            key={n.id}
            className={`p-6 rounded-xl shadow bg-white border ${
              n.read ? "border-gray-200" : "border-blue-300 bg-blue-50"
            }`}
          >
            <div className="flex justify-between items-start">
              <div>
                <p className="font-semibold text-lg">{n.title}</p>
                <p className="text-gray-700 mt-1">{n.message}</p>
                <p className="text-xs text-gray-500 mt-2">
                  {new Date(n.created_at).toLocaleString()}
                </p>
              </div>

              {!n.read && (
                <button
                  onClick={() => markAsRead(n.id)}
                  className="px-3 py-1 bg-black text-white rounded-lg text-sm hover:bg-gray-800"
                >
                  Mark as Read
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
