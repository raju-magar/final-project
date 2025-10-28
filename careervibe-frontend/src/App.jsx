import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";

import Landing from './components/Landing.jsx';
import Navbar from "./components/Navbar.jsx";
import Home from "./components/Home.jsx";
import Jobs from "./components/Jobs.jsx";
import Register from "./components/Register.jsx";
import Login from "./components/Login.jsx";
import Logout from "./components/Logout.jsx";
import About from "./components/About.jsx";
import Contact from "./components/Contact.jsx";
import Dashboard from "./components/Dashboard.jsx";
import PrivateRoute from "./components/PrivateRoute.jsx";
import PostJob from "./components/PostJob.jsx";
import { AuthProvider, useAuth } from "./context/AuthContext.jsx";

// ✅ Wrap the main app content in AuthProvider
function AppContent() {
  const [isDark, setIsDark] = useState(false);
  const { user, loading } = useAuth();
  const isAuthenticated = !!user;

  if (loading) return <div className="text-center p-6 text-lg">Loading...</div>;

  return (
    <>
      <Navbar isDark={isDark} setIsDark={setIsDark} isAuthenticated={isAuthenticated} />

      <div className="pt-16">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Landing />} />
          <Route path="/home" element={<Home />} />
          <Route path="/jobs" element={<Jobs />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />

          {/* Protected Routes */}
          <Route
            path="/dashboard"
            element={
              <PrivateRoute isAuthenticated={isAuthenticated}>
                <Dashboard />
              </PrivateRoute>
            }
          />
          <Route
            path="/dashboard/post-job"
            element={
              <PrivateRoute isAuthenticated={isAuthenticated}>
                <PostJob />
              </PrivateRoute>
            }
          />
          <Route
            path="/dashboard/logout"
            element={
              <PrivateRoute isAuthenticated={isAuthenticated}>
                <Logout />
              </PrivateRoute>
            }
          />

          {/* 404 fallback */}
          <Route path="*" element={<div className="text-center p-6 text-xl">404 - Not Found</div>} />
        </Routes>
      </div>
    </>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}
