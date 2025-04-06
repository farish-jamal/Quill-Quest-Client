import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./components/pages/HomePage";
import AboutPage from "./components/pages/AboutPage";
import ContactPage from "./components/pages/ContactPage";
import ProfilePage from "./components/pages/ProfilePage";
import BlogPage from "./components/common/BlogPage";
import LoginPage from "./components/pages/LoginPage";
import RegisterPage from "./components/pages/RegisterPage";
import AddNewBlog from "./components/pages/AddNewBlog";
import FullBlog from "./components/common/FullBlog";
import { useEffect, useState } from "react";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
      const accessToken = localStorage.getItem("accessToken");
      if (accessToken) setIsAuthenticated(true);
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        {isAuthenticated ? (
          <>
            <Route path="/user/profile" element={<ProfilePage />} />
            <Route path="/user/blogs" element={<BlogPage />} />
            <Route path="/postblog" element={<AddNewBlog />} />
            <Route path="/user/login" element={<Navigate to="/" replace />} />
            <Route
              path="/user/register"
              element={<Navigate to="/" replace />}
            />
          </>
        ) : (
          <>
            <Route
              path="/user/profile"
              element={<Navigate to="/user/login" replace />}
            />
            <Route
              path="/user/blogs"
              element={<Navigate to="/user/login" replace />}
            />
            <Route
              path="/postblog"
              element={<Navigate to="/user/login" replace />}
            />
            <Route path="/user/login" element={<LoginPage />} />
            <Route path="/user/register" element={<RegisterPage />} />
          </>
        )}
        <Route path="/blog/:id" element={<FullBlog />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
