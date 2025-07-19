import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const checkSession = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/users/check-session", {
          method: "GET",
          credentials: "include",
        });
        console.log("Session check status:", res.status, res.statusText);
        if (res.status === 401) {
          console.error("Session check: Unauthorized");
          setError("Session invalid or expired");
          navigate("/login");
          return;
        }
        if (!res.ok) throw new Error("Failed to check session");
        fetchUser();
      } catch (error) {
        console.error("Session check error:", error.message);
        setError(error.message);
        navigate("/login");
      }
    };

    const fetchUser = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/users/profile", {
          method: "GET",
          credentials: "include",
        });
        console.log("Profile request headers:", {
          cookie: res.headers.get('cookie') || 'No cookie sent'
        });
        console.log("Response status:", res.status, res.statusText);
        if (res.status === 401) {
          console.error("Unauthorized: Invalid or missing session");
          setError("Please log in to continue");
          return;
        }
        if (!res.ok) {
          const errorData = await res.json().catch(() => ({}));
          console.log("Error response:", errorData);
          throw new Error(`Failed to fetch user: ${res.status} ${res.statusText}`);
        }
        const data = await res.json();
        console.log("User data:", data);
        setUser(data);
      } catch (error) {
        console.error("Fetch error:", error.message);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    checkSession();
  }, [navigate]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  if (!user) {
    return <p>Error loading user data.</p>;
  }

  if (user.role === "job-seeker") {
    return <JobSeekerDashboard user={user} />;
  } else if (user.role === "employer") {
    return <EmployerDashboard user={user} />;
  } else {
    return <p>Unknown user role</p>;
  }
}