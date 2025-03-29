import { useState, useEffect } from "react";
import { useTheme } from "../Contexts/ThemeProvider";
import BookList from "../Components/BookList";
import FilterBar from "../Components/FilterBar";

interface Book {
  id: string;
  title: string;
  author: string;
  coverImage?: string;
  tags: string[];
  description: string;
}

const Library = () => {
  const { darkMode } = useTheme();
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [books, setBooks] = useState<Book[]>([]);
  const [allTags, setAllTags] = useState<string[]>([]);

  useEffect(() => {
    const booksData: Book[] = [
      { id: "1", title: "The Quiet Hours", author: "Elizabeth Strout", tags: ["Fiction"], description: "A small town novel." },
      { id: "2", title: "Structural Design", author: "Peter Zumthor", tags: ["Architecture"], description: "Design principles." },
      { id: "3", title: "The Essential Essays", author: "Susan Sontag", tags: ["Essays"], description: "Collection of essays." },
    ];
    setBooks(booksData);
    setAllTags(Array.from(new Set(booksData.flatMap((book) => book.tags))).sort());
  }, []);

  const filteredBooks = books.filter(
    (book) =>
      (searchQuery === "" ||
        book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        book.author.toLowerCase().includes(searchQuery.toLowerCase())) &&
      (selectedTags.length === 0 || selectedTags.some((tag) => book.tags.includes(tag)))
  );

  return (
    <div className={`min-h-screen flex flex-col ${darkMode ? "dark bg-gray-900 text-white" : "bg-white text-black"}`}>
      <main className="pt-24 px-6 pb-12">
        <FilterBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} selectedTags={selectedTags} setSelectedTags={setSelectedTags} allTags={allTags} />
        <BookList books={filteredBooks} />
      </main>
    </div>
  );
};

export default Library;
