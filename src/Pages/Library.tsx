import { useState, useEffect } from "react";
import { useTheme } from "../Contexts/ThemeProvider";
import BookList from "../Components/BookList";
import FilterBar from "../Components/FilterBar";
import Book from "../Models/Book"

const Library = () => {
  const { darkMode } = useTheme();
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [books, setBooks] = useState<Book[]>([]);
  const [allTags, setAllTags] = useState<string[]>([]);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/v1/books");
        if (!response.ok) {
          throw new Error("Failed to fetch books");
        }
        const booksData: Book[] = await response.json();

        setBooks(booksData);
        setAllTags(
          Array.from(new Set(booksData.flatMap((book) => book.tags))).sort()
        );
      } catch (error) {
        console.error("Error fetching books:", error);
      }
    };

    fetchBooks();
  }, []);

  const filteredBooks = books.filter(
    (book) =>
      (searchQuery === "" ||
        book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        book.author.toLowerCase().includes(searchQuery.toLowerCase())) &&
      (selectedTags.length === 0 ||
        selectedTags.some((tag) => book.tags.includes(tag)))
  );

  return (
    <div
      className={`min-h-screen flex flex-col ${
        darkMode ? "dark bg-gray-900 text-white" : "bg-white text-black"
      }`}
    >
      <main className="pt-24 px-6 pb-12">
        <FilterBar
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          selectedTags={selectedTags}
          setSelectedTags={setSelectedTags}
          allTags={allTags}
        />
        <BookList books={filteredBooks} />
      </main>
    </div>
  );
};

export default Library;
