import { Routes, Route, Navigate, BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "./Contexts/ThemeProvider";
import Home from "./Pages/Home";
import Library from "./Pages/Library";
import Features from "./Pages/Features";
import Layout from "./Components/Layout";
import SignIn from "./Pages/SignIn";
import SignUp from "./Pages/SignUp";
import Account from "./Pages/Account";
import BookDetails from "./Pages/BookDetails";
import { AuthProvider } from "./Contexts/AuthContext";
import PasswordReset from "./Components/ResetPassword";

function App() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <BrowserRouter>
          <Routes>
            <Route path="*" element={<Navigate to="/" replace />} />
            <Route
              path="/"
              element={
                <Layout>
                  <Home />
                </Layout>
              }
            />
            <Route
              path="/library"
              element={
                <Layout>
                  <Library />
                </Layout>
              }
            />
            <Route
              path="/features"
              element={
                <Layout>
                  <Features />
                </Layout>
              }
            />
            <Route
              path="/signin"
              element={
                <Layout>
                  <SignIn />
                </Layout>
              }
            />
            <Route
              path="/signup"
              element={
                <Layout>
                  <SignUp />
                </Layout>
              }
            />
            <Route
              path="/account"
              element={
                <Layout>
                  <Account />
                </Layout>
              }
            />
            <Route
              path="/book/:bookId"
              element={
                <Layout>
                  <BookDetails />
                </Layout>
              }
            />
            <Route
              path="/password-reset"
              element={
                <Layout>
                  <PasswordReset></PasswordReset>
                </Layout>
              }
            />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;
