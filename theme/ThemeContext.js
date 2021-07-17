import React, { useEffect } from "react";

const defaultState = {
  theme: "light",
  toggleDark: () => {},
};

export const ThemeContext = React.createContext(defaultState);

export const ThemeProvider = ({ initialTheme, children }) => {
  const [theme, setTheme] = React.useState("light");

  useEffect(() => {
    if (typeof window !== "undefined" && window.localStorage) {
      const storedPrefs = window.localStorage.getItem("color-theme");
      if (typeof storedPrefs === "string" && storedPrefs === "dark" ) {
        setTheme("dark");
      }
      const userMedia = window.matchMedia("(prefers-color-scheme: dark)");
      if (userMedia.matches) {
        setTheme("dark");
      }
    }
  }, [])

  const rawSetTheme = (rawTheme) => {
    const root = window.document.documentElement;
    const isDark = rawTheme === "dark";
    root.classList.remove(isDark ? "light" : "dark");
    root.classList.add(rawTheme);
    localStorage.setItem("color-theme", rawTheme);
  };

  if (initialTheme) {
    rawSetTheme(initialTheme);
  }

  React.useEffect(() => {
    rawSetTheme(theme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
