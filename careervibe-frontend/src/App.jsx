import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import DashboardLayout from "./components/DashboardLayout.jsx";

import Landing from './components/Landing.jsx';
import Navbar from "./components/Navbar.jsx";
import Home from "./components/Home.jsx";
import Jobs from "./components/Jobs.jsx";
import Register from "./components/Register.jsx";
import Login from "./components/Login.jsx";
import About from "./components/About.jsx";
import Contact from "./components/Contact.jsx";
import Dashboard from "./components/Dashboard.jsx";
import PrivateRoute from "./components/PrivateRoute.jsx";
import PostJob from "./components/PostJob.jsx";

export default function App() {
  const [isDark, setIsDark] = useState(false);

  // TODO: Get user info from context or state to pass below if needed
  const user = null; // Replace with actual user object

  return (
    <>
      <Navbar isDark={isDark} setIsDark={setIsDark} />

      {/* Add pt-16 here to push content below fixed navbar */}
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

          {/* Protected Dashboard Routes */}
          <Route
            path="/dashboard/*"
            element={
              <PrivateRoute>
                  <Routes>
                    <Route index element={<Dashboard />} />
                    <Route path="post-job" element={<PostJob />} />
                  </Routes>
              </PrivateRoute>
            }
          />

          {/* Catch-all route for 404 */}
          <Route path="*" element={<div className="text-center p-6 text-xl">404 - Not Found</div>} />
        </Routes>
      </div>
    </>
  );
}