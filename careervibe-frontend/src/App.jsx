import { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AOS from 'aos';
import "aos/dist/aos.css";

import Navbar from './components/Navbar';
import Landing from './components/Landing';
import Jobs from './components/Jobs';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import Contact from './components/Contact';
import About from './components/About';

function App() {
  const [isDark, setIsDark] = useState(false);

  // Initialize AOS
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  // Toggle dark mode on <html> element
  useEffect(() => {
    const html = document.documentElement;
    isDark ? html.classList.add('dark') : html.classList.remove('dark');
  }, [isDark]);

  return (
    <div className={`transition-colors duration-500 min-h-screen pt-20 $isDark ? "bg-[rgb(17,24,39)] text-white" // dark:Slate-900
     : "bg-[rgb(240,248,255)] text-black" // light: AliceBlue
    }`}>
        <Navbar isDark={isDark} setIsDark={setIsDark} />
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/home" element={<Home />} />
          <Route path="/jobs" element={<Jobs />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<About />} />
        </Routes>
    </div>
  );
}

export default App;