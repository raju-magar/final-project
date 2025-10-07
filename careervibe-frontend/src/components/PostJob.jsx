import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Jobs from "./Jobs";
import JobListings from "./JobListings";
import DashboardCard from "./DashboardCard";
import { Briefcase, List, Plus, Users } from "lucide-react";

const DashboardTabs = ({ activeTab, setActiveTab, tabs }) => (
  <div className="flex overflow-x-auto bg-white p-1 rounded-xl shadow mb-6 gap-2 no-scrollbar">
    {tabs.map((tab) => {
      const isActive = activeTab === tab.id;
      return (
        <motion.button
          key={tab.id}
          whileTap={{ scale: 0.95 }}
          onClick={() => setActiveTab(tab.id)}
          className={`flex items-center px-4 py-2 whitespace-nowrap rounded-lg font-medium transition-all ${
            isActive
              ? "bg-blue-600 text-white shadow"
              : "text-gray-700 bg-gray-100 hover:bg-gray-200"
          }`}
        >
          {tab.icon}
          <span className="ml-2">{tab.label}</span>
        </motion.button>
      );
    })}
  </div>
);

export default function PostJob({ user }) {
  const [activeTab, setActiveTab] = useState("overview");
  const [jobList, setJobList] = useState([]);

  const tabs = [
    { id: "overview", label: "Overview", icon: <Briefcase size={18} /> },
    { id: "add", label: "Post Job", icon: <Plus size={18} /> },
    { id: "manage", label: "Manage Jobs", icon: <List size={18} /> },
  ];

  const stats = [
    {
      title: "Total Jobs Posted",
      value: jobList.length,
      icon: <Briefcase className="text-blue-600" />,
      onClick: () => setActiveTab("manage"),
    },
    {
      title: "Applicants",
      value: "42", // Example static value
      icon: <Users className="text-green-600" />,
    },
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case "overview":
        return (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {stats.map((stat, idx) => (
              <motion.div key={idx} whileHover={{ scale: 1.02 }} className="cursor-pointer">
                <DashboardCard {...stat} />
              </motion.div>
            ))}
          </div>
        );
      case "add":
        return <JobForm setActiveTab={setActiveTab} />;
      case "manage":
        return <JobListings jobList={jobList} setJobList={setJobList} />;
      default:
        return null;
    }
  };

  return (
    <div className="p-4 sm:p-6 md:p-8">
      <h2 className="text-2xl sm:text-3xl font-semibold mb-4">Welcome, {user.name}</h2>
      <DashboardTabs activeTab={activeTab} setActiveTab={setActiveTab} tabs={tabs} />
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -30 }}
          transition={{ duration: 0.4 }}
        >
          {renderTabContent()}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
