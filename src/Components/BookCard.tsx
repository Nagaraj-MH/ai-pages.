import React from "react";
import { useTheme } from "../Contexts/ThemeProvider";

interface Book {
  id: string;
  title: string;
  author: string;
  coverImage?: string;
  tags: string[];
  description: string;
}

const BookCard: React.FC<{ book: Book }> = ({ book }) => {
  const { darkMode } = useTheme();

  return (
    <div
      className={`group transition-all duration-300 ${
        darkMode ? "hover:bg-gray-800" : "hover:bg-gray-50"
      } p-4 rounded-lg`}
    >
      <div
        className={`aspect-[3/4] mb-6 transition-colors flex items-center justify-center ${
          darkMode
            ? "bg-gray-700 group-hover:bg-gray-600"
            : "bg-gray-100 group-hover:bg-gray-200"
        }`}
      >
        <span className={`${darkMode ? "text-gray-500" : "text-gray-300"} text-xl font-light`}>
          {book.coverImage ? <img src={book.coverImage} alt={book.title} className="w-full h-full object-cover" /> : "Cover"}
        </span>
      </div>
      <h3 className="font-light text-xl mb-1">{book.title}</h3>
      <p className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-600"}`}>{book.author}</p>
      <p className={`mt-3 text-sm ${darkMode ? "text-gray-400" : "text-gray-600"}`}>{book.description}</p>
      <div className="mt-4 flex flex-wrap gap-1">
        {book.tags.map((tag) => (
          <span
            key={`${book.id}-${tag}`}
            className={`inline-block px-2 py-1 text-xs uppercase tracking-wider ${
              darkMode ? "bg-gray-700 text-gray-300" : "bg-gray-200 text-gray-700"
            } rounded-sm`}
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
};

export default BookCard;
