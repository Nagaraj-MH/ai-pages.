import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

interface NavbarProps {
  darkMode: boolean;
  toggleDarkMode: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ darkMode, toggleDarkMode }) => {
  const [profileImage, setProfileImage] = useState<string | null>(null);

  useEffect(() => {
    const storedImage = localStorage.getItem("profileImage");
    if (storedImage) {
      setProfileImage(storedImage);
    }
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 w-full py-6 px-6 flex justify-between items-center z-50 ${
        darkMode ? "bg-gray-900/80 backdrop-blur-sm" : "bg-white/80 backdrop-blur-sm"
      }`}
    >
      <Link to="/" className="text-xl tracking-tight">ai pages.</Link>
      <div className="flex items-center space-x-8">
        <Link to="/library" className={`text-sm ${darkMode ? "hover:text-gray-300" : "hover:text-gray-600"} transition-colors`}>Library</Link>
        <Link to="/features" className={`text-sm ${darkMode ? "hover:text-gray-300" : "hover:text-gray-600"} transition-colors`}>Features</Link>

        {profileImage ? (
          <Link to="/account">
            <img src={profileImage} alt="Profile" className="w-10 h-10 rounded-full border border-gray-300 object-cover" />
          </Link>
        ) : (
          <Link to="/signin" className={`text-sm ${darkMode ? "hover:text-gray-300" : "hover:text-gray-600"} transition-colors`}>Sign In</Link>
        )}

        <button onClick={toggleDarkMode} className="p-2 rounded-full focus:outline-none">
          {darkMode ? (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
            </svg>
          )}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
