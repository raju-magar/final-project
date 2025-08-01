import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Logout() {
  const navigate = useNavigate();

  useEffect(() => {
    const logout = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/users/logout", {
          method: "POST",
          credentials: "include",
        });

        if (!response.ok) {
          const errorText = await response.text();
          console.error("Logout error:", errorText);
          // Optionally, you can set an error state here to inform the user
        } else {
          // Remove the token from localStorage
          localStorage.removeItem("token");
          navigate("/login"); // Redirect to login page
        }
      } catch (error) {
        console.error("Error during logout:", error);
        // Optionally, you can set an error state here to inform the user
      }
    };

    logout();
  }, [navigate]);

  return <p>Logging you out...</p>;
}
