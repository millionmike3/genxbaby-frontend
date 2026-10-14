// app/api/ws/route.ts
import { NextRequest } from "next/server";

const clients = new Set<WebSocket>();

export const runtime = "edge";


export default function handler(req: NextRequest) {
  const upgradeHeader = req.headers.get("upgrade") || "";
  if (upgradeHeader.toLowerCase() !== "websocket") {
    return new Response("Expected WebSocket", { status: 400 });
  }

  const [client, server] = Object.values(new WebSocketPair()) as [WebSocket, WebSocket];

  server.accept();
  clients.add(server);

  server.addEventListener("message", (event) => {
    // Broadcast to all clients (basic pub/sub)
    for (const ws of clients) {
      if (ws !== server) {
        ws.send(event.data);
      }
    }
  });

  server.addEventListener("close", () => {
    clients.delete(server);
  });

  return new Response(null, {
    status: 101,
    webSocket: client,
  } as any);
}
