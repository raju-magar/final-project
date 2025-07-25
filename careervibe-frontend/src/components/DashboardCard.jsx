import { motion } from "framer-motion";

const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
    hover: { scale: 1.05, boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.2)" }, // Add a subtle shadow on hover
};

export default function DashboardCard({ title, value, icon, onClick }) {
    const isClickable = typeof onClick === 'function';

    return (
        <motion.div
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            whileHover="hover"
            className={`bg-white p-6 rounded-2xl shadow-lg transition-all duration-300 ease-in-out
                ${isClickable ? 'cursor-pointer' : ''}`}
            onClick={onClick}
        >
            <div className="flex items-center mb-3">
                {icon && <span className="text-4xl mr-4">{icon}</span>}
                <h3 className="text-xl font-semibold text-gray-800">{title}</h3>
            </div>
            <p className="text-5xl font-bold text-blue-600">{value}</p>
        </motion.div>
    );
}
