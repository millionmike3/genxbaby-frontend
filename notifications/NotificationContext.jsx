"use client"

import React, { createContext, useState, useEffect } from "react";
import { NotificationAPI } from "../api/endpoints";

export const NotificationContext = createContext(null);

export default function NotificationProvider({ children }) {
  const [notifications, setNotifications] = useState([]);

  const load = async () => {
    const data = await NotificationAPI.list();
    setNotifications(data);
  };

  const markRead = async (id) => {
    await NotificationAPI.markRead(id);
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  useEffect(() => {
    load();
  }, []);

  return (
    <NotificationContext.Provider value={{ notifications, markRead }}>
      {children}
    </NotificationContext.Provider>
  );
}
