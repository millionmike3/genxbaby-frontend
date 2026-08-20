// design/tokens/motion.ts
export const gxMotion = {
  heroContainer: {
    hidden: { opacity: 0, y: 80 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 90, damping: 18 },
    },
  },
  heroTitleFast: {
    hidden: { opacity: 0, x: -120, skewX: -12 },
    visible: {
      opacity: 1,
      x: 0,
      skewX: 0,
      transition: { type: "spring", stiffness: 140, damping: 16 },
    },
  },
  heroXPulse: {
    initial: { scale: 1, rotate: 0 },
    animate: {
      scale: [1, 1.2, 1],
      rotate: [0, 6, -6, 0],
      transition: { repeat: Infinity, duration: 3.2, ease: "easeInOut" },
    },
  },
  cardRise: {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  },
};
