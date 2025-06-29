"use client"

import { motion } from "framer-motion"
import { ArrowRight, Search, Users, Building, MapPin, Star, ChevronDown } from "lucide-react"

export default function Landing() {
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

  const floatingVariants = {
    animate: {
      y: [-10, 10, -10],
      transition: {
        duration: 3,
        repeat: Number.POSITIVE_INFINITY,
        ease: "easeInOut",
      },
    },
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.6 }}>
      {/* Hero Section */}
      <section className="relative min-h-screen bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 flex flex-col items-center justify-center text-white text-center px-4 overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: 20,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
            }}
            className="absolute -top-40 -left-40 w-80 h-80 bg-white/10 rounded-full blur-3xl"
          />
          <motion.div
            animate={{
              scale: [1.2, 1, 1.2],
              rotate: [360, 180, 0],
            }}
            transition={{
              duration: 25,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
            }}
            className="absolute -bottom-40 -right-40 w-96 h-96 bg-white/10 rounded-full blur-3xl"
          />
        </div>

        {/* Hero Content */}
        <motion.div variants={containerVariants} initial="hidden" animate="visible" className="relative z-10 max-w-5xl">
          <motion.div variants={itemVariants} className="mb-8">
            <motion.h1
              className="text-5xl md:text-7xl font-extrabold mb-6 leading-tight"
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", stiffness: 100, delay: 0.2 }}
            >
              Welcome to{" "}
              <motion.span
                className="text-yellow-300"
                animate={{
                  textShadow: [
                    "0 0 20px rgba(253, 224, 71, 0.5)",
                    "0 0 40px rgba(253, 224, 71, 0.8)",
                    "0 0 20px rgba(253, 224, 71, 0.5)",
                  ],
                }}
                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
              >
                CareerVibe
              </motion.span>
            </motion.h1>
            <motion.p variants={itemVariants} className="text-xl md:text-2xl mb-8 text-white/90 max-w-3xl mx-auto">
              Discover Your Dream Jobs from Anywhere to Everywhere
            </motion.p>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(0,0,0,0.2)" }}
              whileTap={{ scale: 0.95 }}
              className="bg-yellow-500 text-black px-8 py-4 rounded-2xl text-lg font-bold shadow-lg transition-all duration-300 flex items-center gap-2 justify-center"
            >
              <Search className="w-5 h-5" />
              Browse Jobs
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.1)" }}
              whileTap={{ scale: 0.95 }}
              className="border-2 border-white text-white px-8 py-4 rounded-2xl text-lg font-bold shadow-lg transition-all duration-300 flex items-center gap-2 justify-center backdrop-blur-sm"
            >
              <Building className="w-5 h-5" />
              Post a Job
            </motion.button>
          </motion.div>

          {/* Stats */}
          <motion.div variants={itemVariants} className="grid grid-cols-3 gap-8 max-w-2xl mx-auto">
            {[
              { number: "10K+", label: "Active Users" },
              { number: "500+", label: "Companies" },
              { number: "2K+", label: "Jobs Posted" },
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200, delay: 0.5 + index * 0.1 }}
                className="text-center"
              >
                <div className="text-2xl md:text-3xl font-bold text-yellow-300 mb-2">{stat.number}</div>
                <div className="text-white/80 text-sm md:text-base">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Scroll Down Arrow */}
        <motion.div
          variants={floatingVariants}
          animate="animate"
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <a href="#features" className="text-white/80 hover:text-white transition-colors">
            <ChevronDown className="w-8 h-8" />
          </a>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-white" id="features">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="max-w-6xl mx-auto px-4"
        >
          <motion.div variants={itemVariants} className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-6">
              Trusted by Top Companies
            </h2>
            <p className="text-gray-600 text-lg max-w-3xl mx-auto">
              Join thousands of professionals who have found their dream careers through CareerVibe
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Search,
                title: "Smart Job Search",
                description:
                  "Advanced filters and AI-powered matching to find the perfect opportunities for your skills and preferences.",
                gradient: "from-blue-500 to-cyan-500",
              },
              {
                icon: Users,
                title: "Direct Employer Access",
                description:
                  "Connect directly with hiring managers and recruiters. Skip the middleman and get noticed faster.",
                gradient: "from-purple-500 to-pink-500",
              },
              {
                icon: MapPin,
                title: "Remote Friendly",
                description:
                  "Discover thousands of remote, hybrid, and flexible work opportunities from companies worldwide.",
                gradient: "from-green-500 to-teal-500",
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{
                  scale: 1.05,
                  y: -10,
                  transition: { type: "spring", stiffness: 400, damping: 10 },
                }}
                className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 group cursor-pointer"
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
          </div>
        </motion.div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gradient-to-r from-purple-600 to-pink-600 text-white">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="max-w-6xl mx-auto px-4 text-center"
        >
          <motion.div variants={itemVariants} className="mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">What Our Users Say</h2>
            <p className="text-white/90 text-lg max-w-3xl mx-auto">
              Don't just take our word for it - hear from professionals who've transformed their careers with CareerVibe
            </p>
          </motion.div>

          <motion.div variants={containerVariants} className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Sarah Johnson",
                role: "Frontend Developer",
                company: "Tech Corp",
                testimonial:
                  "CareerVibe helped me land my dream job in just 2 weeks! The platform is incredibly user-friendly.",
                rating: 5,
              },
              {
                name: "Raj Patel",
                role: "Product Manager",
                company: "StartupXYZ",
                testimonial:
                  "The quality of job listings and direct employer connections made all the difference in my job search.",
                rating: 5,
              },
              {
                name: "Emily Chen",
                role: "UX Designer",
                company: "DesignHub",
                testimonial: "Finally, a job platform that understands what remote workers need. Highly recommended!",
                rating: 5,
              },
            ].map((testimonial, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ scale: 1.05 }}
                className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20"
              >
                <div className="flex justify-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-300 fill-current" />
                  ))}
                </div>
                <p className="text-white/90 mb-6 italic">"{testimonial.testimonial}"</p>
                <div className="text-center">
                  <div className="font-semibold text-white">{testimonial.name}</div>
                  <div className="text-white/70 text-sm">
                    {testimonial.role} at {testimonial.company}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-blue-50 to-purple-50">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="max-w-4xl mx-auto px-4 text-center"
        >
          <motion.div variants={itemVariants}>
            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-6">
              Ready to Start Your Journey?
            </h2>
            <p className="text-gray-600 text-lg mb-8 max-w-2xl mx-auto">
              Join thousands of professionals who have already found their perfect career match. Your dream job is just
              a click away.
            </p>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <a
                href="/register"
                className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-4 rounded-2xl text-lg font-bold shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Get Started Today
                <ArrowRight className="w-5 h-5" />
              </a>
            </motion.div>
          </motion.div>
        </motion.div>
      </section>
    </motion.div>
  )
}
