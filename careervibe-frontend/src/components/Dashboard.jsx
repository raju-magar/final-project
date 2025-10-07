import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import EmployerDashboard from "./EmployerDashboard";
import JobSeekerDashboard from "./JobSeekerDashboard";
import SkeletonLoader from "./SkeletonLoader";

const API_URL = "http://localhost:5000";

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch(`${API_URL}/api/users/check-session`, {
          credentials: "include", // important
        });

        if (!res.ok) throw new Error("Unauthorized");

        const data = await res.json();
        setUser(data.user);
      } catch (err) {
        console.error(err);
        navigate("/login"); // redirect if not logged in
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [navigate]);

  if (loading) return <SkeletonLoader />;
  if (!user) return null;

  return user.role === "employer" ? (
    <EmployerDashboard user={user} />
  ) : (
    <JobSeekerDashboard user={user} />
  );
}
