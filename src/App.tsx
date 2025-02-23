import {  Routes, Route, Navigate ,BrowserRouter} from 'react-router-dom';
import { useTheme,ThemeProvider } from './Contexts/ThemeProvider';
import Home from './Pages/Home';
import Navbar from './Components/Navbar';
import Library from './Pages/Library';
import Features from './Pages/Features';
import Layout from './Components/Layout';
import SignIn from './Pages/SignIn';
import SignUp from './Pages/SignUp';
import Account from './Pages/Account';
import BookDetails from './Pages/BookDetails';

function App() {
  return (
    <ThemeProvider>
       <BrowserRouter>
        <Routes>
          <Route path="*" element={<Navigate to="/" replace />} />
          <Route path="/" element={<Layout><Home /></Layout>} />
          <Route path="/library" element={<Layout><Library /></Layout>} />
          <Route path="/features" element={<Layout><Features /></Layout>} />
          <Route path="/signin" element={<Layout><SignIn /></Layout>} />
          <Route path="/signup" element={<Layout><SignUp/></Layout>} />
          <Route path="/account" element={<Layout><Account/></Layout>} />
          <Route path="/book/:bookId" element={<Layout><BookDetails /></Layout>} />
        </Routes>
       </BrowserRouter>
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