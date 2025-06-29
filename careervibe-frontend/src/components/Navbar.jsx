
import { useState, useEffect } from "react"
import { Link, useLocation } from "react-router-dom"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X, Sun, Moon, ChevronDown, User, LogOut } from "lucide-react"
import careerVibeLogo from "../assets/careervibe-logo.png"

export default function Navbar({ isDark, setIsDark }) {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState(null)
  const [isLoggedIn, setIsLoggedIn] = useState(false) // Mock login state
  const location = useLocation()
  const MotionLink = motion.create(Link);

  // Navigation items with categories
  const navItems = [
    { name: "Home", path: "/home", category: "main" },
    { name: "Jobs", path: "/jobs", category: "main" },
    { name: "About", path: "/about", category: "main" },
    { name: "Contact", path: "/contact", category: "main" },
  ]

  const authItems = [
    { name: "Login", path: "/login", category: "auth" },
    { name: "Register", path: "/register", category: "auth" },
  ]

  const userMenuItems = [
    { name: "Profile", path: "/profile", icon: User },
    { name: "Dashboard", path: "/dashboard", icon: User },
    { name: "Logout", path: "/logout", icon: LogOut },
  ]

  useEffect(() => {
    setIsOpen(false)
    setActiveDropdown(null)
  }, [location])

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }

    const handleClickOutside = () => {
      setActiveDropdown(null)
    }

    window.addEventListener("scroll", handleScroll)
    document.addEventListener("click", handleClickOutside)

    return () => {
      window.removeEventListener("scroll", handleScroll)
      document.removeEventListener("click", handleClickOutside)
    }
  }, [])

  const isActivePage = (path) => {
    return location.pathname === path || (path === "/home" && location.pathname === "/")
  }

  const handleDropdownClick = (e, dropdownName) => {
    e.stopPropagation()
    setActiveDropdown(activeDropdown === dropdownName ? null : dropdownName)
  }

  // Animation variants
  const navVariants = {
    hidden: { y: -100, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  }

  const mobileMenuVariants = {
    hidden: {
      opacity: 0,
      height: 0,
      transition: { duration: 0.3 },
    },
    visible: {
      opacity: 1,
      height: "auto",
      transition: { duration: 0.3, staggerChildren: 0.1 },
    },
  }

  const mobileItemVariants = {
    hidden: { x: -20, opacity: 0 },
    visible: { x: 0, opacity: 1 },
  }

  const dropdownVariants = {
    hidden: {
      opacity: 0,
      scale: 0.95,
      y: -10,
      transition: { duration: 0.2 },
    },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { duration: 0.2 },
    },
  }

  return (
    <motion.nav
      variants={navVariants}
      initial="hidden"
      animate="visible"
      className={`fixed top-0 w-full z-50 transition-all duration-500 ${
        isDark ? "bg-gray-900/90 text-white border-gray-700" : "bg-white/90 text-gray-900 border-gray-200"
      } ${scrolled ? "shadow-2xl backdrop-blur-xl border-b" : "shadow-lg backdrop-blur-md"}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo Section */}
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link to="/" className="flex items-center gap-3 group">
              <motion.img
                src={careerVibeLogo}
                alt="CareerVibe Logo"
                className="h-10 w-10 object-contain group-hover:rotate-12 transition-transform duration-300"
                whileHover={{ rotate: 12 }}
              />
              <span className="text-2xl font-bold tracking-wide">
                career
                <motion.span
                  className="text-yellow-500"
                  animate={{
                    color: ["#eab308", "#f59e0b", "#eab308"],
                  }}
                  transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                >
                  Vibe
                </motion.span>
              </span>
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <motion.div key={item.name} className="relative">
                <Link
                  to={item.path}
                  className={`relative px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 group ${
                    isActivePage(item.path)
                      ? "text-yellow-500 bg-yellow-500/10"
                      : isDark
                        ? "text-gray-300 hover:text-yellow-400 hover:bg-gray-800/50"
                        : "text-gray-700 hover:text-yellow-600 hover:bg-gray-100/50"
                  }`}
                >
                  <span className="relative z-10">{item.name}</span>

                  {/* Active indicator */}
                  {isActivePage(item.path) && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute inset-0 bg-yellow-500/20 rounded-lg"
                      initial={false}
                      transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    />
                  )}

                  {/* Hover underline */}
                  <motion.div
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-yellow-500 origin-left"
                    initial={{ scaleX: 0 }}
                    whileHover={{ scaleX: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-4">
            {/* Theme Toggle */}
            <motion.button
              onClick={() => setIsDark(!isDark)}
              className={`p-2 rounded-full transition-all duration-300 ${
                isDark
                  ? "bg-yellow-500/20 text-yellow-400 hover:bg-yellow-500/30"
                  : "bg-gray-200/50 text-gray-600 hover:bg-gray-300/50"
              }`}
              whileHover={{ scale: 1.1, rotate: 180 }}
              whileTap={{ scale: 0.9 }}
              aria-label="Toggle theme"
            >
              <AnimatePresence mode="wait">
                {isDark ? (
                  <motion.div
                    key="sun"
                    initial={{ rotate: -180, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 180, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Sun className="w-5 h-5" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="moon"
                    initial={{ rotate: -180, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 180, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Moon className="w-5 h-5" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>

            {/* Auth Section - Desktop */}
            <div className="hidden md:flex items-center space-x-2">
              {!isLoggedIn ? (
                <>
                  {authItems.map((item) => (
                    <motion.div key={item.name}>
                      <MotionLink
                        to={item.path}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                          item.name === "Login"
                            ? isDark
                              ? "text-gray-300 hover:text-white hover:bg-gray-800/50"
                              : "text-gray-700 hover:text-gray-900 hover:bg-gray-100/50"
                            : "bg-gradient-to-r from-yellow-500 to-orange-500 text-white hover:from-yellow-600 hover:to-orange-600 shadow-lg hover:shadow-xl"
                        }`}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        {item.name}
                      </MotionLink>
                    </motion.div>
                  ))}
                </>
              ) : (
                /* User Menu Dropdown */
                <div className="relative">
                  <motion.button
                    onClick={(e) => handleDropdownClick(e, "user")}
                    className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-all duration-300 ${
                      isDark
                        ? "text-gray-300 hover:text-white hover:bg-gray-800/50"
                        : "text-gray-700 hover:text-gray-900 hover:bg-gray-100/50"
                    }`}
                    whileHover={{ scale: 1.05 }}
                  >
                    <div className="w-8 h-8 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full flex items-center justify-center">
                      <User className="w-4 h-4 text-white" />
                    </div>
                    <ChevronDown
                      className={`w-4 h-4 transition-transform duration-300 ${
                        activeDropdown === "user" ? "rotate-180" : ""
                      }`}
                    />
                  </motion.button>

                  <AnimatePresence>
                    {activeDropdown === "user" && (
                      <motion.div
                        variants={dropdownVariants}
                        initial="hidden"
                        animate="visible"
                        exit="hidden"
                        className={`absolute right-0 mt-2 w-48 rounded-xl shadow-2xl border ${
                          isDark ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
                        } overflow-hidden`}
                      >
                        {userMenuItems.map((item, index) => (
                          <MotionLink
                            key={item.name}
                            to={item.path}
                            className={`flex items-center space-x-3 px-4 py-3 transition-all duration-200 ${
                              isDark
                                ? "text-gray-300 hover:text-white hover:bg-gray-700"
                                : "text-gray-700 hover:text-gray-900 hover:bg-gray-50"
                            } ${index === userMenuItems.length - 1 ? "border-t border-gray-200 dark:border-gray-700" : ""}`}
                          >
                            <item.icon className="w-4 h-4" />
                            <span className="text-sm font-medium">{item.name}</span>
                          </MotionLink>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )}
            </div>

            {/* Mobile Menu Toggle */}
            <motion.button
              onClick={() => setIsOpen(!isOpen)}
              className={`md:hidden p-2 rounded-lg transition-all duration-300 ${
                isDark
                  ? "text-gray-300 hover:text-white hover:bg-gray-800/50"
                  : "text-gray-700 hover:text-gray-900 hover:bg-gray-100/50"
              }`}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              aria-label="Toggle mobile menu"
            >
              <AnimatePresence mode="wait">
                {isOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <X className="w-6 h-6" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Menu className="w-6 h-6" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            variants={mobileMenuVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            className={`md:hidden border-t ${
              isDark ? "bg-gray-900/95 border-gray-700" : "bg-white/95 border-gray-200"
            } backdrop-blur-xl`}
          >
            <div className="px-4 py-6 space-y-3">
              {/* Mobile Navigation Items */}
              {navItems.map((item) => (
                <motion.div key={item.name} variants={mobileItemVariants}>
                  <Link
                    to={item.path}
                    className={`block px-4 py-3 rounded-lg text-base font-medium transition-all duration-300 ${
                      isActivePage(item.path)
                        ? "text-yellow-500 bg-yellow-500/10"
                        : isDark
                          ? "text-gray-300 hover:text-white hover:bg-gray-800/50"
                          : "text-gray-700 hover:text-gray-900 hover:bg-gray-100/50"
                    }`}
                  >
                    {item.name}
                  </Link>
                </motion.div>
              ))}

              {/* Mobile Auth Items */}
              {!isLoggedIn && (
                <div className="pt-4 border-t border-gray-200 dark:border-gray-700 space-y-3">
                  {authItems.map((item) => (
                    <motion.div key={item.name} variants={mobileItemVariants}>
                      <Link
                        to={item.path}
                        className={`block px-4 py-3 rounded-lg text-base font-medium transition-all duration-300 ${
                          item.name === "Register"
                            ? "bg-gradient-to-r from-yellow-500 to-orange-500 text-white text-center"
                            : isDark
                              ? "text-gray-300 hover:text-white hover:bg-gray-800/50"
                              : "text-gray-700 hover:text-gray-900 hover:bg-gray-100/50"
                        }`}
                      >
                        {item.name}
                      </Link>
                    </motion.div>
                  ))}
                </div>
              )}

              {/* Mobile User Menu */}
              {isLoggedIn && (
                <div className="pt-4 border-t border-gray-200 dark:border-gray-700 space-y-3">
                  {userMenuItems.map((item) => (
                    <motion.div key={item.name} variants={mobileItemVariants}>
                      <Link
                        to={item.path}
                        className={`flex items-center space-x-3 px-4 py-3 rounded-lg text-base font-medium transition-all duration-300 ${
                          isDark
                            ? "text-gray-300 hover:text-white hover:bg-gray-800/50"
                            : "text-gray-700 hover:text-gray-900 hover:bg-gray-100/50"
                        }`}
                      >
                        <item.icon className="w-5 h-5" />
                        <span>{item.name}</span>
                      </Link>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}
