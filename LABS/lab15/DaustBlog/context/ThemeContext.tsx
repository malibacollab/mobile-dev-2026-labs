import React, { createContext, useContext, useState } from "react";

type Theme = "light" | "dark";

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  colors: {
    background: string;
    card: string;
    text: string;
    subtext: string;
    border: string;
    header: string;
    headerText: string;
    accent: string;
  };
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const lightColors = {
  background: "#FFFFFF",
  card: "#F5F5F5",
  text: "#1A1A1A",
  subtext: "#666666",
  border: "#E0E0E0",
  header: "#FFFFFF",
  headerText: "#1A1A1A",
  accent: "#2563EB",
};

const darkColors = {
  background: "#000000",
  card: "#1A1A1A",
  text: "#FFFFFF",
  subtext: "#AAAAAA",
  border: "#333333",
  header: "#000000",
  headerText: "#FFFFFF",
  accent: "#60A5FA",
};

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>("light");

  const toggleTheme = () => setTheme((t) => (t === "light" ? "dark" : "light"));

  const colors = theme === "light" ? lightColors : darkColors;

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, colors }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within ThemeProvider");
  return ctx;
}
