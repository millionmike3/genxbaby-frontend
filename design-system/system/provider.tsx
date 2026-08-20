// design/system/provider.tsx
"use client";

import { ReactNode, createContext, useContext } from "react";
import { gxTheme } from "./theme";

type ThemeContextValue = typeof gxTheme;

const ThemeContext = createContext<ThemeContextValue>(gxTheme);

export function GenXBabyThemeProvider({ children }: { children: ReactNode }) {
  return (
    <ThemeContext.Provider value={gxTheme}>{children}</ThemeContext.Provider>
  );
}

export function useGenXBabyTheme() {
  return useContext(ThemeContext);
}
