import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DashboardCard from "../components/DashboardCard.jsx"; // Import the new component
import SkeletonLoader from "../components/SkeletonLoader.jsx"; // Import the skeleton loader

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1, // Stagger the appearance of child elements
            when: "beforeChildren", // Children animate after parent
        },
    },
    exit: { opacity: 0, y: -40, transition: { duration: 0.5 } },
};

const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

export default function Dashboard() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true); // New loading state
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            navigate("/login");
            return;
        }

        // Simulate fetching user data with a delay
        setTimeout(() => {
            setUser({
                name: "Bryan Adams",
                email: "bryan@example.com",
                appliedJobs: 7, // Increased for a more active feel
                savedJobs: 4,   // Increased
                recentActivity: [
                    "Applied to 'Senior Frontend Dev' at Tech Innovations",
                    "Saved 'Product Manager' role at Global Corp",
                    "Profile viewed by HR at Acme Inc.",
                ]
            });
            setLoading(false);
        }, 1500); // Simulate network delay
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/login");
    };

    if (loading) {
        return <SkeletonLoader />; // Show skeleton loader while loading
    }

    if (!user) {
        // This case should ideally be caught by the token check, but good to have a fallback
        return (
            <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 px-4 py-10 text-white flex items-center justify-center">
                <p>An error occurred or user data not found. Please try again.</p>
            </div>
        );
    }

    return (
        <AnimatePresence mode="wait">
            <motion.div
                key="dashboard-content"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 px-4 py-10 text-white"
            >
                <div className="max-w-5xl mx-auto">
                    <motion.div
                        className="bg-white/10 p-8 rounded-3xl shadow-xl backdrop-blur-lg border border-white/20" // Added a subtle border
                        variants={itemVariants} // Applies item animation
                    >
                        <h2 className="text-4xl font-extrabold mb-2 leading-tight">
                            Welcome back, {user?.name}! 👋
                        </h2>
                        <p className="text-lg mb-8 text-white/80">
                            Here's a quick overview of your activity and progress.
                        </p>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
                            {/* Using the reusable DashboardCard component */}
                            <DashboardCard
                                title="Applied Jobs"
                                value={user?.appliedJobs}
                                icon="💼" // Briefcase icon
                                onClick={() => navigate("/dashboard/applied")} // Example navigation
                            />
                            <DashboardCard
                                title="Saved Jobs"
                                value={user?.savedJobs}
                                icon="🔖" // Bookmark icon
                                onClick={() => navigate("/dashboard/saved")} // Example navigation
                            />
                            <DashboardCard
                                title="Your Email"
                                value={user?.email}
                                icon="📧" // Envelope icon
                            />
                        </div>

                        {user.recentActivity && user.recentActivity.length > 0 && (
                            <motion.div
                                className="bg-white/10 p-6 rounded-2xl shadow-lg backdrop-blur-sm mb-10 border border-white/20"
                                variants={itemVariants}
                            >
                                <h3 className="text-2xl font-semibold mb-4 text-white/95">Recent Activity</h3>
                                <ul className="space-y-3">
                                    {user.recentActivity.map((activity, index) => (
                                        <motion.li
                                            key={index}
                                            className="flex items-center text-white/80"
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: 0.1 * index }}
                                        >
                                            <span className="text-xl mr-3">🚀</span> {activity}
                                        </motion.li>
                                    ))}
                                </ul>
                            </motion.div>
                        )}

                        <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4">
                            <button
                                onClick={() => navigate("/jobs")} // Example button to browse jobs
                                className="bg-green-500 hover:bg-green-600 transition-all duration-300 text-white font-semibold px-8 py-4 rounded-xl shadow-xl hover:shadow-2xl flex-grow"
                            >
                                Find New Jobs
                            </button>
                            <button
                                onClick={handleLogout}
                                className="bg-red-500 hover:bg-red-600 transition-all duration-300 text-white font-semibold px-8 py-4 rounded-xl shadow-xl hover:shadow-2xl flex-grow"
                            >
                                Logout
                            </button>
                        </motion.div>
                    </motion.div>
                </div>
            </motion.div>
        </AnimatePresence>
    );
}
