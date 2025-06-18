import { useEffect } from "react";

export default function Contact() {
    useEffect(() => {
        window.scrollTo(0, 0); // Scroll to top on load
    }, []);

    return (
        <section className="min-h-screen bg-gradient-to-br from-blue-50 via-purple to-pink-50 flex items-center justify-center px-4 py-20" id="contact">
            <div className="bg-white rounded-xl shadow-lg p-8 max-w-2xl w-full space-y-6" data-aos="fade-up">
                <h2 className="text-3xl font-bold text-center text-gray-800">Contact Us</h2>
            <p className="text-center text-gray-600">Have question or suggestion? Drop us a message.</p>

            <form className="space-y-4">
                <div>
                    <label className="block text-gray-700 font-semibold mb-1">Name</label>
                    <input type="text" placeholder="Your Name" className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-400"/>
                </div>
                <div>
                    <label className="block text-gray-700 font-semibold mb-1">Email</label>
                    <input type="email" placeholder="you@example.com" className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-400" />
                </div>
                <div>
                    <label className="block text-gray-700 font-semibold mb-1">Message</label>
                    <textarea rows="5" placeholder="Write your message here..." className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-pink-400"></textarea>
                </div>

                <button type="submit" className="w-full bg-gradient-to-r from-blue-500 to-pink-500 text-white py-2 rounded font-semibold transition transform hover:scale-105">Send message</button>
            </form>
            </div>
        </section> 
    );
}