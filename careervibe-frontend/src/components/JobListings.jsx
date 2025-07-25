import { useState } from "react";
import JobListingCard from "./JobListingCard";
import { Search, Filter } from "lucide-react";

// Sample job data for testing
const sampleJobs = [
  {
    id: 1,
    title: "Frontend Developer",
    company: "TechCorp Inc.",
    location: "Kathmandu, Nepal",
    salary: "$40,000 - $60,000",
    postedDate: "2 days ago",
    tags: ["React", "JavaScript", "Tailwind CSS"],
  },
  {
    id: 2,
    title: "Backend Engineer",
    company: "DataSystems Ltd.",
    location: "Remote",
    salary: "$50,000 - $70,000",
    postedDate: "1 week ago",
    tags: ["Node.js", "Express", "MongoDB"],
  },
  {
    id: 3,
    title: "Full Stack Developer",
    company: "InnovateTech",
    location: "Kathmandu, Nepal",
    salary: "$60,000 - $80,000",
    postedDate: "3 days ago",
    tags: ["React", "Node.js", "PostgreSQL"],
  },
];

export default function JobListings() {
  const [jobs, setJobs] = useState(sampleJobs);
  const [searchTerm, setSearchTerm] = useState("");
  const [showFilters, setShowFilters] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault();
    // In a real app, this would call an API with the search term
    console.log("Searching for:", searchTerm);
    
    // For now, just filter the sample data
    if (!searchTerm.trim()) {
      setJobs(sampleJobs);
      return;
    }
    
    const filtered = sampleJobs.filter(job => 
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    );
    
    setJobs(filtered);
  };

  const handleApply = (jobId) => {
    console.log("Applying for job:", jobId);
    // In a real app, this would open an application form or redirect to an application page
    alert(`Applied for job #${jobId}`);
  };

  const handleSave = (jobId) => {
    console.log("Saving job:", jobId);
    // In a real app, this would save the job to the user's saved jobs
    alert(`Job #${jobId} saved`);
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-md p-4">
        <form onSubmit={handleSearch} className="flex gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search jobs, companies, or keywords..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button
            type="button"
            onClick={() => setShowFilters(!showFilters)}
            className="px-4 py-2 border border-gray-300 rounded-md flex items-center gap-2 hover:bg-gray-50"
          >
            <Filter size={18} />
            <span>Filters</span>
          </button>
          <button
            type="submit"
            className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Search
          </button>
        </form>

        {showFilters && (
          <div className="mt-4 pt-4 border-t border-gray-200 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
              <select className="w-full p-2 border border-gray-300 rounded-md">
                <option value="">All Locations</option>
                <option value="kathmandu">Kathmandu</option>
                <option value="remote">Remote</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Job Type</label>
              <select className="w-full p-2 border border-gray-300 rounded-md">
                <option value="">All Types</option>
                <option value="full-time">Full-time</option>
                <option value="part-time">Part-time</option>
                <option value="contract">Contract</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Experience Level</label>
              <select className="w-full p-2 border border-gray-300 rounded-md">
                <option value="">All Levels</option>
                <option value="entry">Entry Level</option>
                <option value="mid">Mid Level</option>
                <option value="senior">Senior Level</option>
              </select>
            </div>
          </div>
        )}
      </div>

      {jobs.length === 0 ? (
        <div className="bg-white rounded-xl shadow-md p-8 text-center">
          <h3 className="text-xl font-semibold text-gray-800 mb-2">No jobs found</h3>
          <p className="text-gray-600">Try adjusting your search criteria</p>
        </div>
      ) : (
        <div className="space-y-4">
          {jobs.map((job) => (
            <JobListingCard 
              key={job.id} 
              job={job} 
              onApply={handleApply} 
              onSave={handleSave} 
            />
          ))}
        </div>
      )}
    </div>
  );
}