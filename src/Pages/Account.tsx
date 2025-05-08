import React, { useState, useEffect, useRef } from "react";
import { useTheme } from "../Contexts/ThemeProvider";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../Contexts/AuthContext";
import { getAccountDetails, uploadProfileImageAPI } from "../services/userApi";
import User from "../Models/User";
import config from "../config";

const Account = () => {
  const { darkMode } = useTheme();
  const { token, logoutUser } = useAuth();
  const navigate = useNavigate();

  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!token) {
      navigate("/signin");
    }
  }, [token, navigate]);

  useEffect(() => {
    const fetchDetails = async () => {
      if (token) {
        setIsLoading(true);
        setUser(null);
        try {
          const userData = await getAccountDetails(token);
          setUser(userData);
        } catch (error) {
          console.error("Failed to fetch account details:", error);
          setUser(null);
        } finally {
          setIsLoading(false);
        }
      } else {
        setIsLoading(false);
        setUser(null);
      }
    };

    fetchDetails();
  }, [token]);

  const handleImageClick = () => {
    if (!uploading) {
      fileInputRef.current?.click();
    }
  };

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file && token) {
      setUploading(true);
      setUploadError(null);
      try {
        const result = await uploadProfileImageAPI(file, token);
        setUser((prevUser) => {
          if (prevUser && result) {
            return {
              ...prevUser,
              profileImage:
                config.apiBaseUrl + `/user/getprofile/${prevUser.username}`,
            };
          }
          return prevUser;
        });
      } catch (error: any) {
        console.error("Upload failed:", error);
        setUploadError(error.message || "Failed to upload image.");
      } finally {
        setUploading(false);
        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }
      }
    }
  };

  const handleLogout = () => {
    logoutUser();
    navigate("/signin");
  };

  const handleResetPassword = () => {
    navigate("/password-reset");
  };

  if (!token) {
    return (
      <div
        className={`min-h-screen pt-20 flex justify-center items-center ${
          darkMode ? "bg-gray-900 text-white" : "bg-white text-black"
        }`}
      >
        Redirecting to sign in...
      </div>
    );
  }

  if (isLoading) {
    return (
      <div
        className={`min-h-screen pt-20 flex justify-center items-center ${
          darkMode ? "bg-gray-900 text-white" : "bg-white text-black"
        }`}
      >
        Loading Account...
      </div>
    );
  }

  if (!user) {
    return (
      <div
        className={`min-h-screen pt-20 flex flex-col items-center ${
          darkMode ? "bg-gray-900 text-white" : "bg-white text-black"
        }`}
      >
        <p className="mb-4">
          Could not load user data or you are not signed in.
        </p>
        <Link to="/signin" className="text-blue-500 hover:underline">
          Sign In
        </Link>
      </div>
    );
  }

  const profileImageUrl = user.profileImage
    ? user.profileImage
    : `https://ui-avatars.com/api/?name=${encodeURIComponent(
        user.name || "?"
      )}&background=random&size=100`;

  return (
    <div
      className={`min-h-screen pt-20 flex flex-col ${
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
          <div className="flex items-center mb-4">
            <div className="relative group">
              <img
                src={profileImageUrl}
                alt="Profile"
                className={`w-20 h-20 rounded-full border object-cover transition-opacity group-hover:opacity-70 ${
                  darkMode ? "border-gray-700" : "border-gray-300"
                } ${
                  uploading ? "cursor-not-allowed opacity-70" : "cursor-pointer"
                }`}
                onClick={handleImageClick}
                onError={(e) => {
                  (
                    e.target as HTMLImageElement
                  ).src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
                    user.name || "?"
                  )}&background=random&size=100`;
                }}
              />
              <button
                onClick={handleImageClick}
                disabled={uploading}
                className={`absolute inset-0 w-full h-full flex items-center justify-center
                           bg-black bg-opacity-50 text-white text-xs rounded-full
                           opacity-0 group-hover:opacity-100 transition-opacity
                           focus:outline-none ${
                             uploading ? "cursor-not-allowed" : "cursor-pointer"
                           }`}
              >
                {uploading ? "Uploading..." : "Upload"}
              </button>
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept="image/png, image/jpeg, image/gif"
                className="hidden"
                disabled={uploading}
              />
            </div>

            <div className="ml-4">
              <h2 className="text-xl font-semibold">{user.name}</h2>
              <p className={darkMode ? "text-gray-400" : "text-gray-600"}>
                {user.email}
              </p>
            </div>
          </div>
          {uploadError && (
            <p className="text-red-500 text-sm mt-2">{uploadError}</p>
          )}
          {uploading && <p className="text-sm mt-2">Processing image...</p>}

          {/* --- Action Buttons --- */}
          <div className="mt-4 pt-4 border-t flex flex-col sm:flex-row sm:justify-end space-y-2 sm:space-y-0 sm:space-x-3">
            <button
              onClick={handleResetPassword}
              className={`px-4 py-2 rounded text-sm font-medium transition-colors
                ${
                  darkMode
                    ? "bg-blue-600 hover:bg-blue-700 text-white"
                    : "bg-blue-500 hover:bg-blue-600 text-white"
                }`}
            >
              Reset Password
            </button>
            <button
              onClick={handleLogout}
              className={`px-4 py-2 rounded text-sm font-medium transition-colors
                ${
                  darkMode
                    ? "bg-red-600 hover:bg-red-700 text-white"
                    : "bg-red-500 hover:bg-red-600 text-white"
                }`}
            >
              Logout
            </button>
          </div>
        </div>

        {/* --- Stats Section --- */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-6">
          <div
            className={`p-4 rounded-lg shadow text-center ${
              darkMode ? "bg-gray-800" : "bg-gray-100"
            }`}
          >
            <h3 className="text-2xl font-semibold">
              {user.likedBooks?.length ?? 0}
            </h3>
            <p className={darkMode ? "text-gray-400" : "text-gray-600"}>
              Liked Books
            </p>
          </div>
          <div
            className={`p-4 rounded-lg shadow text-center ${
              darkMode ? "bg-gray-800" : "bg-gray-100"
            }`}
          >
            <h3 className="text-2xl font-semibold">{user.commentsMade ?? 0}</h3>
            <p className={darkMode ? "text-gray-400" : "text-gray-600"}>
              Comments Made
            </p>
          </div>
        </div>

        {/* --- Liked Books Section --- */}
        <div className="mt-8">
          <h3 className="text-xl font-medium mb-4">Liked Books</h3>
          <div className="flex space-x-4 overflow-x-auto pb-4">
            {!user.likedBooks || user.likedBooks.length === 0 ? (
              <p>No liked books yet.</p>
            ) : (
              user.likedBooks.map((book) => (
                <Link
                  key={book.id}
                  to={`/book/${book.id}`}
                  className="flex-shrink-0 flex flex-col items-center w-24"
                >
                  <img
                    src={`${config.apiBaseUrl}/books/${book.id}/cover`}
                    alt={book.title}
                    className={`w-20 h-28 rounded shadow hover:scale-105 transition-transform object-cover ${
                      darkMode ? "border-gray-700" : "border-gray-300"
                    } border`}
                    onError={(e) => {
                      (e.target as HTMLImageElement).src =
                        "https://via.placeholder.com/80x112?text=No+Cover";
                    }}
                  />
                  <p
                    className="text-sm mt-2 text-center w-full truncate"
                    title={book.title}
                  >
                    {book.title}
                  </p>
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
