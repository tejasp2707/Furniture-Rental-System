// Utility to test backend connection
import API from "../services/api";

export const testBackendConnection = async () => {
  try {
    const response = await API.get("/health");
    return {
      connected: true,
      message: "Backend is connected",
      data: response.data
    };
  } catch (error) {
    return {
      connected: false,
      message: error.response 
        ? `Backend responded with error: ${error.response.status}`
        : "Cannot connect to backend. Make sure it's running on http://localhost:5000",
      error: error.message
    };
  }
};

