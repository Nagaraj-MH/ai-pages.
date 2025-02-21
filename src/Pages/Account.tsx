import { useState } from "react";
import { useTheme } from "../Contexts/ThemeProvider";
import Navbar from "../Components/Navbar";

const Account = () => {
  const { darkMode, toggleDarkMode } = useTheme();
  const [name, setName] = useState("John Doe");
  const [email, setEmail] = useState("johndoe@example.com");
  const [profileImage, setProfileImage] = useState<string | null>(null);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Profile updated:", { name, email, profileImage });
  };

  return (
    <div
      className={`min-h-screen flex flex-col ${
        darkMode ? "dark bg-gray-900 text-white" : "bg-white text-black"
      }`}
    >
      <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />

      <div className="flex flex-1 items-center justify-center px-6">
        <div
          className={`w-full max-w-md p-8 rounded-lg shadow-md ${
            darkMode ? "bg-gray-800" : "bg-gray-100"
          }`}
        >
          <h2 className="text-3xl font-light mb-6 text-center">My Account</h2>

          <div className="flex flex-col items-center mb-6">
            <label htmlFor="profileImage" className="cursor-pointer relative">
              {profileImage ? (
                <img
                  src={profileImage}
                  alt="Profile"
                  className="w-24 h-24 rounded-full border border-gray-300 object-cover"
                />
              ) : (
                <div
                  className="w-24 h-24 flex items-center justify-center rounded-full border border-gray-400 bg-gray-200 text-gray-600"
                >
                  Upload
                </div>
              )}
              <input
                type="file"
                id="profileImage"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
            </label>
            <p className="text-sm mt-2 text-gray-400">Click to upload</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className={`block mb-2 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className={`w-full px-4 py-3 rounded-md border ${
                  darkMode
                    ? "bg-gray-700 text-white border-gray-600"
                    : "bg-white text-gray-800 border-gray-300"
                } focus:outline-none focus:ring-2 ${
                  darkMode ? "focus:ring-gray-500" : "focus:ring-gray-400"
                }`}
              />
            </div>

            <div>
              <label className={`block mb-2 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className={`w-full px-4 py-3 rounded-md border ${
                  darkMode
                    ? "bg-gray-700 text-white border-gray-600"
                    : "bg-white text-gray-800 border-gray-300"
                } focus:outline-none focus:ring-2 ${
                  darkMode ? "focus:ring-gray-500" : "focus:ring-gray-400"
                }`}
              />
            </div>

            <button
              type="submit"
              className={`w-full py-3 rounded-md text-lg font-medium transition-colors ${
                darkMode
                  ? "bg-white text-gray-900 hover:bg-gray-300"
                  : "bg-gray-900 text-white hover:bg-black"
              }`}
            >
              Update Profile
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Account;
