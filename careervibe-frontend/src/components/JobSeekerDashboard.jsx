import { useState } from "react";
import { motion } from "framer-motion";
import DashboardCard from "./DashboardCard";
import JobListings from "./JobListings";
import ProfileView from "./ProfileView";
import { Briefcase, BookmarkCheck, FileText, Bell, User } from "lucide-react";
import { useNavigate } from "react-router-dom"; // Import useNavigate

// Tab navigation component
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
        type="button"
      >
        {tab.icon}
        <span className="ml-2">{tab.label}</span>
      </button>
    ))}
  </div>
);

export default function JobSeekerDashboard({ user }) {
  const [activeTab, setActiveTab] = useState("overview");
  const navigate = useNavigate(); // Initialize useNavigate

  const tabs = [
    { id: "overview", label: "Overview", icon: <Briefcase size={18} /> },
    { id: "jobs", label: "Find Jobs", icon: <Briefcase size={18} /> },
    { id: "applications", label: "Applications", icon: <FileText size={18} /> },
    { id: "saved", label: "Saved Jobs", icon: <BookmarkCheck size={18} /> },
    { id: "notifications", label: "Notifications", icon: <Bell size={18} /> },
    { id: "profile", label: "My Profile", icon: <User  size={18} /> },
  ];

  const stats = [
    {
      title: "Applied Jobs",
      value: user.appliedJobsCount || 0,
      icon: <FileText className="text-blue-500" />,
      onClick: () => setActiveTab("applications"),
    },
    {
      title: "Saved Jobs",
      value: user.savedJobsCount || 0,
      icon: <BookmarkCheck className="text-purple-500" />,
      onClick: () => setActiveTab("saved"),
    },
    {
      title: "Profile Views",
      value: user.profileViewsCount || 0,
      icon: <User  className="text-green-500" />,
    },
    {
      title: "Notifications",
      value: user.notificationsCount || 0,
      icon: <Bell className="text-orange-500" />,
      onClick: () => setActiveTab("notifications"),
    },
  ];

  const handleLogout = () => {
    // Remove the token from localStorage
    localStorage.removeItem("token");
    // Redirect to the login page
    navigate("/login");
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case "overview":
        return (
          <div>
            <h2 className="text-2xl font-bold mb-6">Dashboard Overview</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {stats.map((stat, index) => (
                <DashboardCard
                  key={index}
                  title={stat.title}
                  value={stat.value}
                  icon={stat.icon}
                  onClick={stat.onClick}
                />
              ))}
            </div>

            <div className="mt-8">
              <h3 className="text-xl font-semibold mb-4">Recent Job Activity</h3>
              <div className="bg-white rounded-xl shadow-md p-6">
                <p className="text-gray-500">No recent activity to display.</p>
              </div>
            </div>
          </div>
        );

      case "jobs":
        return (
          <div>
            <h2 className="text-2xl font-bold mb-6">Find Jobs</h2>
            <JobListings />
          </div>
        );

      case "applications":
        return (
          <div>
            <h2 className="text-2xl font-bold mb-6">Your Applications</h2>
            <div className="bg-white rounded-xl shadow-md p-6">
              <p className="text-gray-500">You haven't applied to any jobs yet.</p>
            </div>
          </div>
        );

      case "saved":
        return (
          <div>
            <h2 className="text-2xl font-bold mb-6">Saved Jobs</h2>
            <div className="bg-white rounded-xl shadow-md p-6">
              <p className="text-gray-500">You haven't saved any jobs yet.</p>
            </div>
          </div>
        );

      case "notifications":
        return (
          <div>
            <h2 className="text-2xl font-bold mb-6">Notifications</h2>
            <div className="bg-white rounded-xl shadow-md p-6">
              <p className="text-gray-500">You have no new notifications.</p>
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
      {/* Add the Logout button here */}
      <button 
        onClick={handleLogout} 
        className="mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
      >
        Logout
      </button>
    </div>
  );
}
