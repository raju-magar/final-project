import { createContext, useContext, useEffect, useState } from "react";
import api from "../api/axios.js";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true; // Prevent updates after unmount

    const checkSession = async () => {
      try {
        const res = await api.get("/users/check-session", { withCredentials: true, });
        if (isMounted) {
          if (res.data.isAuthenticated) {
            setUser(res.data.user);
          } else {
            setUser(null);
          }
        }
      } catch (err) {
        if (err.response && err.response.status === 401) {
          // Normal: user not logged in
          if (isMounted) setUser(null);
        } else {
          console.error("⚠️ Unexpected error checking session:", err);
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    checkSession();

    return () => {
      isMounted = false; // cleanup
    };
  }, []);

  // ✅ Login function
  const login = (userData) => {
    setUser(userData || null);
  };

  // ✅ Logout function
  const logout = async () => {
    try {
      await api.post("/users/logout", {}, { withCredentials: true });
      setUser(null);
    } catch (error) {
      console.error("Logout failed:", error.message);
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

// ✅ Custom hook
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
};
