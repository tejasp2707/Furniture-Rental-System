import { useState } from "react";
import API from "../../services/api";
import "./Auth.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    const res = await API.post("/auth/login", { email, password });
    localStorage.setItem("token", res.data.token);
    window.location.href = "/";
  };

  return (
    <div className="auth-wrapper">
      <form className="auth-card" onSubmit={submit}>
        <h2>Welcome back</h2>

        <input placeholder="Email" onChange={e => setEmail(e.target.value)} />
        <input type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} />

        <button className="btn btn-primary">Login</button>
        
        <p>
          Don't have an account? <a href="/register">Register here</a>
        </p>
      </form>
    </div>
  );
};

export default Login;
