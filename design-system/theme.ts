// design/theme.ts

import { gxColors } from "./tokens/colors";

export const theme = {
  // Raw brand tokens (your existing palette)
  brand: gxColors,

  // Institutional fintech neutrals
  neutral: {
    50:  "#F9FAFB",
    100: "#F3F4F6",
    200: "#E5E7EB",
    300: "#D1D5DB",
    400: "#9CA3AF",
    500: "#6B7280",
    600: "#4B5563",
    700: "#374151",
    800: "#1F2937",
    900: "#111827",
  },

  // Semantic colors (fintech standard)
  semantic: {
    success: "#16A34A",   // approvals, deposits, positive balances
    warning: "#F59E0B",   // pending, risk review
    danger:  "#DC2626",   // failed transactions, fraud alerts
    info:    "#3B82F6",   // informational banners
    neutral: "#6B7280",   // muted text
  },

  // UI colors (fintech surfaces)
  ui: {
    background: gxColors.deepBlack,
    surface: gxColors.surface,
    border: gxColors.border,
    textPrimary: gxColors.graySoft,
    textSecondary: gxColors.grayText,
    textMuted: gxColors.grayMuted,
  },

  // Accent colors (your neon brand identity)
  accent: {
    green: gxColors.neonGreen,
    blue: gxColors.electricBlue,
    lime: gxColors.limeSignal,
    violet: gxColors.royalViolet,
    olive: gxColors.deepOlive,
  },
};
