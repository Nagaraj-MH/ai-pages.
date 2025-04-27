import { useState, useEffect } from "react";
import { useTheme } from "../Contexts/ThemeProvider";
import BookList from "../Components/BookList";

interface Book {
  id: string;
  title: string;
  author: string;
  tags: string[];
  description: string;
}

const Features = () => {
  const { darkMode } = useTheme();
  const [featuredBooks, setFeaturedBooks] = useState<Book[]>([]);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await fetch(
          "http://localhost:8080/api/v1/books/featured"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch books");
        }
        const booksData: Book[] = await response.json();

        setFeaturedBooks(booksData);
      } catch (error) {
        console.error("Error fetching books:", error);
      }
    };

    fetchBooks();
  }, []);

  return (
    <div
      className={`min-h-screen flex flex-col ${
        darkMode ? "dark bg-gray-900 text-white" : "bg-white text-black"
      }`}
    >
      <main className="pt-24 px-6 pb-12">
        <section>
          <h2 className="text-2xl font-light mb-6 text-center">
            Featured Books
          </h2>
          <BookList books={featuredBooks} />
        </section>
      </main>
    </div>
  );
};

export default Features;
