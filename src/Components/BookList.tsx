import React from "react";
import BookCard from "./BookCard";
import Book from "../Models/Book"


const BookList: React.FC<{ books: Book[] }> = ({ books }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
      {books.length > 0 ? (
        books.map((book) => <BookCard key={book.id} book={book} />)
      ) : (
        <p className="text-center text-gray-400">No books found.</p>
      )}
    </div>
  );
};

export default BookList;
