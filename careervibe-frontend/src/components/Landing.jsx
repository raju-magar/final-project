import { motion } from "framer-motion";
import { ArrowRight, Search, Users, Building, MapPin, Star, ChevronDown } from "lucide-react";

export default function Landing() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
      },
    },
  };

  const floatingVariants = {
    animate: {
      y: [-10, 10, -10],
      transition: {
        duration: 3,
        repeat: Number.POSITIVE_INFINITY,
        ease: "easeInOut",
      },
    },
  };

  return (
    <div className="pt-16">
      <motion.div
        initial="hidden"
        animate="visible"
        exit="hidden"
        variants={containerVariants}
        transition={{ duration: 0.6 }}
        className="p-8 text-center"
      >
        <motion.h1 variants={itemVariants} className="text-4xl font-bold mb-6">
          Welcome to CareerVibe
        </motion.h1>

        <motion.p variants={itemVariants} className="mb-6 text-lg text-gray-700">
          Find your dream job or hire the perfect candidate.
        </motion.p>

        <motion.button
          variants={itemVariants}
          className="inline-flex items-center gap-2 px-6 py-3 bg-purple-600 text-white rounded-xl hover:bg-purple-700 transition"
        >
          Get Started <ArrowRight />
        </motion.button>
      </motion.div>
    </div>
  );
}
