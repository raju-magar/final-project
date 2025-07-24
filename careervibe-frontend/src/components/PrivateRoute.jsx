import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

export default function PrivateRoute({ children }) {
  const [authenticated, setAuthenticated] = useState(null); // null = loading

  useEffect(() => {
    const checkSession = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/users/check-session", {
          method: "GET",
          credentials: "include", // Include session cookie
        });

        if (res.status === 200) {
          setAuthenticated(true);
        } else {
          setAuthenticated(false);
        }
      } catch (err) {
        console.error("Session check failed:", err);
        setAuthenticated(false);
      }
    };

    checkSession();
  }, []);

  if (authenticated === null) {
    return <div>Loading...</div>; // or a spinner
  }

  return authenticated ? children : <Navigate to="/login" />;
}
