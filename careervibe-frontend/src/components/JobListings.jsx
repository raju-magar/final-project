import { useState, useEffect } from "react";
import JobListingCard from "./JobListingCard";

export default function JobListings() {
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true); // Loading state
    const [error, setError] = useState(null); // Error state

    const fetchJobs = async () => {
        try {
            const token = localStorage.getItem("token");
            console.log("Token:", token);
            if (!token) {
                console.error("No token found in localStorage.");
                setError("No token found. Please log in."); // Set error message
                setLoading(false);
                return; // Exit if no token is available
            }

            const apiUrl = `${import.meta.env.VITE_API_URL}/jobs`;
            if (!import.meta.env.VITE_API_URL) {
                console.error("API URL is not defined.");
                setError("API URL is not defined. Please contact support.");
                setLoading(false);
                return;
            }
            console.log("Fetching jobs from:", apiUrl);

            const response = await fetch(apiUrl, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (!response.ok) {
                const errorText = await response.text();
                console.error("Error response text:", errorText);
                throw new Error("Network response was not ok");
            }

            const data = await response.json();
            if (!data.jobs) {
                throw new Error("Jobs data is not available in the response.");
            }
            setJobs(data.jobs);
        } catch (error) {
            console.error("Error fetching jobs:", error);
            setError("Failed to fetch jobs. Please try again later."); // Set error message
        } finally {
            setLoading(false); // Set loading to false after fetching
        }
    };

    useEffect(() => {
        let isMounted = true; // Track if the component is mounted
        fetchJobs().then(() => {
            if (isMounted) {
                setLoading(false);
            }
        });
        return () => {
            isMounted = false; // Cleanup function to set the flag to false
        };
    }, []);

    if (loading) {
        return <p>Loading jobs...</p>; // Loading message
    }

    return (
        <div>
            {error && <p className="text-red-600">{error}</p>} {/* Display error message */}
            {jobs.length === 0 ? (
                <p>No jobs available at the moment.</p>
            ) : (
                jobs.map((job) => <JobListingCard key={job._id} job={job} />)
            )}
        </div>
    );
}
