import { useState, } from "react";
import { Link } from 'react-router-dom';

export default function Navbar({ isDark, setIsDark}) {
  const [isOpen, setIsOpen]= useState(false);

  
  return (
    <nav className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500 shadow-lg text-white fixed top-0 w-full z-50 transition-all duration-500 ease-in-out">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="text-2xl font-bold tracking-wide animate__animated animate__fadeInLeft">
            career<span className="text-yellow-300">Vibe</span>
          </div>
          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-6 text-lg animate__animated animate__fadeInDown">
            <Link to="/" className="hover:text-yellow-300 transition-all">Home</Link>
            <Link to="/about" className="hover:text-yellow-300 transition-all">About</Link>
            <Link to="/jobs" className="hover:text-yellow-300 transition-all">Jobs</Link>
            <Link to="/contact" className="hover:text-yellow-300 transition-all">Contact</Link>
          </div>

          {/* dark Mode Toggle Button */}
          <button onClick={() => setIsDark(!isDark)} className="ml-4 px-4 py-1 border-white rounded hover:bg-white hover:text-black transition">
            {isDark ? '🌞' : '🌙'}
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
          <a href="#home" className="block">Home</a>
          <a href="#about" className="block">About</a>
          <a href="#jobs" className="block">Jobs</a>
          <a href="#contact" className="block">Contact</a>
        </div>
      )}
    </nav>
  );
}
