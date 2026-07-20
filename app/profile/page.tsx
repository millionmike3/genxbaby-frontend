"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/api";

export default function ProfilePage() {
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  useEffect(() => {
    async function load() {
      try {
        const res = await api("/profile");
        setProfile(res);

        // Pre-fill form
        setName(res.name);
        setEmail(res.email);
        setPhone(res.phone);
      } catch (err) {
        console.error("Failed to load profile:", err);
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
      await api("/profile/update", {
        method: "POST",
        body: JSON.stringify({ name, email, phone }),
      });

      setSuccess(true);
    } catch (err) {
      console.error("Failed to update profile:", err);
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-lg">
        Loading profile...
      </div>
    );
  }

  return (
    <div className="p-8 space-y-10 max-w-xl mx-auto">
      <h1 className="text-3xl font-bold">Your Profile</h1>

      {success && (
        <div className="p-4 bg-green-100 text-green-700 rounded-lg">
          Profile updated successfully.
        </div>
      )}

      <form onSubmit={handleSave} className="space-y-6 bg-white p-6 rounded-xl shadow">

        {/* Name */}
        <div>
          <label className="block font-medium mb-1">Name</label>
          <input
            type="text"
            className="border rounded-lg p-2 w-full"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        {/* Email */}
        <div>
          <label className="block font-medium mb-1">Email</label>
          <input
            type="email"
            className="border rounded-lg p-2 w-full"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        {/* Phone */}
        <div>
          <label className="block font-medium mb-1">Phone</label>
          <input
            type="text"
            className="border rounded-lg p-2 w-full"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>

        <button
          type="submit"
          className="w-full bg-black text-white py-2 rounded-lg font-semibold hover:bg-gray-800 transition"
          disabled={saving}
        >
          {saving ? "Saving..." : "Save Changes"}
        </button>
      </form>
    </div>
  );
}
