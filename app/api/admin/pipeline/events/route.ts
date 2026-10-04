import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

/**
 * Admin Pipeline Event Types
 */
export type AdminPipelineEvent =
  | {
      type: "DOC_PROGRESS_UPDATED";
      applicationId: string;
      docsRequired: number;
      docsSatisfied: number;
      docsPercent: number;
    }
  | {
      type: "UNDERWRITING_UPDATED";
      applicationId: string;
      case: { status: string };
    }
  | {
      type: "MILESTONE_UPDATED";
      applicationId: string;
      milestone: string;
    }
  | {
      type: "INIT";
    };

/**
 * Active SSE listeners
 */
const listeners = new Set<(event: AdminPipelineEvent) => void>();

/**
 * Emit event to all listeners
 */
export function emitAdminPipelineEvent(event: AdminPipelineEvent) {
  for (const listener of listeners) {
    try {
      listener(event);
    } catch (err) {
      console.error("AdminPipeline SSE listener error:", err);
    }
  }
}

/**
 * GET — SSE Stream
 */
export async function GET(_req: NextRequest) {
  const stream = new ReadableStream({
    start(controller) {
      const encoder = new TextEncoder();

      // Listener for this specific connection
      const listener = (event: AdminPipelineEvent) => {
        controller.enqueue(
          encoder.encode(`data: ${JSON.stringify(event)}\n\n`)
        );
      };

      // Register listener
      listeners.add(listener);

      // Send initial handshake event
      controller.enqueue(
        encoder.encode(`data: ${JSON.stringify({ type: "INIT" })}\n\n`)
      );

      // Cleanup
      const close = () => {
        listeners.delete(listener);
        controller.close();
      };

      // @ts-ignore
      controller._close = close;
    },

    cancel() {
      // @ts-ignore
      this._close?.();
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache, no-transform",
      Connection: "keep-alive",
    },
  });
}
