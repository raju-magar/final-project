import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import careerVibeLogo from '../assets/careervibe-logo.png';

export default function Navbar({ isDark, setIsDark }) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setIsOpen(false); // Close mobile menu on route change
  }, [location]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return(
    <nav className={`backdrop-blur-lg fixed top-0 w-full z-50 shadow-md transition-colors duration-300 ${isDark ? "bg-[rgba(31,41,55,0.8)] text-white" : "bg-[rgba(255,255,255,0.7)] text-black"}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
        {/* Logo and Text */}
        <Link to="/" className="flex items-center space-x-2">
        <img src={careerVibeLogo} alt="CareerVibe Logo" className="h-10 w-10 object-contain" />
        <span className="text-2xl font-bold tracking-wide">career<span className="text-yellow-300">Vibe</span></span>
        </Link> 

          {/* Desktop Links */}
          <div className="hidden md:flex space-x-6 text-lg">
            {["home", "jobs", "about", "contact", "login", "register"].map((page) => {
              return (
              <Link key={page} to={`/${page}`} className="px-4 py-3 rounded-md hover:bg-yellow-300 hover:text-black transition-colors duration-200 hover:scale-110">
                {page.charAt(0).toUpperCase() + page.slice(1)}
              </Link>
              );
            })}
          </div>         

          {/* Theme Toggle */}
          <button onClick={() => setIsDark(!isDark)} className={`ml-4 px-4 py-1 border border-white rounded-full shadow-md transition-transform duration-300 ${isDark ? "bg-yellow-300 text-black hover:scale-110" : "bg-transparent hover:bg-white hover:text-black hover:scale-110"}`} aria-label="Toggle Dark Mode">
            {isDark ? "🌞": "🌙"}
          </button>

          {/* Mobile Toggle */}
          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className={`text-2xl focus:outline-none transition-colors duration-300 ${isDark ? "text-yellow-300" : "text-black"}`} aria-label="Toggle menu">
              {isOpen ? "✖" : "☰"}
            </button>
          </div>
        </div>
      </div>
      {/* Mobile Menu */}
      {isOpen && (
        <div className={`md:hidden bg-blue-700 text-white p-4 space-y-2 transition-transform duration-300 ease-in-out transform origin-top ${isOpen ? "scale-y-100 opacity-100" : "scale-y-0 opacity-0 pointer-events-none"}`}>
          {["home", "jobs", "about", "contact", "login", "register"].map((page) => (
            <Link key={page} to={`/${page}`} className="block px-4 py-2 rounded-md hover:bg-yellow-300 hover:text-black transition-colors duration-200">
              {page.charAt(0).toUpperCase() + page.slice(1)}
            </Link>
          ))}
        </div>
      )}

    </nav>
  );
}