import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api",
  withCredentials: true,
});

// ✅ Interceptor to handle errors silently
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Hide 401 logs completely — this is expected behavior when not logged in
    if (error.response && error.response.status === 401) {
      // Optional: you can return a resolved empty response if you want
      return Promise.reject({ handled: true });
    }

    // Log only unexpected errors
    console.error("⚠️ API Error:", error.message);
    return Promise.reject(error);
  }
);

export default api;
