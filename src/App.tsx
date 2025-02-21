import {  Routes, Route, Navigate } from 'react-router-dom';
import { useTheme,ThemeProvider } from './Contexts/ThemeProvider';
import Home from './Pages/Home';
import Navbar from './Components/Navbar';
import Library from './Pages/Library';
import Features from './Pages/Features';
import SignIn from './Pages/SignIn';
import SignUp from './Pages/SignUp';
import Account from './Pages/Account';


function App() {
  return (
    <ThemeProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/library" element={<Library />} />
          <Route path="/features" element={<Features />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp/>} />
          <Route path="/account" element={<Account/>} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
    </ThemeProvider>
  );
}

const PlaceholderPage = ({ title }: { title: string }) => {
  const { darkMode } = useTheme();
  return (
    <div className={`min-h-screen flex flex-col ${darkMode ? 'dark bg-gray-900 text-white' : 'bg-white text-black'}`}>
      <Navbar darkMode={darkMode} toggleDarkMode={() => {}} />
      <div className="pt-32 px-6 flex items-center justify-center flex-grow">
        <div className="text-center">
          <h1 className="text-3xl font-light mb-4">{title} Page</h1>
          <p className={darkMode ? "text-gray-300" : "text-gray-600"}>
            This page is under construction
          </p>
        </div>
      </div>
    </div>
  );
};

export default App;