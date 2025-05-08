import { useEffect, useState } from "react";
import { useTheme } from "../Contexts/ThemeProvider";
import { Link, useNavigate } from "react-router-dom";
import { checkUsernameAvailability, signup } from "../services/authApi";
import { useAuth } from "../Contexts/AuthContext";

const SignUp = () => {
  const { darkMode } = useTheme();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { token } = useAuth();
  const Navigate = useNavigate();
  const [usernameStatus, setUsernameStatus] = useState("");
  const [usernameFeedback, setUsernameFeedback] = useState("");

  useEffect(() => {
    if (token) {
      Navigate("/");
    }
  }, [token]);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    if (usernameStatus === "unavailable") {
      alert("Username is not available. Please choose another one.");
      return;
    }

    try {
      const response = await signup(email, password, name, username);
      alert(response.message || "Signup successful!");
      console.log("Signing up with:", { name, email, username, password });

      setName("");
      setEmail("");
      setUsername("");
      setPassword("");
      setConfirmPassword("");
      setUsernameStatus("");
      setUsernameFeedback("");
    } catch (error: any) {
      console.error("Signup failed:", error);

      alert(
        error?.response?.data?.error ||
          error?.message ||
          "Signup failed. Please try again."
      );
    }
  };

  useEffect(() => {
    setUsernameStatus("");
    setUsernameFeedback("");

    if (!username.trim()) {
      return;
    }

    setUsernameStatus("checking");

    const timerId = setTimeout(async () => {
      try {
        const response = await checkUsernameAvailability(username);

        if (response.available) {
          setUsernameStatus("available");
          setUsernameFeedback("Username is available!");
        } else {
          setUsernameStatus("unavailable");
          setUsernameFeedback("Username is not available.");
        }
      } catch (error) {
        console.error("Error checking username:", error);
        setUsernameStatus("error");
        setUsernameFeedback("Could not check username availability.");
      }
    }, 2000);

    return () => {
      clearTimeout(timerId);
    };
  }, [username]);

  return (
    <div
      className={`min-h-screen flex flex-col ${
        darkMode ? "dark bg-gray-900 text-white" : "bg-white text-black"
      }`}
    >
      <div className="flex flex-1 items-center justify-center px-6 py-8">
        {" "}
        {/* Added padding top/bottom */}
        <div
          className={`w-full max-w-md p-8 rounded-lg shadow-md ${
            darkMode ? "bg-gray-800" : "bg-gray-100"
          }`}
        >
          <h2 className="text-3xl font-light mb-6 text-center">Sign Up</h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="username"
                className={`block mb-1 ${
                  darkMode ? "text-gray-300" : "text-gray-700"
                }`}
              >
                Username
              </label>
              <input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className={`w-full px-4 py-3 rounded-md border ${
                  darkMode
                    ? "bg-gray-700 text-white border-gray-600"
                    : "bg-white text-gray-800 border-gray-300"
                } focus:outline-none focus:ring-2 ${
                  darkMode ? "focus:ring-gray-500" : "focus:ring-gray-400"
                } ${
                  usernameStatus === "available"
                    ? "border-green-500"
                    : usernameStatus === "unavailable"
                    ? "border-red-500"
                    : usernameStatus === "error"
                    ? "border-red-500"
                    : darkMode
                    ? "border-gray-600"
                    : "border-gray-300"
                }`}
                aria-describedby="username-feedback"
              />
              {/* Display feedback message */}
              <div id="username-feedback" className="mt-1 text-xs h-4">
                {" "}
                {/* Reserve space */}
                {usernameStatus === "checking" && (
                  <p className="text-gray-500">Checking...</p>
                )}
                {usernameStatus === "available" && (
                  <p className="text-green-500">{usernameFeedback}</p>
                )}
                {usernameStatus === "unavailable" && (
                  <p className="text-red-500">{usernameFeedback}</p>
                )}
                {usernameStatus === "error" && (
                  <p className="text-red-500">{usernameFeedback}</p>
                )}
              </div>
            </div>

            {/* Rest of the form fields (Name, Email, Password, Confirm Password) */}
            {/* --- Name Input --- */}
            <div>
              <label
                htmlFor="name"
                className={`block mb-1 ${
                  darkMode ? "text-gray-300" : "text-gray-700"
                }`}
              >
                Name
              </label>
              <input
                id="name"
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

            {/* --- Email Input --- */}
            <div>
              <label
                htmlFor="email"
                className={`block mb-1 ${
                  darkMode ? "text-gray-300" : "text-gray-700"
                }`}
              >
                Email
              </label>
              <input
                id="email"
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

            {/* --- Password Input --- */}
            <div>
              <label
                htmlFor="password"
                className={`block mb-1 ${
                  darkMode ? "text-gray-300" : "text-gray-700"
                }`}
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
                className={`w-full px-4 py-3 rounded-md border ${
                  darkMode
                    ? "bg-gray-700 text-white border-gray-600"
                    : "bg-white text-gray-800 border-gray-300"
                } focus:outline-none focus:ring-2 ${
                  darkMode ? "focus:ring-gray-500" : "focus:ring-gray-400"
                }`}
              />
            </div>

            {/* --- Confirm Password Input --- */}
            <div>
              <label
                htmlFor="confirmPassword"
                className={`block mb-1 ${
                  darkMode ? "text-gray-300" : "text-gray-700"
                }`}
              >
                Confirm Password
              </label>
              <input
                id="confirmPassword"
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
              disabled={
                usernameStatus === "checking" ||
                usernameStatus === "unavailable"
              }
              className={`w-full py-3 rounded-md text-lg font-medium transition-colors ${
                darkMode
                  ? "bg-white text-gray-900 hover:bg-gray-300 disabled:bg-gray-400"
                  : "bg-gray-900 text-white hover:bg-black disabled:bg-gray-500"
              } disabled:cursor-not-allowed`}
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
