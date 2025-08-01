import { useNavigate } from "react-router-dom";
// import Sidebar from "./Sidebar"; // remove this import
import { useState } from "react";
import { Menu } from "lucide-react"; // optional, if you remove sidebar you might remove this too

export default function DashboardLayout({ children, user }) {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/users/logout", {
        method: "POST",
        credentials: "include",
      });

      if (res.ok) {
        navigate("/login");
      } else {
        console.error("Logout failed");
      }
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 to-purple-50">
      {/* Header */}
      <header className="sticky top-0 z-20 bg-white shadow-md p-4 flex justify-between items-center">
        {/* Remove hamburger menu button */}
        {/* <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="md:hidden text-gray-700"
        >
          <Menu size={28} />
        </button> */}

        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Dashboard</h1>
          <p className="text-sm md:text-base text-gray-600">
            Welcome back, {user?.profile?.fullName || user?.username}
          </p>
        </div>
        <button
          onClick={handleLogout}
          className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors text-sm md:text-base"
        >
          Logout
        </button>
      </header>

      {/* Main content */}
      <main className="flex-1 overflow-y-auto bg-gray-100 p-4 md:p-6">
        {children}
      </main>
    </div>
  );
}
