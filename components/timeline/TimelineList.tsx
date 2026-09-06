"use client";

import React from "react";

export default function TimelineList({
  events,
  renderItem,
}: {
  events: any[];
  renderItem: (event: any) => React.ReactNode;
}) {
  return (
    <div className="space-y-4">
      {Array.isArray(events) ? events.map((event) => renderItem(event)) : null}
    </div>
  );
}
