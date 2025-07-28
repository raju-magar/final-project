import { useState } from "react";
import { motion } from "framer-motion";
import DashboardCard from "./DashboardCard";
import ProfileView from "./ProfileView";
import { Briefcase, Users, Building, Bell, User } from "lucide-react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

// Tab navigation component (same as in JobSeekerDashboard)
const DashboardTabs = ({ activeTab, setActiveTab, tabs }) => {
  return (
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
};

export default function EmployerDashboard({ user }) {
  const [activeTab, setActiveTab] = useState("overview");
  const navigate = useNavigate();
  
  // Dashboard tabs configuration
  const tabs = [
    { id: "overview", label: "Overview", icon: <Briefcase size={18} /> },
    { id: "jobs", label: "Posted Jobs", icon: <Briefcase size={18} /> },
    { id: "applicants", label: "Applicants", icon: <Users size={18} /> },
    { id: "company", label: "Company Profile", icon: <Building size={18} /> },
    { id: "profile", label: "My Profile", icon: <User size={18} /> },
  ];

  // Stats for the overview cards
  const stats = [
    { 
      title: "Posted Jobs", 
      value: user.jobsPostedCount || 0, 
      icon: <Briefcase className="text-blue-500" />,
      onClick: () => setActiveTab("jobs")
    },
    { 
      title: "New Applicants", 
      value: user.applicantsCount || 0, 
      icon: <Users className="text-purple-500" />,
      onClick: () => setActiveTab("applicants")
    },
    { 
      title: "Profile Views", 
      value: user.companyViewsCount || 0, 
      icon: <Building className="text-green-500" />,
      onClick: () => setActiveTab("company")
    },
    { 
      title: "Notifications", 
      value: user.notificationsCount || 0, 
      icon: <Bell className="text-orange-500" /> 
    },
  ];

  // Render different content based on active tab
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
              <h3 className="text-xl font-semibold mb-4">Recent Activity</h3>
              <div className="bg-white rounded-xl shadow-md p-6">
                {/* Placeholder for recent activity */}
                <p className="text-gray-500">No recent activity to display.</p>
              </div>
            </div>
          </div>
        );
      case "jobs":
        return (
          <div>
        <h2 className="text-2xl font-bold mb-6">Your Posted Jobs</h2>
        <div className="bg-white rounded-xl shadow-md p-6">
          <p className="text-gray-500">You haven't posted any jobs yet.</p>
          <button
            onClick={() => navigate("/dashboard/post-job")}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            Post a New Job
          </button>
        </div>
      </div>
        );
      case "applicants":
        return (
          <div>
            <h2 className="text-2xl font-bold mb-6">Job Applicants</h2>
            <div className="bg-white rounded-xl shadow-md p-6">
              {/* Placeholder for applicants list */}
              <p className="text-gray-500">You have no applicants yet.</p>
            </div>
          </div>
        );
      case "company":
        return (
          <div>
            <h2 className="text-2xl font-bold mb-6">Company Profile</h2>
            <div className="bg-white rounded-xl shadow-md p-6">
              {/* Placeholder for company profile */}
              <p className="text-gray-500">Complete your company profile to attract more candidates.</p>
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