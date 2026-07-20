"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/api";

export default function SettingsPage() {
  const [settings, setSettings] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);

  const [notificationsEnabled, setNotificationsEnabled] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    async function load() {
      try {
        const res = await api("/settings");
        setSettings(res);

        setNotificationsEnabled(res.notificationsEnabled);
        setDarkMode(res.darkMode);
      } catch (err) {
        console.error("Failed to load settings:", err);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, []);

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setSuccess(false);

    try {
      await api("/settings/update", {
        method: "POST",
        body: JSON.stringify({
          notificationsEnabled,
          darkMode,
        }),
      });

      setSuccess(true);
    } catch (err) {
      console.error("Failed to update settings:", err);
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-lg">
        Loading settings...
      </div>
    );
  }

  return (
    <div className="p-8 space-y-10 max-w-xl mx-auto">
      <h1 className="text-3xl font-bold">Settings</h1>

      {success && (
        <div className="p-4 bg-green-100 text-green-700 rounded-lg">
          Settings updated successfully.
        </div>
      )}

      <form onSubmit={handleSave} className="space-y-6 bg-white p-6 rounded-xl shadow">

        {/* Notifications */}
        <div className="flex items-center justify-between">
          <label className="font-medium">Enable Notifications</label>
          <input
            type="checkbox"
            checked={notificationsEnabled}
            onChange={(e) => setNotificationsEnabled(e.target.checked)}
            className="h-5 w-5"
          />
        </div>

        {/* Dark Mode */}
        <div className="flex items-center justify-between">
          <label className="font-medium">Dark Mode</label>
          <input
            type="checkbox"
            checked={darkMode}
            onChange={(e) => setDarkMode(e.target.checked)}
            className="h-5 w-5"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-black text-white py-2 rounded-lg font-semibold hover:bg-gray-800 transition"
          disabled={saving}
        >
          {saving ? "Saving..." : "Save Settings"}
        </button>
      </form>
    </div>
  );
}
