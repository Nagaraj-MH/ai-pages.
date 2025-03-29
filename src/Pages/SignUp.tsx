import { useState } from "react";
import { useTheme } from "../Contexts/ThemeProvider";
import { Link } from "react-router-dom";

const SignUp = () => {
  const { darkMode } = useTheme();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    console.log("Signing up with:", { name, email, password });
  };

  return (
    <div
      className={`min-h-screen flex flex-col ${
        darkMode ? "dark bg-gray-900 text-white" : "bg-white text-black"
      }`}
    >

      <div className="flex flex-1 items-center justify-center px-6">
        <div
          className={`w-full max-w-md p-8 rounded-lg shadow-md ${
            darkMode ? "bg-gray-800" : "bg-gray-100"
          }`}
        >
          <h2 className="text-3xl font-light mb-6 text-center">Sign Up</h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                className={`block mb-2 ${
                  darkMode ? "text-gray-300" : "text-gray-700"
                }`}
              >
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
              <label
                className={`block mb-2 ${
                  darkMode ? "text-gray-300" : "text-gray-700"
                }`}
              >
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

            <div>
              <label
                className={`block mb-2 ${
                  darkMode ? "text-gray-300" : "text-gray-700"
                }`}
              >
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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
              <label
                className={`block mb-2 ${
                  darkMode ? "text-gray-300" : "text-gray-700"
                }`}
              >
                Confirm Password
              </label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
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
              Sign Up
            </button>
          </form>

          <p className="text-center mt-4 text-sm">
            Already have an account?{" "}
            <Link
              to="/signin"
              className={`font-medium ${
                darkMode
                  ? "text-gray-300 hover:text-white"
                  : "text-gray-700 hover:text-black"
              } transition-colors`}
            >
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
