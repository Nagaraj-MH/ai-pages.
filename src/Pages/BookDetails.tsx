import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useTheme } from "../Contexts/ThemeProvider";

interface Comment {
  userId: string;
  text: string;
}

interface Book {
  id: string;
  title: string;
  author: string;
  likes: number;
  comments: Comment[];
}

const BookDetails = () => {
  const { darkMode } = useTheme();
  const { bookId } = useParams();
  const [book, setBook] = useState<Book | null>(null);
  const [likes, setLikes] = useState(0);
  const [newComment, setNewComment] = useState("");
  const [comments, setComments] = useState<Comment[]>([
    { userId: "User123", text: "Great book!" },
    { userId: "AliceDev", text: "Very informative!" },
    { userId: "CodeMaster", text: "Helped me a lot!" },
  ]);

  useEffect(() => {
    const fetchBookDetails = async () => {
      try {
        const response = await fetch(
          `http://localhost:8080/api/v1/books/${bookId}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch book details");
        }
        const bookData: Book = await response.json();
        setBook(bookData);
        setLikes(bookData.likes);
        setComments(bookData.comments);
      } catch (error) {
        console.error("Error fetching book details:", error);
      }
    };

    fetchBookDetails();
  }, [bookId]);
  const pdfUrl = `http://localhost:8080/api/v1/books/${bookId}/pdf`;

  if (!book) return <div className="text-center p-10">Loading book...</div>;

  const handleLike = async () => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/v1/books/${bookId}/like`,
        {
          method: "POST",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to like book");
      }

      setLikes((prev) => prev + 1);
    } catch (error) {
      console.error("Error liking book:", error);
    }
  };
  const handleAddComment = async () => {
    if (newComment.trim() === "") return;

    try {
      const response = await fetch(
        `http://localhost:8080/api/v1/books/${bookId}/comment`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ content: newComment, userId: 1 }),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to add comment");
      }

      const newCommentObj = await response.json();
      setComments([...comments, newCommentObj.comment]);
      setNewComment("");
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  return (
    <div
      className={`min-h-screen flex flex-col ${
        darkMode ? "dark bg-gray-900 text-white" : "bg-white text-black"
      }`}
    >
      <div className="container mx-auto px-6 py-12 flex flex-col md:flex-row gap-8">
        <aside className="w-full md:w-1/4 flex flex-col items-center">
          <img
            src={`http://localhost:8080/api/v1/books/${bookId}/cover`}
            alt={book.title}
            className="w-48 h-64 rounded shadow-md mb-4"
          />
          <h2 className="text-2xl font-medium">{book.title}</h2>
          <p className="text-gray-500">{book.author}</p>
          <button
            onClick={handleLike}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            👍 Like ({likes})
          </button>
        </aside>

        <main className="flex-grow">
          <div
            className={`p-6 rounded shadow-md ${
              darkMode ? "bg-gray-800" : "bg-gray-100"
            }`}
          >
            <div className="w-full h-96">
              <iframe
                src={`${pdfUrl}#view=FitH`}
                title={`${book.title} PDF`}
                className="w-full h-full border-0"
              />
            </div>
            <p className="mt-4 text-sm text-center">
              If the PDF doesn't load correctly, you can
              <a
                href={pdfUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline ml-1"
              >
                download it here
              </a>
            </p>
          </div>
        </main>
      </div>

      <section className="container mx-auto px-6 py-8">
        <h3 className="text-xl font-medium mb-4">Comments</h3>
        <div
          className={`p-4 rounded ${
            darkMode ? "bg-gray-800 text-white" : "bg-gray-200 text-black"
          }`}
        >
          {comments.length === 0 ? (
            <p>No comments yet. Be the first to comment!</p>
          ) : (
            comments.map((comment, index) => (
              <div
                key={index}
                className={`p-2 border-b ${
                  darkMode ? "border-gray-700" : "border-gray-300"
                }`}
              >
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
            className={`flex-grow px-4 py-2 border rounded-l focus:outline-none ${
              darkMode
                ? "bg-gray-700 text-white border-gray-600"
                : "bg-white text-black border-gray-300"
            }`}
          />
          <button
            onClick={handleAddComment}
            className="px-4 py-2 bg-green-500 text-white rounded-r hover:bg-green-600"
          >
            Comment
          </button>
        </div>
      </section>
    </div>
  );
};

export default BookDetails;
