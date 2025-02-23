import { ReactNode } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { useTheme } from "../Contexts/ThemeProvider";

const Layout = ({ children }: { children: ReactNode }) => {
  const { darkMode,toggleDarkMode } = useTheme();

  return (
    <div className={`min-h-screen flex flex-col ${darkMode ? "dark bg-gray-900 text-white" : "bg-white text-black"}`}>
      <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode}/>
      <main className="flex-grow container mx-auto px-6 py-12">{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
