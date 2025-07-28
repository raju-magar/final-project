import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";

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

  return (
    <>
      <Navbar isDark={isDark} setIsDark={setIsDark} />

      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Landing />} />
        <Route path="/home" element={<Home />} />
        <Route path="/jobs" element={<Jobs />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />

        {/* Protected Dashboard */}
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />

        {/* Protected Post Job Route */}
        <Route
          path="/dashboard/post-job"
          element={
            <PrivateRoute>
              <PostJob />
            </PrivateRoute>
          }
        />

        {/* Catch-all route for 404 */}
        <Route path="*" element={<div className="text-center p-6 text-xl">404 - Not Found</div>} />
      </Routes>
    </>
  );
}
