import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, useContext, useEffect, useState } from "react";
import { Appearance } from "react-native";

type Theme = "light" | "dark";

type ThemeContextType = {
  theme: Theme;
  colors: {
    background: string;
    text: string;
    card: string;
  };
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const systemTheme = Appearance.getColorScheme() || "light";
  const [theme, setTheme] = useState<Theme>(systemTheme);

  useEffect(() => {
    AsyncStorage.getItem("appTheme").then((value) => {
      if (value === "light" || value === "dark") setTheme(value);
    });
  }, []);

  const toggleTheme = async () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    await AsyncStorage.setItem("appTheme", newTheme);
  };

  const colors =
    theme === "light"
      ? { background: "#fff", text: "#000", card: "#e5e5e5" }
      : { background: "#121212", text: "#fff", card: "#1f1f1f" };

  return (
    <ThemeContext.Provider value={{ theme, colors, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context)
    throw new Error("useTheme deve ser usado dentro de um ThemeProvider");
  return context;
};
