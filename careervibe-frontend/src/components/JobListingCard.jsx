import PropTypes from 'prop-types';

export default function JobListingCard({ job }) {
  // Shorten description to ~100 chars for preview
  const shortDescription = job.description
    ? job.description.length > 100
      ? job.description.substring(0, 100) + "..."
      : job.description
    : "No description available";

  return (
    <div className="border border-gray-300 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow mb-4">
      <h3 className="text-lg font-semibold mb-1">{job.title}</h3>
      <p className="text-sm text-gray-600 mb-1">{job.company}</p>
      <p className="text-sm text-gray-500 mb-2">
        Location: {job.location || "N/A"} | Type: {job.type || job.jobType || "N/A"}
      </p>
      <p className="text-sm text-gray-500 mb-2">Experience: {job.experienceLevel || "N/A"}</p>
      <p className="text-sm text-gray-700 mb-2">{shortDescription}</p>
      <p className="text-sm text-gray-600 mb-2">
        Salary: {job.salary ? `Rs. ${job.salary}` : "Not specified"}
      </p>
      <p className="text-sm text-gray-500 mb-2">
        Application Deadline:{" "}
        {job.applicationDeadline
          ? new Date(job.applicationDeadline).toLocaleDateString()
          : "No deadline"}
      </p>
      <p className="text-sm text-gray-400 mb-2 italic">
        Posted on: {new Date(job.createdAt).toLocaleDateString()}
      </p>
      {job.contactEmail && (
        <p className="text-sm text-blue-600 underline">
          Contact: <a href={`mailto:${job.contactEmail}`}>{job.contactEmail}</a>
        </p>
      )}
    </div>
  );
}

JobListingCard.propTypes = {
    job: PropTypes.shape({
        title: PropTypes.string.isRequired,
        company: PropTypes.string.isRequired,
        location: PropTypes.string,
        type: PropTypes.string,
        jobType: PropTypes.string,
        experienceLevel: PropTypes.string,
        description: PropTypes.string,
        salary: PropTypes.number,
        applicationDeadline: PropTypes.string,
        contactEmail: PropTypes.string,
        createdAt: PropTypes.string.isRequired,
    }).isRequired,
};
