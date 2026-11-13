/** -------------------------------------------------------------------
 * ============================================================
 * Contexto para gestionar el tema de la app (claro/oscuro).
 * ============================================================
 */

import React, { createContext, useState, useEffect, useContext } from "react";

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(
    () => localStorage.getItem("theme") || "light"
  );

  useEffect(() => {
    const body = window.document.body;
    // Solo una clase de tema activa a la vez
    body.classList.remove("light-theme", "dark-theme");
    body.classList.add(`${theme}-theme`);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// Para usar el tema en cualquier componente
// eslint-disable-next-line react-refresh/only-export-components
export const useTheme = () => useContext(ThemeContext);
