import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { AuthProvider, useAuth } from "../context/AuthContext";

const MotionLink = motion.create(Link);

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="bg-white shadow-md fixed w-full z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        <MotionLink
          to="/"
          className="text-xl font-bold text-blue-600"
          whileHover={{ scale: 1.1 }}
        >
          CareerVibe
        </MotionLink>

        <div className="hidden md:flex items-center space-x-6">
          <MotionLink
            to="/"
            className="text-gray-700 hover:text-blue-600"
            whileHover={{ scale: 1.05 }}
          >
            Home
          </MotionLink>
          <MotionLink
            to="/jobs"
            className="text-gray-700 hover:text-blue-600"
            whileHover={{ scale: 1.05 }}
          >
            Jobs
          </MotionLink>

          {!user ? (
            <>
              <MotionLink
                to="/login"
                className="text-gray-700 hover:text-blue-600"
                whileHover={{ scale: 1.05 }}
              >
                Login
              </MotionLink>
              <MotionLink
                to="/register"
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
                whileHover={{ scale: 1.05 }}
              >
                Register
              </MotionLink>
            </>
          ) : (
            <>
              <MotionLink
                to="/dashboard"
                className="text-gray-700 hover:text-blue-600"
                whileHover={{ scale: 1.05 }}
              >
                Dashboard
              </MotionLink>
              <button
                onClick={handleLogout}
                className="text-red-500 hover:underline"
              >
                Logout
              </button>
            </>
          )}
        </div>

        {/* Mobile menu toggle button */}
        <div className="md:hidden">
          <button onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden px-4 pb-4 space-y-2 bg-white shadow">
          <MotionLink to="/" className="block" whileHover={{ scale: 1.05 }}>
            Home
          </MotionLink>
          <MotionLink to="/jobs" className="block" whileHover={{ scale: 1.05 }}>
            Jobs
          </MotionLink>
          {!user ? (
            <>
              <MotionLink to="/login" className="block" whileHover={{ scale: 1.05 }}>
                Login
              </MotionLink>
              <MotionLink
                to="/register"
                className="block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
                whileHover={{ scale: 1.05 }}
              >
                Register
              </MotionLink>
            </>
          ) : (
            <>
              <MotionLink to="/dashboard" className="block" whileHover={{ scale: 1.05 }}>
                Dashboard
              </MotionLink>
              <button
                onClick={handleLogout}
                className="block text-red-500 hover:underline"
              >
                Logout
              </button>
            </>
          )}
        </div>
      )}
    </nav>
  );
}
