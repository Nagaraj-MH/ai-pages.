import { useState, useEffect } from "react";
import { useTheme } from "../Contexts/ThemeProvider";
import { Link } from "react-router-dom";

interface Book {
  id: string;
  title: string;
  cover: string;
}

interface User {
  name: string;
  email: string;
  profileImage: string;
  likedBooks: Book[];
  commentsMade: number;
}

const Account = () => {
  const { darkMode } = useTheme();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const mockUser: User = {
      name: "John Doe",
      email: "johndoe@example.com",
      profileImage: "https://via.placeholder.com/100",
      likedBooks: [
        { id: "1", title: "The Art of Coding", cover: "https://via.placeholder.com/80" },
        { id: "2", title: "Advanced JavaScript", cover: "https://via.placeholder.com/80" },
        { id: "3", title: "React Mastery", cover: "https://via.placeholder.com/80" },
      ],
      commentsMade: 12,
    };
    setUser(mockUser);
  }, []);

  if (!user) return <div className="text-center p-10">Loading dashboard...</div>;

  return (
    <div className={`min-h-screen flex flex-col ${darkMode ? "dark bg-gray-900 text-white" : "bg-white text-black"}`}>
      
      <div className="container mx-auto px-6 py-12">
        <h1 className="text-3xl font-medium mb-6">Dashboard</h1>

        <div className={`p-6 rounded-lg shadow ${darkMode ? "bg-gray-800" : "bg-gray-100"}`}>
          <div className="flex items-center">
            <img src={user.profileImage} alt="Profile" className="w-20 h-20 rounded-full border" />
            <div className="ml-4">
              <h2 className="text-xl font-semibold">{user.name}</h2>
              <p className="text-gray-400">{user.email}</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6 mt-6">
          <div className={`p-4 rounded-lg shadow text-center ${darkMode ? "bg-gray-800" : "bg-gray-100"}`}>
            <h3 className="text-2xl font-semibold">{user.likedBooks.length}</h3>
            <p className="text-gray-400">Liked Books</p>
          </div>
          <div className={`p-4 rounded-lg shadow text-center ${darkMode ? "bg-gray-800" : "bg-gray-100"}`}>
            <h3 className="text-2xl font-semibold">{user.commentsMade}</h3>
            <p className="text-gray-400">Comments Made</p>
          </div>
        </div>

        <div className="mt-8">
          <h3 className="text-xl font-medium mb-4">Liked Books</h3>
          <div className="flex space-x-4 overflow-x-auto">
            {user.likedBooks.length === 0 ? (
              <p>No liked books yet.</p>
            ) : (
              user.likedBooks.map((book) => (
                <Link key={book.id} to={`/book/${book.id}`} className="flex flex-col items-center">
                  <img src={book.cover} alt={book.title} className="w-20 h-28 rounded shadow hover:scale-105 transition-transform" />
                  <p className="text-sm mt-2 text-center">{book.title}</p>
                </Link>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Account;
