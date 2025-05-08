import React, { useState } from "react";
import { useTheme } from "../Contexts/ThemeProvider";
import { useNavigate } from "react-router-dom";
// import { requestPasswordResetAPI } from '../services/api'; // You'd need an API function for this

const PasswordReset = () => {
  const { darkMode } = useTheme();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setMessage("");
    setIsSubmitting(true);
    try {
      // await requestPasswordResetAPI(email); // Call your API
      setMessage(
        "If an account with that email exists, a password reset link has been sent."
      );
      // setEmail(''); // Optionally clear email
    } catch (err: any) {
      setError(err.message || "Failed to send reset link. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className={`min-h-screen flex items-center justify-center ${
        darkMode ? "bg-gray-900" : "bg-gray-100"
      }`}
    >
      <div
        className={`p-8 rounded-lg shadow-xl w-full max-w-md ${
          darkMode ? "bg-gray-800 text-white" : "bg-white text-black"
        }`}
      >
        <h2 className="text-2xl font-bold text-center mb-6">Reset Password</h2>
        {message && <p className="mb-4 text-green-500">{message}</p>}
        {error && <p className="mb-4 text-red-500">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="email"
              className={`block text-sm font-medium mb-1 ${
                darkMode ? "text-gray-300" : "text-gray-700"
              }`}
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2
                ${
                  darkMode
                    ? "bg-gray-700 border-gray-600 focus:ring-blue-500 text-white"
                    : "border-gray-300 focus:ring-blue-500 text-black"
                }`}
            />
          </div>
          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full py-2 px-4 rounded-md font-semibold transition-colors
              ${isSubmitting ? "opacity-50 cursor-not-allowed" : ""}
              ${
                darkMode
                  ? "bg-blue-600 hover:bg-blue-700 text-white"
                  : "bg-blue-500 hover:bg-blue-600 text-white"
              }`}
          >
            {isSubmitting ? "Sending..." : "Send Reset Link"}
          </button>
        </form>
        <p className="text-center mt-4">
          <button
            onClick={() => navigate(-1)}
            className="text-sm text-blue-500 hover:underline"
          >
            Back
          </button>
        </p>
      </div>
    </div>
  );
};

export default PasswordReset;
