import { NextResponse } from "next/server";

const clients = new Map<string, Set<ReadableStreamDefaultController>>();

function broadcast(applicationId: string, event: any) {
  const controllers = clients.get(applicationId);
  if (!controllers) return;

  const payload = `data: ${JSON.stringify(event)}\n\n`;

  for (const controller of controllers) {
    controller.enqueue(new TextEncoder().encode(payload));
  }
}

export async function GET(
  req: Request,
  { params }: { params: { applicationId: string } }
) {
  const { applicationId } = params;

  const stream = new ReadableStream({
    start(controller) {
      let set = clients.get(applicationId);
      if (!set) {
        set = new Set();
        clients.set(applicationId, set);
      }
      set.add(controller);

      // initial ping
      controller.enqueue(
        new TextEncoder().encode(`data: "connected"\n\n`)
      );
    },
    cancel() {
      const set = clients.get(applicationId);
      if (!set) return;
      for (const controller of set) {
        set.delete(controller);
      }
    },
  });

  return new NextResponse(stream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
    },
  });
}

// helper you can import elsewhere
export function emitUnderwritingEvent(applicationId: string, event: any) {
  broadcast(applicationId, event);
}
