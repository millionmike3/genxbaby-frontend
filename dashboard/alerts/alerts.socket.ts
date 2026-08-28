export function initAlertsSocket(
  url: string,
  onMessage: (alert: any) => void
) {
  const socket = new WebSocket(url);

  socket.onmessage = (event) => {
    try {
      const data = JSON.parse(event.data);
      onMessage(data);
    } catch {
      console.error("Invalid alert payload:", event.data);
    }
  };

  socket.onerror = (err) => {
    console.error("Alert socket error:", err);
  };

  return socket;
}
