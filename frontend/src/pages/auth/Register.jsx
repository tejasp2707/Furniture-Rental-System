import { useState } from "react";
import API from "../../services/api";
import "./Auth.css";

const Register = () => {
  const [form, setForm] = useState({});

  const submit = async (e) => {
    e.preventDefault();
    await API.post("/auth/register", form);
    window.location.href = "/login";
  };

  return (
    <div className="auth-wrapper">
      <form className="auth-card" onSubmit={submit}>
        <h2>Create account</h2>

        <input placeholder="Name" onChange={e => setForm({ ...form, name: e.target.value })} />
        <input placeholder="Email" onChange={e => setForm({ ...form, email: e.target.value })} />
        <input type="password" placeholder="Password" onChange={e => setForm({ ...form, password: e.target.value })} />

        <button className="btn btn-primary">Register</button>
        
        <p>
          Already have an account? <a href="/login">Login here</a>
        </p>
      </form>
    </div>
  );
};

export default Register;
