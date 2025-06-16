import { useState } from 'react';

     function Jobs() {
       const [searchTerm, setSearchTerm] = useState('');
       const [filterLocation, setFilterLocation] = useState('');
       const [filterType, setFilterType] = useState('');
       const [isLoading, setIsLoading] = useState(false);

       const jobs = [
         { id: 1, title: 'Frontend Developer', company: 'Tech Corp', location: 'Kathmandu, Nepal', type: 'Full-Time' },
         { id: 2, title: 'Backend Developer', company: 'Innovate Ltd', location: 'Pokhara, Nepal', type: 'Part-Time' },
         { id: 3, title: 'UI/UX Designer', company: 'DesignHub', location: 'Biratnagar, Nepal', type: 'Contract' },
       ];

       const handleFilterChange = (e) => {
        setIsLoading(true);
        setTimeout(() => {
          setIsLoading(false);
        }, 500); //Simulate delay for loading effect
        if (e.target.name === 'search') setSearchTerm(e.target.value);
        else if (e.target.name === 'location') setFilterLocation(e.target.value);
        else if (e.target.name === 'type') setFilterType(e.target.value);
       };

       const filteredJobs = jobs.filter(
         (job) =>
           job.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
           (filterLocation === '' || job.location.toLowerCase().includes(filterLocation.toLowerCase())) &&
           (filterType === '' || job.type === filterType)
       );

       return (
         <div className="min-h-screen bg-gray-100 py-10">
           <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
             <h2 className="text-3xl font-bold text-gray-800 mb-6 animate__animated animate__fadeIn">
               Job Listings
             </h2>
             <div className="flex flex-col sm:flex-row gap-4 mb-6">
               <input type="text" name="search" placeholder="Search jobs..."
                 className="border border-gray-300 rounded-md p-2 flex-1 focus:outline-none focus:ring-2
                  focus:ring-[rgb-accent] focus:shadow-lg focus:-translate-y-1 transition-all duration-200 animate__animated animate__fadeInLeft"
                 value={searchTerm}
                 onChange={handleFilterChange} />
               <select name="location" className="border border-gray-300 rounded-md p-2 
               focus:outline-none focus:ring-2 focus:ring-[rgb-accent] animate__animated 
               animate__fadeInRight"
                 value={filterLocation}
                 onChange={handleFilterChange}>
                 <option value="">All Locations</option>
                 <option value="Kathmandu">Kathmandu</option>
                 <option value="Pokhara">Pokhara</option>
                 <option value="Biratnagar">Biratnagar</option>
               </select>
               <select
                 className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-[rgb-accent] animate__animated animate__fadeInRight animate__delay-1s"
                 value={filterType}
                 onChange={(e) => setFilterType(e.target.value)}
               >
                 <option value="">All Job Types</option>
                 <option value="Full-Time">Full-Time</option>
                 <option value="Part-Time">Part-Time</option>
                 <option value="Contract">Contract</option>
               </select>
             </div>
             {isLoading && (
              <div className="flex justify-center mb-6">
                <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-[rgb-primary]"></div>
              </div>
             )}
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
               {filteredJobs.length > 0 ? (
                 filteredJobs.map((job) => (
                   <div key={job.id} className="job-card">
                     <h3 className="text-xl font-semibold text-gray-800">{job.title}</h3>
                     <p className="text-gray-600 mt-2">{job.company}</p>
                     <p className="text-gray-500 mt-1">{job.location}</p>
                     <p className="text-gray-500 mt-1">{job.type}</p>
                     <button className="mt-4 bg-[rgb-primary] text-white px-4 py-2 rounded-md
                      hover:bg-green-600 transition duration-300">
                       Apply Now
                     </button>
                   </div>
                 ))
               ) : (
                 <p className="text-gray-500">No jobs found.</p>
               )}
             </div>
           </div>
         </div>
       );
     }

     export default Jobs;