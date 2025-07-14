import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/login");
        return;
      }

      try {
        const res = await fetch("http://localhost:5000/api/users/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!res.ok) throw new Error("Failed to fetch user");
        const data = await res.json();
        setUser(data);
      } catch (error) {
        console.error(error);
        navigate("/login");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [navigate]);

  if (loading) {
    return <p>Loading...</p>; // Replace with your loader component
  }

  if (!user) {
    return <p>Error loading user data.</p>;
  }

  // Role-based rendering
  if (user.role === "job-seeker") {
    return <JobSeekerDashboard user={user} />;
  } else if (user.role === "employer") {
    return <EmployerDashboard user={user} />;
  } else {
    return <p>Unknown user role</p>;
  }
}
