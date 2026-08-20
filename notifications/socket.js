import { NotificationAPI } from "../api/endpoints";

export function initNotificationSocket(onMessage) {
  const ws = new WebSocket("wss://api.genxbaby.com/ws/notifications");

  ws.onmessage = (event) => {
    const data = JSON.parse(event.data);
    onMessage(data);
  };

  return ws;
}
