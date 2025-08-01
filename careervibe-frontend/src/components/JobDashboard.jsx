import { useRef } from "react";
import PostJob from "./PostJob";
import JobListings from "./JobListings";

export default function JobDashboard() {
  // Using a ref to hold fetchJobs function from JobListings
  const fetchJobsRef = useRef(null);

  // Function to pass to JobListings, so it can set fetchJobs
  const handleJobListingsReady = (fetchJobs) => {
    fetchJobsRef.current = fetchJobs;
  };

  // Called by PostJob when a new job is posted
  const handleJobPosted = () => {
    if (fetchJobsRef.current) {
      fetchJobsRef.current(); // Trigger fetch jobs refresh
    }
  };

  return (
    <div className="space-y-8">
      <PostJob onJobPosted={handleJobPosted} />
      <JobListings onJobPosted={handleJobListingsReady} />
    </div>
  );
}
