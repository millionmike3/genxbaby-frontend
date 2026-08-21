"use client"

import React, { useContext } from "react";
import { NotificationContext } from "./NotificationContext";
import colors from "../design/tokens/colors";

export default function NotificationBell({ onClick }) {
  const { notifications } = useContext(NotificationContext);

  const unread = notifications.filter((n) => !n.read).length;

  return (
    <div
      style={{
        position: "relative",
        cursor: "pointer",
        marginRight: "20px",
      }}
      onClick={onClick}
    >
      <span style={{ fontSize: "24px" }}>🔔</span>

      {unread > 0 && (
        <div
          style={{
            position: "absolute",
            top: "-4px",
            right: "-4px",
            backgroundColor: colors.neonGreen,
            color: colors.black,
            borderRadius: "50%",
            width: "18px",
            height: "18px",
            fontSize: "12px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {unread}
        </div>
      )}
    </div>
  );
}
