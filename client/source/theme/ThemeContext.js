import React, { createContext, useState, useContext, useEffect } from "react";
import { useColorScheme } from "react-native";

const lightTheme = {
  backgroundColor: "#fff",
  text: "#000",
  subText: "grey",
  primary: "#4676c8",
  secondary: "#88abe7",
  accent: "#578dea",
  cardBG: "#f2f3f5",
  cardAccent: "#d7e2f5",
};

const darkTheme = {
  backgroundColor: "#000",
  text: "#fff",
  subText: "grey",
  primary: "#3767b9",
  secondary: "#183b77",
  accent: "#7aa8f9",
  cardBG: "#0d0f12",
  cardAccent: "#0a152e",
};

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const systemColorScheme = useColorScheme(); // Get system color scheme
  const [isDarkMode, setIsDarkMode] = useState(systemColorScheme === "dark");

  useEffect(() => {
    setIsDarkMode(systemColorScheme === "dark");
  }, [systemColorScheme]);

  const toggleTheme = () => {
    setIsDarkMode((prevMode) => !prevMode);
  };

  const theme = isDarkMode ? darkTheme : lightTheme;

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, isDarkMode }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
