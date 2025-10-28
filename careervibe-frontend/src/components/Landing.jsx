import { motion } from "framer-motion";
import { ArrowRight, Users, Building, MapPin, ChevronDown } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Landing() {
  const navigate = useNavigate();

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.3 } },
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 80 },
    },
  };

  const floatingVariants = (delay = 0) => ({
    animate: {
      y: [-10, 10, -10],
      transition: {
        duration: 4 + delay,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  });

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-600 via-indigo-700 to-blue-600 text-white overflow-hidden">
      {/* Background Image Overlay */}
      <img
        src="/hero-bg.jpg"
        alt="career background"
        className="absolute inset-0 w-full h-full object-cover opacity-25"
      />

      {/* Floating Icons */}
      <motion.div
        className="absolute top-24 left-10 text-white/70"
        variants={floatingVariants(0)}
        animate="animate"
      >
        <Users size={50} />
      </motion.div>
      <motion.div
        className="absolute top-40 right-10 text-white/70"
        variants={floatingVariants(1)}
        animate="animate"
      >
        <Building size={50} />
      </motion.div>
      <motion.div
        className="absolute bottom-32 left-20 text-white/70"
        variants={floatingVariants(2)}
        animate="animate"
      >
        <MapPin size={50} />
      </motion.div>

      {/* Main Hero Content */}
      <motion.div
        initial="hidden"
        animate="visible"
        exit="hidden"
        variants={containerVariants}
        className="relative z-10 text-center px-6"
      >
        <motion.h1
          variants={itemVariants}
          className="text-4xl md:text-6xl font-extrabold mb-6"
        >
          Welcome to <span className="text-yellow-300">CareerVibe</span>
        </motion.h1>

        <motion.p
          variants={itemVariants}
          className="mb-6 text-lg md:text-xl text-white/90"
        >
          Find your dream job or hire the perfect candidate — all in one place.
        </motion.p>

        <motion.button
          variants={itemVariants}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate("/login")}
          className="inline-flex items-center gap-2 px-8 py-3 bg-yellow-400 text-gray-900 font-semibold rounded-xl shadow-lg hover:bg-yellow-300 transition"
        >
          Get Started
          <ArrowRight />
        </motion.button>
      </motion.div>

      {/* Scroll Down Arrow */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 1.5, repeat: Infinity }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white/80"
      >
        <ChevronDown size={36} />
      </motion.div>
    </div>
  );
}
