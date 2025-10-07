import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Logout() {
  const navigate = useNavigate();

  useEffect(()=>{
    const logout = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/logout", {
          method: "POST",
          credentials: "include"
          });

          if (!response.ok) {
            const errorText = await response.text();
            console.error("Logout error:", errorText);
          } else {
            console.log("Logged out successfully");
            navigate("/login");
          }
        
      } catch (error) {
        console.error("Error during logout:", error);
      }
    };
    logout();
  }, [navigate]);

  return <p>Logging you out...</p>;
}