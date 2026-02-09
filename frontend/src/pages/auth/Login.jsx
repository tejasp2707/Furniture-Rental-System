import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../../services/api";
import "./Auth.css";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    if (e.target.name === "email") {
      setEmail(e.target.value);
    } else {
      setPassword(e.target.value);
    }
    setError(""); // Clear error on input change
  };

  const submit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    // Client-side validation
    if (!email || !password) {
      setError("Email and password are required");
      setLoading(false);
      return;
    }

    if (!email.includes("@")) {
      setError("Please enter a valid email address");
      setLoading(false);
      return;
    }

    try {
      const res = await API.post("/auth/login", { email, password });
      if (res.data && res.data.token) {
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("user", JSON.stringify({
          _id: res.data._id,
          name: res.data.name,
          email: res.data.email
        }));
        navigate("/furniture");
      } else {
        setError("Login failed. Invalid response from server.");
      }
    } catch (err) {
      console.error("Login error:", err);
      
      // Handle network errors
      if (!err.response) {
        setError("Network error: Cannot connect to server. Make sure the backend is running on http://localhost:5000");
      } else if (err.response?.data?.message) {
        setError(err.response.data.message);
      } else if (err.message) {
        setError(err.message);
      } else {
        setError("Login failed. Please check your credentials.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-wrapper">
      <form className="auth-card" onSubmit={submit}>
        <h2>Welcome back</h2>

        {error && (
          <div className="error-message" style={{
            background: "#fee2e2",
            color: "#991b1b",
            padding: "12px",
            borderRadius: "4px",
            marginBottom: "16px",
            fontSize: "14px"
          }}>
            {error}
          </div>
        )}

        <input 
          name="email"
          type="email"
          placeholder="Email" 
          value={email}
          onChange={handleChange}
          required
          disabled={loading}
        />
        <input 
          name="password"
          type="password" 
          placeholder="Password" 
          value={password}
          onChange={handleChange}
          required
          disabled={loading}
        />

        <button 
          type="submit" 
          className="btn btn-primary"
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login"}
        </button>
        
        <p>
          Don't have an account? <Link to="/register">Register here</Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
