import { useState, useEffect } from "react";
import { useTheme } from "../Contexts/ThemeProvider";
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
  const { darkMode } = useTheme();
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

      <main className="pt-24 px-6 pb-12">

        <section>
          <h2 className="text-2xl font-light mb-6 text-center">Featured Books</h2>
          <BookList books={featuredBooks} />
        </section>
      </main>
    </div>
  );
};

export default Features;
