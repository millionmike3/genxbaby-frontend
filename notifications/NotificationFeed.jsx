"use client"

import React, { useContext } from "react";
import { NotificationContext } from "./NotificationContext";
import colors from "../design/tokens/colors";
import spacing from "../design/tokens/spacing";

export default function NotificationFeed({ open, onClose }) {
  const { notifications, markRead } = useContext(NotificationContext);

  if (!open) return null;

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        right: 0,
        width: "360px",
        height: "100vh",
        backgroundColor: colors.graphite,
        borderLeft: `1px solid ${colors.slate}`,
        padding: spacing.lg,
        overflowY: "auto",
        zIndex: 999,
      }}
    >
      <h2 style={{ color: colors.neonGreen }}>Notifications</h2>

      <button
        style={{
          marginBottom: spacing.md,
          backgroundColor: colors.slate,
          color: colors.black,
          borderRadius: "8px",
          padding: spacing.sm,
          border: "none",
          cursor: "pointer",
        }}
        onClick={onClose}
      >
        Close
      </button>

      {notifications.length === 0 && (
        <p style={{ color: colors.metallicSilver }}>No notifications</p>
      )}

      {notifications.map((n) => (
        <div
          key={n.id}
          style={{
            backgroundColor: n.read ? colors.black : colors.blueTint,
            padding: spacing.md,
            borderRadius: "8px",
            marginBottom: spacing.md,
            cursor: "pointer",
          }}
          onClick={() => markRead(n.id)}
        >
          <strong style={{ color: colors.neonGreen }}>{n.title}</strong>
          <p style={{ color: colors.metallicSilver }}>{n.message}</p>
          <small style={{ opacity: 0.6 }}>{n.created_at}</small>
        </div>
      ))}
    </div>
  );
}
