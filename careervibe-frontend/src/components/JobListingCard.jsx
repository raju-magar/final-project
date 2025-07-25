import { motion } from "framer-motion";
import { MapPin, DollarSign, Calendar, Briefcase } from "lucide-react";

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3, ease: "easeOut" } },
  hover: { scale: 1.02, boxShadow: "0px 5px 15px rgba(0, 0, 0, 0.1)" },
};

export default function JobListingCard({ job, onApply, onSave }) {
  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover="hover"
      className="bg-white rounded-xl shadow-md p-5 border border-gray-100"
    >
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-xl font-semibold text-gray-800">{job.title}</h3>
          <p className="text-gray-600 font-medium">{job.company}</p>
        </div>
        {job.logo ? (
          <img src={job.logo} alt={`${job.company} logo`} className="w-12 h-12 object-contain" />
        ) : (
          <div className="w-12 h-12 bg-blue-100 rounded-md flex items-center justify-center">
            <Briefcase className="text-blue-500" />
          </div>
        )}
      </div>

      <div className="mt-4 space-y-2">
        <div className="flex items-center text-gray-500">
          <MapPin size={16} className="mr-2" />
          <span>{job.location}</span>
        </div>
        
        {job.salary && (
          <div className="flex items-center text-gray-500">
            <DollarSign size={16} className="mr-2" />
            <span>{job.salary}</span>
          </div>
        )}
        
        <div className="flex items-center text-gray-500">
          <Calendar size={16} className="mr-2" />
          <span>Posted {job.postedDate}</span>
        </div>
      </div>

      {job.tags && job.tags.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-2">
          {job.tags.map((tag, index) => (
            <span 
              key={index} 
              className="px-2 py-1 bg-blue-50 text-blue-600 text-xs font-medium rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      <div className="mt-5 pt-4 border-t border-gray-100 flex justify-between">
        <button 
          onClick={() => onSave && onSave(job.id)}
          className="px-4 py-2 border border-gray-300 rounded-md text-gray-600 hover:bg-gray-50 transition-colors"
        >
          Save
        </button>
        <button 
          onClick={() => onApply && onApply(job.id)}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          Apply Now
        </button>
      </div>
    </motion.div>
  );
}