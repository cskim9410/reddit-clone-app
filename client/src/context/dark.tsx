import { createContext, ReactNode, useState } from "react";

export const DarkCtx = createContext({
  darkMode: false,
  toggleDarkMode: () => {},
});

const DarkProvider = ({ children }: { children: ReactNode }) => {
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };
  return (
    <DarkCtx.Provider value={{ darkMode, toggleDarkMode }}>
      {children}
    </DarkCtx.Provider>
  );
};

export default DarkProvider;
