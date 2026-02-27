import React, { createContext, useContext, useState } from "react";

export type Theme = "light" | "dark";

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  colors: typeof lightColors;
}

export const lightColors = {
  background: "#F2EFE9",
  surface: "#FFFFFF",
  surfaceAlt: "#EAE6DE",
  text: "#1A1814",
  textSecondary: "#6B6557",
  accent: "#C0873F",
  accentSoft: "#F0DFC0",
  border: "#D4CEC3",
  mapStyle: "standard" as const,
  cardShadow: "rgba(0,0,0,0.12)",
  drawerBg: "#F2EFE9",
  statusBar: "dark-content" as const,
};

export const darkColors = {
  background: "#0F0E0C",
  surface: "#1C1A17",
  surfaceAlt: "#252219",
  text: "#F0EDE6",
  textSecondary: "#9C9484",
  accent: "#D4A05A",
  accentSoft: "#3A2E1A",
  border: "#2E2B24",
  mapStyle: "dark" as const,
  cardShadow: "rgba(0,0,0,0.5)",
  drawerBg: "#1C1A17",
  statusBar: "light-content" as const,
};

const ThemeContext = createContext<ThemeContextType>({
  theme: "dark",
  toggleTheme: () => {},
  colors: darkColors,
});

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>("dark");

  const toggleTheme = () =>
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));

  const colors = theme === "dark" ? darkColors : lightColors;

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, colors }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);