import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useTheme } from "../Contexts/ThemeProvider";

interface Comment {
  id: number;
  userId: string;
  text: string;
}

interface Book {
  id: string;
  title: string;
  author: string;
  coverImage: string;
  content: string[];
  likes: number;
  comments: Comment[];
}

const mockBook: Book = {
  id: "1",
  title: "The Art of Coding",
  author: "John Developer",
  coverImage: "https://via.placeholder.com/150",
  content: [
    "Page 1: Welcome to the world of coding...",
    "Page 2: Variables and Data Types...",
    "Page 3: Functions and Scope...",
    "Page 4: Object-Oriented Programming...",
  ],
  likes: 10,
  comments: [
    { id: 1, userId: "User123", text: "Great book!" },
    { id: 2, userId: "AliceDev", text: "Very informative!" },
    { id: 3, userId: "CodeMaster", text: "Helped me a lot!" },
  ],
};

const BookDetails = () => {
  const { darkMode } = useTheme();
  const { bookId } = useParams(); 
  const [book, setBook] = useState<Book | null>(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [likes, setLikes] = useState(mockBook.likes);
  const [newComment, setNewComment] = useState("");
  const [comments, setComments] = useState<Comment[]>(mockBook.comments);

  useEffect(() => {
    setBook(mockBook);
  }, [bookId]);

  if (!book) return <div className="text-center p-10">Loading book...</div>;

  const handleLike = () => {
    setLikes((prev) => prev + 1);
  };

  const handleAddComment = () => {
    if (newComment.trim() !== "") {
      const newCommentObj: Comment = {
        id: comments.length + 1,
        userId: "GuestUser", 
        text: newComment,
      };
      setComments([...comments, newCommentObj]);
      setNewComment("");
    }
  };

  return (
    <div className={`min-h-screen flex flex-col ${darkMode ? "dark bg-gray-900 text-white" : "bg-white text-black"}`}>
      <div className="container mx-auto px-6 py-12 flex flex-col md:flex-row gap-8">
        <aside className="w-full md:w-1/4 flex flex-col items-center">
          <img src={book.coverImage} alt={book.title} className="w-48 h-64 rounded shadow-md mb-4" />
          <h2 className="text-2xl font-medium">{book.title}</h2>
          <p className="text-gray-500">{book.author}</p>
          <button onClick={handleLike} className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
            👍 Like ({likes})
          </button>
        </aside>

        <main className="flex-grow">
          <div className={`p-6 rounded shadow-md ${darkMode ? "bg-gray-800 text-white" : "bg-gray-100 text-black"}`}>
            <p className="text-lg">{book.content[currentPage]}</p>
          </div>

          <div className="mt-4 flex justify-between">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(0, prev - 1))}
              disabled={currentPage === 0}
              className={`px-4 py-2 rounded ${currentPage === 0  ? darkMode ? "bg-gray-800 text-white" : "bg-gray-100 text-black" : "bg-blue-500 text-white hover:bg-blue-600"}`}
            >
              ← Previous
            </button>
            <span className="px-4 py-2 text-lg">
              Page {currentPage + 1} / {book.content.length}
            </span>
            <button
              onClick={() => setCurrentPage((prev) => Math.min(book.content.length - 1, prev + 1))}
              disabled={currentPage === book.content.length - 1}
              className={`px-4 py-2 rounded ${currentPage === book.content.length - 1 ? darkMode ? "bg-gray-800 text-white" : "bg-gray-100 text-black" : "bg-blue-500 text-white hover:bg-blue-600"}`}
            >
              Next →
            </button>
          </div>
        </main>
      </div>

      <section className="container mx-auto px-6 py-8">
        <h3 className="text-xl font-medium mb-4">Comments</h3>
        <div className={`p-4 rounded ${darkMode ? "bg-gray-800 text-white" : "bg-gray-200 text-black"}`}>
          {comments.length === 0 ? (
            <p>No comments yet. Be the first to comment!</p>
          ) : (
            comments.map((comment) => (
              <div key={comment.id} className={`p-2 border-b ${darkMode ? "border-gray-700" : "border-gray-300"}`}>
                <span className="font-bold">{comment.userId}: </span>
                {comment.text}
              </div>
            ))
          )}
        </div>
        <div className="mt-4 flex">
          <input
            type="text"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Write a comment..."
            className={`flex-grow px-4 py-2 border rounded-l focus:outline-none ${darkMode ? "bg-gray-700 text-white border-gray-600" : "bg-white text-black border-gray-300"}`}
          />
          <button onClick={handleAddComment} className="px-4 py-2 bg-green-500 text-white rounded-r hover:bg-green-600">
            Comment
          </button>
        </div>
      </section>
    </div>
  );
};

export default BookDetails;
