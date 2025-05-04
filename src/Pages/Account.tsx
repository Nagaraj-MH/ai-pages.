import React, { useState, useEffect } from "react";
import { useTheme } from "../Contexts/ThemeProvider";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../Contexts/AuthContext";
import { getAccountDetails } from "../services/api"; // Assuming this function exists

// Define interfaces directly here for simplicity, or import from shared types file
interface Book {
  id: string;
  title: string;
  cover: string;
}

interface User {
  name: string;
  email: string;
  profileImage: string; // Assuming API provides this, adjust if not
  likedBooks: Book[];
  commentsMade: number;
}

const Account = () => {
  const { darkMode } = useTheme();
  const { token } = useAuth(); // Get token from context
  const navigate = useNavigate(); // Get navigate function

  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true); // State for loading

  // Effect 1: Redirect if not logged in
  useEffect(() => {
    if (!token) {
      // No token found on component mount or update, redirect to signin
      navigate("/signin");
    }
  }, [token, navigate]);

  // Effect 2: Fetch user data if logged in
  useEffect(() => {
    // Only attempt fetch if token exists
    if (token) {
      setIsLoading(true); // Set loading before fetch
      getAccountDetails(token)
        .then((userData) => {
          setUser(userData);
        })
        .catch((error) => {
          console.error("Failed to fetch account details:", error);
          // Optional: Clear user data or redirect on specific errors (e.g., 401 Unauthorized)
          // navigate('/signin'); // Example: redirect on fetch error
          setUser(null); // Clear user data on error
        })
        .finally(() => {
          setIsLoading(false); // Set loading to false after fetch attempt (success or fail)
        });
    } else {
      // If token is null (e.g., after logout), ensure loading is false and user is null
      setIsLoading(false);
      setUser(null);
    }
  }, [token]); // Dependency array includes token

  // --- Render Loading State ---
  // Render loading state if loading OR if there's no token (prevents flicker before redirect)
  if (isLoading || !token) {
     return (
       <div className={`min-h-screen pt-20 flex justify-center items-center ${darkMode ? "bg-gray-900 text-white" : "bg-white text-black"}`}>
         Loading Account...
       </div>
     );
  }

  // --- Render No User Data State (after loading, if fetch failed or returned null) ---
  if (!user) {
    return (
       <div className={`min-h-screen pt-20 flex flex-col items-center ${darkMode ? "bg-gray-900 text-white" : "bg-white text-black"}`}>
         <p>Could not load user data.</p>
         <Link to="/" className="mt-4 text-blue-500 hover:underline">Go Home</Link>
         {/* Optionally add a logout button here */}
       </div>
    );
  }

  // --- Render User Dashboard ---
  // Now we know isLoading is false, token exists, and user exists
  return (
    <div
      className={`min-h-screen pt-20 flex flex-col ${ // pt-20 assumes fixed Navbar height
        darkMode ? "dark bg-gray-900 text-white" : "bg-white text-black"
      }`}
    >
      <div className="container mx-auto px-6 py-12">
        <h1 className="text-3xl font-medium mb-6">Dashboard</h1>

        {/* --- Profile Section --- */}
        <div
          className={`p-6 rounded-lg shadow ${
            darkMode ? "bg-gray-800" : "bg-gray-100"
          }`}
        >
          <div className="flex items-center">
            {/* Basic profile image display */}
            <img
              src={user.profileImage || `https://via.placeholder.com/100?text=${user.name?.[0] || '?'}`} // Fallback image
              alt="Profile"
              className="w-20 h-20 rounded-full border object-cover"
            />
            <div className="ml-4">
              <h2 className="text-xl font-semibold">{user.name}</h2>
              <p className={darkMode ? "text-gray-400" : "text-gray-600"}>{user.email}</p>
              {/* Add Logout Button Here */}
              {/* <button onClick={handleLogout}>Logout</button> */}
            </div>
          </div>
        </div>

        {/* --- Stats Section --- */}
        <div className="grid grid-cols-2 gap-6 mt-6">
          <div
            className={`p-4 rounded-lg shadow text-center ${
              darkMode ? "bg-gray-800" : "bg-gray-100"
            }`}
          >
            <h3 className="text-2xl font-semibold">{user.likedBooks?.length ?? 0}</h3>
            <p className={darkMode ? "text-gray-400" : "text-gray-600"}>Liked Books</p>
          </div>
          <div
            className={`p-4 rounded-lg shadow text-center ${
              darkMode ? "bg-gray-800" : "bg-gray-100"
            }`}
          >
            <h3 className="text-2xl font-semibold">{user.commentsMade ?? 0}</h3>
            <p className={darkMode ? "text-gray-400" : "text-gray-600"}>Comments Made</p>
          </div>
        </div>

        {/* --- Liked Books Section --- */}
        <div className="mt-8">
          <h3 className="text-xl font-medium mb-4">Liked Books</h3>
          <div className="flex space-x-4 overflow-x-auto pb-4"> {/* Added pb-4 */}
            {!user.likedBooks || user.likedBooks.length === 0 ? (
              <p>No liked books yet.</p>
            ) : (
              user.likedBooks.map((book) => (
                <Link
                  key={book.id}
                  to={`/book/${book.id}`} // Assuming a route like this exists
                  className="flex-shrink-0 flex flex-col items-center w-24" // Fixed width, prevent shrinking
                >
                  <img
                    src={book.cover || 'https://via.placeholder.com/80x112?text=No+Cover'} // Fallback cover
                    alt={book.title}
                    className={`w-20 h-28 rounded shadow hover:scale-105 transition-transform object-cover ${darkMode ? 'border-gray-700' : 'border-gray-300'} border`}
                  />
                  <p className="text-sm mt-2 text-center w-full truncate" title={book.title}>{book.title}</p>
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