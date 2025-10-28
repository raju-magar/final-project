import { Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useEffect } from "react";

export default function Logout() {
  const navigate = useNavigate();
  const { logoutUser } = useAuth();

  useEffect(() => {
    const logout = async () => {
      try {
        const response = await api.post("/logout", {}, {
          withCredentials: true
        });

        if (response.status === 200) {
          console.log("Logged out successfully");
          logoutUser();
          navigate("/login");
        } else {
          console.error("Logout failed:", response.data);
        }
      } catch (error) {
        console.error("Error during logout:", error);
      }
    };

    logout();
  }, [Navigate, logoutUser]);
  return <p>Logging you out...x</p>

}