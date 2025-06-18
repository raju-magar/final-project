import { useEffect } from 'react';

export default function About() {
    useEffect(() => {
        window.scrollTo(0, 0); // Scroll to top on load
    }, []);

    return (
        <section className="min-h-screen px-6 py-16 bg-white text-gray-800 dark:bg-gray-900 dark:text-white" id="about">
            <div className="max-w-5xl mx-auto space-y-10" data-aos="fade-up">
                {/* Gradient Heading */}
                <h2 className="text-4xl md:text-5xl font-extrabold text-center bg-gradient-to-r from-blue-600 via-purple-500 to-pink-500 text-transparent bg-clip-text">About CareerVibe</h2>
                <p className="text-lg leading-relaxed text-center text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                    CareerVibe is your launchpad to a brighter future. we're on a mission to simplify job hunting and empower professionals to find meaningful opportunities - whether remote, hybrid, or in-office.
                </p>

                {/* Info Cards */}
                <div className="grid md:grid-cols-3 gap-6 text-center">
                    <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-6 shadow hover:shadow-xl hover:scale-105 transition-all duration-300" data-aos="fade-up" data-aos-delay="100">
                        <h3 className="text-xl font-semibold mb-2">🚀 Simple & Smart</h3>
                        <p>Our platform is designed to be intuitive and fast, using filters and smart search tools that help job seekers match with the right roles.</p>
                    </div>

                    <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-6 shadow hover:shadow-xl hover:scale-105 transition-all duration-300" data-aos="fade-up" data-aos-delay="200">
                        <h3 className="text-xl font-semibold mb-2">🌍Empowering Reach</h3>
                        <p> From local talent to global teams, CareerVibe connects people across geographies with purpose-driven opportunities.</p>
                    </div>
                    <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-6 shadow hover:shadow-xl hover:scale-105 transition-all duration-300" data-aos="fade-up" data-aos-delay="300">
                        <h3 className="text-xl font-semibold mb-2">🤝 Built for Everyone</h3>
                        <p>we serve fresh grads, seasoned pros, startups abd enterprises alike. Everyone deserves a greate career story.</p>
                    </div>
                </div>

                {/* CTA Button */}
                <div className="text-center pt-6">
                    <a href="/register" className="inline-block px-6 py-3 bg-gradient-to-r from-blue-500 to-pink-500 text-white font-semibold rounded hover:scale-105 transition-all duration-300">Join CareerVibe Today</a>
                </div>
            </div>
        </section>
    );
}