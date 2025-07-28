import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import SkeletonLoader from "./SkeletonLoader";
import JobSeekerDashboard from "./JobSeekerDashboard";
import EmployerDashboard from "./EmployerDashboard";
import DashboardLayout from "./DashboardLayout";
import RoleBasedDashboard from "./RoleBasedDashboard";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Fetch user profile
  const fetchUser = async () => {
    try {
      const res = await fetch(`${API_URL}/api/users/profile`, {
        method: "GET",
        credentials: "include",
      });

      if (res.status === 401) {
        throw new Error("Please log in to continue");
      }

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(`Failed to fetch user: ${res.status} ${res.statusText}`);
      }

      const data = await res.json();
      setUser(data);
    } catch (err) {
      setError(err.message);
      navigate("/login");
    } finally {
      setLoading(false);
    }
  };

  // Check session
  const checkSession = async () => {
    try {
      const res = await fetch(`${API_URL}/api/users/check-session`, {
        method: "GET",
        credentials: "include",
      });

      if (res.status === 401) {
        throw new Error("Session invalid or expired");
      }

      if (!res.ok) {
        throw new Error("Failed to check session");
      }

      await fetchUser();
    } catch (err) {
      setError(err.message);
      setLoading(false);
      navigate("/login");
    }
  };

  useEffect(() => {
    checkSession();
  }, [navigate]);

  // ===== RENDERING HANDLERS =====

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-6">
        <div className="max-w-7xl mx-auto">
          <SkeletonLoader type="dashboard" />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-6 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full text-center">
          <div className="text-red-500 text-5xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Error Loading Dashboard</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-6 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">User Data Not Available</h2>
          <p className="text-gray-600 mb-6">Unable to load your profile information.</p>
          <button 
            onClick={() => navigate("/login")} 
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            Return to Login
          </button>
        </div>
      </div>
    );
  }

  return (
     <DashboardLayout user={user}>
    <RoleBasedDashboard user={user} />
  </DashboardLayout>
  );
}
