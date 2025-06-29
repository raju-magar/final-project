
import { useEffect } from "react"
import { motion } from "framer-motion"
import { Rocket, Globe, Users, Target, Award, Heart } from "lucide-react"

export default function About() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

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
  }

  const cardVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
      },
    },
    hover: {
      scale: 1.05,
      y: -10,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10,
      },
    },
  }

  const features = [
    {
      icon: Rocket,
      title: "Simple & Smart",
      description:
        "Our platform is designed to be intuitive and fast, using filters and smart search tools that help job seekers match with the right roles.",
      gradient: "from-blue-500 to-cyan-500",
    },
    {
      icon: Globe,
      title: "Empowering Reach",
      description:
        "From local talent to global teams, CareerVibe connects people across geographies with purpose-driven opportunities.",
      gradient: "from-purple-500 to-pink-500",
    },
    {
      icon: Users,
      title: "Built for Everyone",
      description:
        "We serve fresh grads, seasoned pros, startups and enterprises alike. Everyone deserves a great career story.",
      gradient: "from-green-500 to-teal-500",
    },
  ]

  const stats = [
    { number: "10K+", label: "Active Users", icon: Users },
    { number: "500+", label: "Companies", icon: Target },
    { number: "2K+", label: "Jobs Posted", icon: Award },
    { number: "95%", label: "Success Rate", icon: Heart },
  ]

  return (
    <section className="min-h-screen px-6 py-16 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-6xl mx-auto space-y-16"
      >
        {/* Header */}
        <motion.div variants={itemVariants} className="text-center space-y-6">
          <motion.h1
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-6xl font-extrabold bg-gradient-to-r from-blue-600 via-purple-500 to-pink-500 text-transparent bg-clip-text"
          >
            About CareerVibe
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg md:text-xl leading-relaxed text-gray-600 max-w-4xl mx-auto"
          >
            CareerVibe is your launchpad to a brighter future. We're on a mission to simplify job hunting and empower
            professionals to find meaningful opportunities - whether remote, hybrid, or in-office.
          </motion.p>
        </motion.div>

        {/* Stats Section */}
        <motion.div variants={itemVariants} className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              whileHover="hover"
              className="bg-white rounded-2xl p-6 text-center shadow-lg border border-gray-100"
            >
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                <stat.icon className="w-6 h-6 text-white" />
              </div>
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200, delay: index * 0.1 }}
                className="text-2xl md:text-3xl font-bold text-gray-800 mb-2"
              >
                {stat.number}
              </motion.div>
              <p className="text-gray-600 font-medium">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Features Grid */}
        <motion.div variants={itemVariants} className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              whileHover="hover"
              className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 group"
            >
              <div
                className={`w-16 h-16 bg-gradient-to-r ${feature.gradient} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}
              >
                <feature.icon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-4 group-hover:text-purple-600 transition-colors duration-300">
                {feature.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Mission Section */}
        <motion.div
          variants={itemVariants}
          className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-3xl p-8 md:p-12 text-white text-center"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200, delay: 0.3 }}
            className="w-20 h-20 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-6"
          >
            <Target className="w-10 h-10 text-white" />
          </motion.div>
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Our Mission</h2>
          <p className="text-lg md:text-xl leading-relaxed max-w-3xl mx-auto mb-8">
            To bridge the gap between talented individuals and amazing opportunities, creating a world where everyone
            can find work that truly matters to them.
          </p>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <a
              href="/register"
              className="inline-block px-8 py-4 bg-white text-purple-600 font-bold rounded-2xl hover:bg-gray-100 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              Join CareerVibe Today
            </a>
          </motion.div>
        </motion.div>

        {/* Team Section */}
        <motion.div variants={itemVariants} className="text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-8">Built with ❤️ in Nepal</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Our team is passionate about connecting people with opportunities that matter. We believe that the right job
            can transform lives, and we're here to make that connection happen.
          </p>
        </motion.div>
      </motion.div>
    </section>
  )
}
