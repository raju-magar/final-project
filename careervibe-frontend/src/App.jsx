import { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Router, Route } from "react-router-dom";
import AOS from 'aos';
import "aos/dist/aos.css";
import Navbar from './components/Navbar';
import Landing from './components/Landing';
import Jobs from './components/Jobs';
import Home from './components/Home';

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
    <div className="bg-white text-black dark:bg-gray-900 dark:text-white min-h-screen transition-colors duration-300">
        <Navbar isDark={isDark} setIsDark={setIsDark} />
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/" element={<Jobs />} />
        </Routes>
    </div>
  );
}

export default App;