import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import DashboardCard from "./DashboardCard";
import ProfileView from "./ProfileView";
import JobListingCard from "./JobListingCard";
import { Briefcase, Users, Building, Bell, User, Edit, Trash2 } from "lucide-react";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

const DashboardTabs = ({ activeTab, setActiveTab, tabs }) => (
  <div className="flex space-x-1 bg-white p-1 rounded-xl shadow-sm mb-6">
    {tabs.map((tab) => (
      <button
        key={tab.id}
        onClick={() => setActiveTab(tab.id)}
        className={`flex items-center px-4 py-2 rounded-lg transition-all ${
          activeTab === tab.id
            ? "bg-blue-600 text-white shadow-md"
            : "text-gray-600 hover:bg-gray-100"
        }`}
      >
        {tab.icon}
        <span className="ml-2">{tab.label}</span>
      </button>
    ))}
  </div>
);

export default function EmployerDashboard({ user }) {
  const [activeTab, setActiveTab] = useState("overview");
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [editingJob, setEditingJob] = useState(null);
  const [formSubmitting, setFormSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    location: "",
    company: "",
    salary: "",
    jobType: "",
    experienceLevel: "",
    applicationDeadline: "",
    contactEmail: "",
  });

  const token = localStorage.getItem("token");

  // Stats for overview
  const stats = [
    {
      title: "Posted Jobs",
      value: user.jobsPostedCount || jobs.length,
      icon: <Briefcase className="text-blue-500" />,
      onClick: () => setActiveTab("jobs"),
    },
    {
      title: "New Applicants",
      value: user.applicantsCount || 0,
      icon: <Users className="text-purple-500" />,
      onClick: () => setActiveTab("applicants"),
    },
    {
      title: "Profile Views",
      value: user.companyViewsCount || 0,
      icon: <Building className="text-green-500" />,
      onClick: () => setActiveTab("company"),
    },
    {
      title: "Notifications",
      value: user.notificationsCount || 0,
      icon: <Bell className="text-orange-500" />,
    },
  ];

  // Tabs config
  const tabs = [
    { id: "overview", label: "Overview", icon: <Briefcase size={18} /> },
    { id: "jobs", label: "Posted Jobs", icon: <Briefcase size={18} /> },
    { id: "applicants", label: "Applicants", icon: <Users size={18} /> },
    { id: "company", label: "Company Profile", icon: <Building size={18} /> },
    { id: "profile", label: "My Profile", icon: <User size={18} /> },
  ];

  // Fetch posted jobs by current employer
  async function fetchPostedJobs() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${API_URL}/api/jobs?postedBy=${user._id}`, {
        credentials: "include",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!res.ok) throw new Error("Failed to fetch posted jobs");
      const data = await res.json();
      setJobs(data.jobs || []);
    } catch (err) {
      setError(err.message || "Error fetching jobs");
      setJobs([]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (activeTab === "jobs" || activeTab === "overview") {
      fetchPostedJobs();
    }
  }, [activeTab, user._id]);

  // Delete job
  const handleDeleteJob = async (jobId) => {
    if (!window.confirm("Are you sure you want to delete this job?")) return;
    try {
      const res = await fetch(`${API_URL}/api/jobs/${jobId}`, {
        method: "DELETE",
        credentials: "include",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.message || "Failed to delete job");
      }
      setJobs((prev) => prev.filter((job) => job._id !== jobId));
      alert("Job deleted successfully.");
    } catch (err) {
      alert("Error deleting job: " + err.message);
    }
  };

  // Start editing job: populate form
  const startEditingJob = (job) => {
    setEditingJob(job);
    setFormData({
      title: job.title || "",
      description: job.description || "",
      location: job.location || "",
      company: job.company || "",
      salary: job.salary || "",
      jobType: job.jobType || "",
      experienceLevel: job.experienceLevel || "",
      applicationDeadline: job.applicationDeadline
        ? new Date(job.applicationDeadline).toISOString().slice(0, 10)
        : "",
      contactEmail: job.contactEmail || "",
    });
  };

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Submit job form: create or update
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setFormSubmitting(true);
    try {
      const url = editingJob
        ? `${API_URL}/api/jobs/${editingJob._id}`
        : `${API_URL}/api/jobs`;
      const method = editingJob ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        credentials: "include",
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.message || "Failed to save job");
      }

      await res.json();

      fetchPostedJobs();
      setEditingJob(null);
      setFormData({
        title: "",
        description: "",
        location: "",
        company: "",
        salary: "",
        jobType: "",
        experienceLevel: "",
        applicationDeadline: "",
        contactEmail: "",
      });

      alert(editingJob ? "Job updated successfully." : "Job created successfully.");
    } catch (err) {
      alert("Error saving job: " + err.message);
    } finally {
      setFormSubmitting(false);
    }
  };

  // Cancel editing
  const cancelEdit = () => {
    setEditingJob(null);
    setFormData({
      title: "",
      description: "",
      location: "",
      company: "",
      salary: "",
      jobType: "",
      experienceLevel: "",
      applicationDeadline: "",
      contactEmail: "",
    });
  };

  // Render tab content
  const renderTabContent = () => {
    switch (activeTab) {
      case "overview":
        return (
          <div>
            <h2 className="text-2xl font-bold mb-6">Dashboard Overview</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {stats.map((stat, idx) => (
                <DashboardCard
                  key={idx}
                  title={stat.title}
                  value={stat.value}
                  icon={stat.icon}
                  onClick={stat.onClick}
                />
              ))}
            </div>

            <div className="mt-8">
              <h3 className="text-xl font-semibold mb-4">Recent Activity</h3>
              <div className="bg-white rounded-xl shadow-md p-6">
                <p className="text-gray-500">No recent activity to display.</p>
              </div>
            </div>
          </div>
        );

      case "jobs":
        return (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Your Posted Jobs</h2>
              <button
                onClick={() => {
                  setEditingJob(null);
                  setFormData({
                    title: "",
                    description: "",
                    location: "",
                    company: "",
                    salary: "",
                    jobType: "",
                    experienceLevel: "",
                    applicationDeadline: "",
                    contactEmail: "",
                  });
                  setActiveTab("jobs");
                }}
                className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
              >
                Post New Job
              </button>
            </div>

            {/* Job Form */}
            <div className="bg-white rounded-xl shadow-md p-6 mb-6">
              <h3 className="text-xl font-semibold mb-4">{editingJob ? "Edit Job" : "Post New Job"}</h3>
              <form onSubmit={handleFormSubmit} className="space-y-4">
                <div>
                  <label className="block font-medium mb-1">Title *</label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    required
                    className="w-full border border-gray-300 rounded-md px-3 py-2"
                    disabled={formSubmitting}
                  />
                </div>

                <div>
                  <label className="block font-medium mb-1">Description *</label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    rows={3}
                    required
                    className="w-full border border-gray-300 rounded-md px-3 py-2"
                    disabled={formSubmitting}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-medium mb-1">Location *</label>
                    <input
                      type="text"
                      name="location"
                      value={formData.location}
                      onChange={handleInputChange}
                      required
                      className="w-full border border-gray-300 rounded-md px-3 py-2"
                      disabled={formSubmitting}
                    />
                  </div>

                  <div>
                    <label className="block font-medium mb-1">Company *</label>
                    <input
                      type="text"
                      name="company"
                      value={formData.company}
                      onChange={handleInputChange}
                      required
                      className="w-full border border-gray-300 rounded-md px-3 py-2"
                      disabled={formSubmitting}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block font-medium mb-1">Salary</label>
                    <input
                      type="number"
                      name="salary"
                      value={formData.salary}
                      onChange={handleInputChange}
                      className="w-full border border-gray-300 rounded-md px-3 py-2"
                      disabled={formSubmitting}
                    />
                  </div>

                  <div>
                    <label className="block font-medium mb-1">Job Type *</label>
                    <select
                      name="jobType"
                      value={formData.jobType}
                      onChange={handleInputChange}
                      required
                      className="w-full border border-gray-300 rounded-md px-3 py-2"
                      disabled={formSubmitting}
                    >
                      <option value="">Select Job Type</option>
                      <option value="full-time">Full-time</option>
                      <option value="part-time">Part-time</option>
                      <option value="contract">Contract</option>
                      <option value="internship">Internship</option>
                    </select>
                  </div>

                  <div>
                    <label className="block font-medium mb-1">Experience Level *</label>
                    <select
                      name="experienceLevel"
                      value={formData.experienceLevel}
                      onChange={handleInputChange}
                      required
                      className="w-full border border-gray-300 rounded-md px-3 py-2"
                      disabled={formSubmitting}
                    >
                      <option value="">Select Experience Level</option>
                      <option value="entry">Entry Level</option>
                      <option value="mid">Mid Level</option>
                      <option value="senior">Senior Level</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-medium mb-1">Application Deadline</label>
                    <input
                      type="date"
                      name="applicationDeadline"
                      value={formData.applicationDeadline}
                      onChange={handleInputChange}
                      className="w-full border border-gray-300 rounded-md px-3 py-2"
                      disabled={formSubmitting}
                    />
                  </div>

                  <div>
                    <label className="block font-medium mb-1">Contact Email *</label>
                    <input
                      type="email"
                      name="contactEmail"
                      value={formData.contactEmail}
                      onChange={handleInputChange}
                      required
                      className="w-full border border-gray-300 rounded-md px-3 py-2"
                      disabled={formSubmitting}
                    />
                  </div>
                </div>

                <div className="flex space-x-4 mt-4">
                  <button
                    type="submit"
                    className={`px-6 py-2 rounded text-white ${
                      formSubmitting ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
                    } transition-colors`}
                    disabled={formSubmitting}
                  >
                    {editingJob ? "Update Job" : "Create Job"}
                  </button>
                  {editingJob && (
                    <button
                      type="button"
                      onClick={cancelEdit}
                      className="px-6 py-2 bg-gray-400 text-white rounded-md hover:bg-gray-500 transition-colors"
                      disabled={formSubmitting}
                    >
                      Cancel
                    </button>
                  )}
                </div>
              </form>
            </div>

            {/* Job List */}
            {loading ? (
              <p>Loading jobs...</p>
            ) : error ? (
              <p className="text-red-500">{error}</p>
            ) : jobs.length === 0 ? (
              <p className="text-gray-500">You haven't posted any jobs yet.</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {jobs.map((job) => (
                  <div
                    key={job._id}
                    className="bg-white rounded-xl shadow-md p-4 relative"
                  >
                    <JobListingCard job={job} />
                    <div className="absolute top-3 right-3 flex space-x-2">
                      <button
                        onClick={() => startEditingJob(job)}
                        title="Edit Job"
                        className="p-1 rounded-full bg-blue-100 hover:bg-blue-200"
                      >
                        <Edit size={18} className="text-blue-600" />
                      </button>
                      <button
                        onClick={() => handleDeleteJob(job._id)}
                        title="Delete Job"
                        className="p-1 rounded-full bg-red-100 hover:bg-red-200"
                      >
                        <Trash2 size={18} className="text-red-600" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        );

      case "applicants":
        return (
          <div>
            <h2 className="text-2xl font-bold mb-6">Job Applicants</h2>
            <div className="bg-white rounded-xl shadow-md p-6">
              <p className="text-gray-500">You have no applicants yet.</p>
            </div>
          </div>
        );

      case "company":
        return (
          <div>
            <h2 className="text-2xl font-bold mb-6">Company Profile</h2>
            <div className="bg-white rounded-xl shadow-md p-6">
              <p className="text-gray-500">
                Complete your company profile to attract more candidates.
              </p>
              <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
                Edit Company Profile
              </button>
            </div>
          </div>
        );

      case "profile":
        return <ProfileView user={user} />;

      default:
        return null;
    }
  };

  return (
    <div>
      <DashboardTabs activeTab={activeTab} setActiveTab={setActiveTab} tabs={tabs} />
      <motion.div
        key={activeTab}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.3 }}
      >
        {renderTabContent()}
      </motion.div>
    </div>
  );
}
