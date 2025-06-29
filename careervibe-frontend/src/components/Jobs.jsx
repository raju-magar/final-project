
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Search, MapPin, Briefcase, Clock, Building, ArrowRight, Filter } from "lucide-react"

export default function Jobs() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterLocation, setFilterLocation] = useState("")
  const [filterType, setFilterType] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [showFilters, setShowFilters] = useState(false)

  const jobs = [
    {
      id: 1,
      title: "Frontend Developer",
      company: "Tech Corp",
      location: "Kathmandu, Nepal",
      type: "Full-Time",
      salary: "NPR 80,000 - 120,000",
      posted: "2 days ago",
      description: "Build amazing user interfaces with React and modern web technologies.",
    },
    {
      id: 2,
      title: "Backend Developer",
      company: "Innovate Ltd",
      location: "Pokhara, Nepal",
      type: "Part-Time",
      salary: "NPR 60,000 - 90,000",
      posted: "1 day ago",
      description: "Develop robust server-side applications and APIs.",
    },
    {
      id: 3,
      title: "UI/UX Designer",
      company: "DesignHub",
      location: "Biratnagar, Nepal",
      type: "Contract",
      salary: "NPR 70,000 - 100,000",
      posted: "3 days ago",
      description: "Create beautiful and intuitive user experiences.",
    },
    {
      id: 4,
      title: "Full Stack Developer",
      company: "StartupXYZ",
      location: "Remote",
      type: "Full-Time",
      salary: "NPR 100,000 - 150,000",
      posted: "1 week ago",
      description: "Work on both frontend and backend technologies.",
    },
  ]

  const handleFilterChange = (e) => {
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
    }, 800)

    if (e.target.name === "search") setSearchTerm(e.target.value)
    else if (e.target.name === "location") setFilterLocation(e.target.value)
    else if (e.target.name === "type") setFilterType(e.target.value)
  }

  const filteredJobs = jobs.filter(
    (job) =>
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (filterLocation === "" || job.location.toLowerCase().includes(filterLocation.toLowerCase())) &&
      (filterType === "" || job.type === filterType),
  )

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
      },
    },
  }

  const jobCardVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
      },
    },
    hover: {
      scale: 1.02,
      y: -5,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10,
      },
    },
  }

  return (
    <div className="min-h-screen py-10 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
            Find Your Dream Job
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Discover amazing opportunities and take the next step in your career journey
          </p>
        </motion.div>

        {/* Search and Filters */}
        <motion.div variants={containerVariants} initial="hidden" animate="visible" className="mb-8">
          {/* Main Search Bar */}
          <motion.div variants={itemVariants} className="relative mb-6">
            <div className="relative max-w-2xl mx-auto">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                name="search"
                placeholder="Search for jobs, companies, or keywords..."
                className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-2xl focus:outline-none focus:border-purple-500 focus:ring-4 focus:ring-purple-500/20 transition-all duration-300 text-lg shadow-lg"
                value={searchTerm}
                onChange={handleFilterChange}
              />
            </div>
          </motion.div>

          {/* Filter Toggle */}
          <motion.div variants={itemVariants} className="text-center mb-4">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="inline-flex items-center gap-2 px-6 py-3 bg-white border-2 border-gray-200 rounded-xl hover:border-purple-500 transition-all duration-300 shadow-md hover:shadow-lg"
            >
              <Filter className="w-5 h-5" />
              <span>Filters</span>
              <motion.div animate={{ rotate: showFilters ? 180 : 0 }} transition={{ duration: 0.3 }}>
                <ArrowRight className="w-4 h-4 rotate-90" />
              </motion.div>
            </button>
          </motion.div>

          {/* Filters */}
          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="flex flex-col sm:flex-row gap-4 max-w-4xl mx-auto">
                  <motion.div variants={itemVariants} className="relative flex-1">
                    <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <select
                      name="location"
                      className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-purple-500 focus:ring-4 focus:ring-purple-500/20 transition-all duration-300 appearance-none bg-white shadow-md"
                      value={filterLocation}
                      onChange={handleFilterChange}
                    >
                      <option value="">All Locations</option>
                      <option value="Kathmandu">Kathmandu</option>
                      <option value="Pokhara">Pokhara</option>
                      <option value="Biratnagar">Biratnagar</option>
                      <option value="Remote">Remote</option>
                    </select>
                  </motion.div>

                  <motion.div variants={itemVariants} className="relative flex-1">
                    <Briefcase className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <select
                      name="type"
                      className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-purple-500 focus:ring-4 focus:ring-purple-500/20 transition-all duration-300 appearance-none bg-white shadow-md"
                      value={filterType}
                      onChange={(e) => setFilterType(e.target.value)}
                    >
                      <option value="">All Job Types</option>
                      <option value="Full-Time">Full-Time</option>
                      <option value="Part-Time">Part-Time</option>
                      <option value="Contract">Contract</option>
                    </select>
                  </motion.div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Loading Animation */}
        <AnimatePresence>
          {isLoading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex justify-center mb-8"
            >
              <div className="flex items-center gap-3 bg-white px-6 py-4 rounded-2xl shadow-lg">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                  className="w-6 h-6 border-3 border-purple-500 border-t-transparent rounded-full"
                />
                <span className="text-gray-600 font-medium">Finding perfect matches...</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Results Count */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="mb-6">
          <p className="text-gray-600 text-center">
            Found <span className="font-semibold text-purple-600">{filteredJobs.length}</span> job
            {filteredJobs.length !== 1 ? "s" : ""} matching your criteria
          </p>
        </motion.div>

        {/* Job Cards */}
        <AnimatePresence mode="wait">
          {!isLoading && (
            <motion.div
              key="job-grid"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {filteredJobs.length > 0 ? (
                filteredJobs.map((job, index) => (
                  <motion.div
                    key={job.id}
                    variants={jobCardVariants}
                    whileHover="hover"
                    className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 cursor-pointer group"
                  >
                    {/* Job Header */}
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-gray-800 group-hover:text-purple-600 transition-colors duration-300">
                          {job.title}
                        </h3>
                        <div className="flex items-center gap-2 mt-2">
                          <Building className="w-4 h-4 text-gray-400" />
                          <span className="text-gray-600 font-medium">{job.company}</span>
                        </div>
                      </div>
                      <motion.div
                        whileHover={{ scale: 1.1 }}
                        className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center"
                      >
                        <Briefcase className="w-6 h-6 text-white" />
                      </motion.div>
                    </div>

                    {/* Job Details */}
                    <div className="space-y-3 mb-6">
                      <div className="flex items-center gap-2 text-gray-600">
                        <MapPin className="w-4 h-4" />
                        <span>{job.location}</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-600">
                        <Clock className="w-4 h-4" />
                        <span>{job.type}</span>
                      </div>
                      <div className="text-green-600 font-semibold">{job.salary}</div>
                      <p className="text-gray-600 text-sm line-clamp-2">{job.description}</p>
                    </div>

                    {/* Job Footer */}
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-500">{job.posted}</span>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-2 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2"
                      >
                        Apply Now
                        <ArrowRight className="w-4 h-4" />
                      </motion.button>
                    </div>
                  </motion.div>
                ))
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="col-span-full text-center py-12"
                >
                  <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Search className="w-12 h-12 text-gray-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-600 mb-2">No jobs found</h3>
                  <p className="text-gray-500">Try adjusting your search criteria</p>
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
