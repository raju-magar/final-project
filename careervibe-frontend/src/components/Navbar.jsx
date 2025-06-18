import { useState, } from "react";
import { Link } from 'react-router-dom';

export default function Navbar({ isDark, setIsDark}) {
  const [isOpen, setIsOpen]= useState(false);

  
  return (
    <nav className="bg-white/20 backdrop-blur-md dark:bg-gray-800/30 text-white fixed top-0 w-full z-50 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="text-2xl font-bold tracking-wide animate__animated animate__fadeInLeft">
            career<span className="text-yellow-300">Vibe</span>
          </div>
          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-6 text-lg animate__animated animate__fadeInDown">
            <Link to="/home" className="relative group">Home<span className="absolute left-0 -button-1 w-0 h-0.5 bg-yellow-300 transition-all group-hover:w-full"></span></Link>
            <Link to="/about" className="hover:text-yellow-300 transition-all">About</Link>
            <Link to="/jobs" className="hover:text-yellow-300 transition-all">Jobs</Link>
            <Link to="/contact" className="hover:text-yellow-300 transition-all">Contact</Link>
            <Link to="/login" className="hover:text-yellow-300 transition-all">Login</Link>
            <Link to="/register" className="hover:text-yellow-300 transition-all">Register</Link>
          </div>

          {/* dark Mode Toggle Button */}
          <button onClick={() => setIsDark(!isDark)} className={`ml-4 px-4 py-1 border border-white rounded-full shadow-md transition-all duration-300
            ${isDark ? "bg-yellow-300 text-black" : "bg-transparent hover:bg-white hover:text-black"}
            `}>{isDark ?"🌞" : "🌙"}
          </button>

            {/* Mobile Toggle */}
          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="text-white focus:outline-none">
              {isOpen ? '✖' : '☰'}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-blue-700 text-white space-y-2 p-4 animate__animated animate__fadeInDown">
          <Link to="/" className="block">Home</Link>
          <Link to="/about" className="block">About</Link>
          <Link to="/jobs" className="block">Jobs</Link>
          <Link to="/contact" className="block">Contact</Link>
          <Link to="/login" className="block">Login</Link>
          <Link to="/register" className="block">Register</Link>
        </div>
      )}
    </nav>
  );
}
