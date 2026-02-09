import axios from "axios";

// API Configuration - works out of the box on localhost
const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";
// For images, we need the server base URL (without /api)
const API_SERVER_BASE = import.meta.env.VITE_API_URL 
  ? import.meta.env.VITE_API_URL.replace('/api', '')
  : "http://localhost:5000";

const API = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000, // 10 second timeout
});

// Request interceptor - add auth token
API.interceptors.request.use(
  (req) => {
    const token = localStorage.getItem("token");
    if (token) {
      req.headers.Authorization = `Bearer ${token}`;
    }
    return req;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor - handle errors
API.interceptors.response.use(
  (response) => response,
  (error) => {
    // Only handle 401 if we actually got a response (not network error)
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      // Only redirect if not already on login/register page
      if (!window.location.pathname.includes("/login") && 
          !window.location.pathname.includes("/register")) {
        window.location.href = "/login";
      }
    }
    // For network errors, let the component handle it
    return Promise.reject(error);
  }
);

// Helper function to get full image URL
export const getImageUrl = (imagePath) => {
  if (!imagePath) return "https://via.placeholder.com/400x300?text=Furniture";
  if (imagePath.startsWith("http")) return imagePath;
  return `${API_SERVER_BASE}${imagePath}`;
};

export default API;
