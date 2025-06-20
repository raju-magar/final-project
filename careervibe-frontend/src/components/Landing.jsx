import { motion } from "framer-motion";
import careerVibeLogo from "../assets/careervibe-logo.png";

export default function Landing() {
    return (
        <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.6 }}
        >

        {/* Hero Section */}
        <section className="relative min-h-screen bg-cover bg-center flex flex-col items-center 
        justify-center text-white text-center px-4" style={{ backgroundImage: "url('/hero-bg.png')" }} id="home">
            {/* Dark overlay */}
            <div className="absolute inset-0 bg-black opacity-60 z-0"></div>

            {/* Hero content */}
            <div className="relative z-10 max-w-3xl" data-aos="fade-up">
                <h1 className="text-5xl md:text-6xl font-extrabold mb-4">
                    Welcome to <span className="text-yellow-300">CareerVibe</span>
                </h1>
                <p className="text-xl md:text-2xl mb-6">Discover Your Dream jobs from Anywhere to Everywhere</p>
                
                {/* CTA Buttons */}
                <div className="flex gap-4 justify-center mt-4" data-aos="Zoom-in" data-aos-delay="400">
                    <button className="bg-yellow-500 text-black px-6 py-3 rounded-full text-lg font-bold shadow-lg transition transform hover:scale-105">
                        Browse Jobs
                    </button>
                    <button className="border-2 border-white text-white px-6 py-3 rounded-full text-lg font-bold shadow-lg transition transform hover:scale-105">
                        Post a Job
                    </button>
                </div>
            </div>

            {/* Scroll Down Arrow */}
            <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 animate-bounce z-10">
                <a href="#features">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                </a>
            </div>
        </section>
        {/* Features Section( Trusted by Section ) */}
        <section className="py-16 bg-gray-50 text-center" id="features" data-aos="fade-up">
            <div className="max-w-6xl mx-auto px-4">
                <h2 className="text-3xl md:text-4xl font-bold mb-10">Trusted bt top Companies</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                <div className="bg-gray-100 p-6 rounded-xl shadow-md hover:shadow-xl transition duration-300">
                    <h3 className="text-xl; font-semibold mb-4">Smart Job Search</h3>
                    <p className="text-gray-700 mt-4">Trusted by Thousands os users across Nepal.</p>
                </div>

                <div className="bg-gray-100 p-6 rounded-xl shadow-md hover:shadow-xl transition duration-300">
                    <h3 className="text-xl font-semibold mb-2">Direct Employer Access</h3>
                    <p className="text-gray-700">Apply and connect with recruiters - all in one place.</p>
                </div>

                <div className="bg-gray-100 p-6 rounded-xl shadow-md hover:shadow-xl transition duration-300">
                    <h3 className="text-xl font-semibold mb-2">Remote friendly</h3>
                    <p className="text-gray-700">Browse thousands of remote and hybrid job opportunities easily.</p>
                </div>
            </div>
        </section>
        </motion.div>
    );
}