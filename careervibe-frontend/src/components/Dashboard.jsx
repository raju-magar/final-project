import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    // Simulate fetching user data
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) return navigate("/login");

        // Here you'd fetch real data from backend
        setUser({
            name: "bryan adams",
            email: "brayan@example.com",
            appliedJobs: 5,
            savedJobs: 3,
        });
    }, []);

    if (!user) {
        return <div>Loading...</div>; // Handle Loading state 
    }

    return (
        <AnimatePresence>
            <motion.div
                key="dashboard"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -40 }}
                transition={{ duration: 0.5 }}
                className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 px-4 py-10 text-white"
            >
                <div className="max-w-5xl mx-auto">
                    <motion.div
                        className="bg-white/10 p-8 rounded-3xl shadow-xl backdrop-blur-lg"
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.2 }}
                    >
                        <h2 className="text-3xl font-bold mb-4">
                            Welcome back, {user?.name} 👋
                        </h2>
                        <p className="text-lg mb-8 text-white/80">
                            Here's a quick overview of your activity
                        </p>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            <motion.div 
                                className="bg-white/20 p-6 rounded-2xl shadow-lg hover:scale-105 transition transform" 
                                whileHover={{ scale: 1.05 }}
                            >
                                <h3 className="text-xl font-semibold">Applied Jobs</h3>
                                <p className="text-4xl font-bold mt-2">{user?.appliedJobs}</p>
                            </motion.div>

                            <motion.div 
                                className="bg-white/20 p-6 rounded-2xl shadow-lg hover:scale-105 transition transform" 
                                whileHover={{ scale: 1.05 }}
                            >
                                <h3 className="text-xl font-semibold">Saved Jobs</h3>
                                <p className="text-4xl font-bold mt-2">{user?.savedJobs}</p>
                            </motion.div>

                            <motion.div 
                                className="bg-white/20 p-6 rounded-2xl shadow-lg hover:scale-105 transition transform" 
                                whileHover={{ scale: 1.05 }}
                            >
                                <h3 className="text-xl font-semibold">Email</h3>
                                <p className="mt-2 text-white/90">{user?.email}</p>
                            </motion.div>
                        </div> {/* Closing the grid div */}

                        <div className="mt-10">
                            <button 
                                onClick={() => {
                                    localStorage.removeItem("token");
                                    navigate("/login");
                                }} 
                                className="bg-red-500 hover:bg-red-600 transition text-white font-semibold px-6 py-3 rounded-xl shadow-xl"
                            >
                                Logout
                            </button>
                        </div>
                    </motion.div> {/* Closing the inner motion.div */}
                </div>
            </motion.div>
        </AnimatePresence>
    );
}