import { useState, useEffect } from "react";
import { useTheme } from "../Contexts/ThemeProvider";
import Navbar from "../Components/Navbar";
import BookList from "../Components/BookList";

interface Book {
  id: string;
  title: string;
  author: string;
  coverImage?: string;
  tags: string[];
  description: string;
}

const Features = () => {
  const { darkMode, toggleDarkMode } = useTheme();
  const [featuredBooks, setFeaturedBooks] = useState<Book[]>([]);

  useEffect(() => {
    const booksData: Book[] = [
      { id: "1", title: "The Art of Design", author: "John Doe", tags: ["Design"], description: "Exploring modern design principles." },
      { id: "2", title: "Mindful Reading", author: "Jane Smith", tags: ["Self-Help"], description: "Improving reading habits through mindfulness." },
      { id: "3", title: "Code and Creativity", author: "Alex Johnson", tags: ["Technology"], description: "Bridging the gap between code and art." },
    ];
    setFeaturedBooks(booksData);
  }, []);

  return (
    <div className={`min-h-screen flex flex-col ${darkMode ? "dark bg-gray-900 text-white" : "bg-white text-black"}`}>
      <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />

      <main className="pt-24 px-6 pb-12">
        {/* Hero Section */}
        <section className="text-center mb-16">
          <h1 className="text-4xl font-light mb-4">Explore the Features</h1>
          <p className={`text-lg ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
            Discover powerful tools and insights that make your reading experience seamless.
          </p>
        </section>

        {/* Features List */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
          <div className="text-center">
            <div className="h-16 w-16 mx-auto mb-6 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className={`h-10 w-10 ${darkMode ? "text-gray-400" : "text-gray-600"}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
              </svg>
            </div>
            <h3 className="text-lg font-light mb-2">Personalized Library</h3>
            <p className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
              Organize your books the way you like with personalized collections.
            </p>
          </div>

          <div className="text-center">
            <div className="h-16 w-16 mx-auto mb-6 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className={`h-10 w-10 ${darkMode ? "text-gray-400" : "text-gray-600"}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="text-lg font-light mb-2">Multi-Device Sync</h3>
            <p className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
              Sync your reading progress across all devices with ease.
            </p>
          </div>

          <div className="text-center">
            <div className="h-16 w-16 mx-auto mb-6 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className={`h-10 w-10 ${darkMode ? "text-gray-400" : "text-gray-600"}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
              </svg>
            </div>
            <h3 className="text-lg font-light mb-2">Dark Mode Reading</h3>
            <p className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
              Enjoy reading at night with our eye-friendly dark mode.
            </p>
          </div>
        </section>

        {/* Featured Books */}
        <section>
          <h2 className="text-2xl font-light mb-6 text-center">Featured Books</h2>
          <BookList books={featuredBooks} />
        </section>
      </main>
    </div>
  );
};

export default Features;
