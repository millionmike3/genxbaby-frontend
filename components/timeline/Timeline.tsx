"use client";

import { motion } from "framer-motion";
import TimelineEventItem from "./TimelineEventItem";
import TimelineList from "./TimelineList";

interface TimelineEvent {
  id?: string | number;
  title: string;
  createdAt?: string | number | Date;
  description?: string;
  [key: string]: any;
}

export default function Timeline({ events = [] }: { events?: TimelineEvent[] }) {
  return (
    <div className="w-full space-y-6">
      {/* Header */}
      <motion.h2
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-xl font-bold text-white tracking-wide"
      >
        Behavioral Timeline
      </motion.h2>

      {/* Animated container */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="
          bg-slate-900 border border-slate-700 rounded-xl p-4 
          shadow-[0_0_25px_rgba(60,244,107,0.15)]
        "
      >
        <TimelineList
          events={Array.isArray(events) ? events : []}
          renderItem={(event: TimelineEvent) => {
            if (!event || typeof event !== "object" || Array.isArray(event)) return null;
            if (!event.title || typeof event.title !== "string") return null;

            const safeDate =
              event.createdAt && !isNaN(new Date(event.createdAt).getTime())
                ? new Date(event.createdAt).toLocaleString()
                : "No timestamp";

            return (
              <motion.div
                key={event.id ?? Math.random()}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4 }}
                className="border-b border-slate-800 pb-3 last:border-none"
              >
                <TimelineEventItem event={{ ...event, createdAt: safeDate }} />
              </motion.div>
            );
          }}
        />

        {/* Glow footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.8 }}
          transition={{ duration: 1.2 }}
          className="h-1 w-full bg-gradient-to-r from-transparent via-[#3CF46B] to-transparent rounded-full mt-4"
        />
      </motion.div>
    </div>
  );
}
