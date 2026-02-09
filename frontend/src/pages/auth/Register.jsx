import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../../services/api";
import "./Auth.css";

const Register = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: ""
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError(""); // Clear error on input change
  };

  const submit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    // Client-side validation
    if (!form.name || !form.email || !form.password) {
      setError("All fields are required");
      setLoading(false);
      return;
    }

    if (form.password.length < 6) {
      setError("Password must be at least 6 characters");
      setLoading(false);
      return;
    }

    if (!form.email.includes("@")) {
      setError("Please enter a valid email address");
      setLoading(false);
      return;
    }

    try {
      const res = await API.post("/auth/register", form);
      if (res.data && res.data.token) {
        // Auto-login after registration
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("user", JSON.stringify({
          _id: res.data._id,
          name: res.data.name,
          email: res.data.email
        }));
        navigate("/furniture");
      } else {
        setError("Registration failed. Please try again.");
      }
    } catch (err) {
      console.error("Registration error:", err);
      
      // Handle network errors
      if (!err.response) {
        setError("Network error: Cannot connect to server. Make sure the backend is running on http://localhost:5000");
      } else if (err.response?.data?.message) {
        setError(err.response.data.message);
      } else if (err.message) {
        setError(err.message);
      } else {
        setError("Registration failed. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-wrapper">
      <form className="auth-card" onSubmit={submit}>
        <h2>Create account</h2>

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
          name="name"
          type="text"
          placeholder="Name" 
          value={form.name}
          onChange={handleChange}
          required
          disabled={loading}
        />
        <input 
          name="email"
          type="email"
          placeholder="Email" 
          value={form.email}
          onChange={handleChange}
          required
          disabled={loading}
        />
        <input 
          name="password"
          type="password" 
          placeholder="Password (min 6 characters)" 
          value={form.password}
          onChange={handleChange}
          required
          minLength={6}
          disabled={loading}
        />

        <button 
          type="submit" 
          className="btn btn-primary"
          disabled={loading}
        >
          {loading ? "Registering..." : "Register"}
        </button>
        
        <p>
          Already have an account? <Link to="/login">Login here</Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
