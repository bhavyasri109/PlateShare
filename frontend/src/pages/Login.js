import React, { useState } from "react";
import "./Auth.css";
import { loginUser, loginAdmin } from "../services/authServices";

export default function Login() {
  const [formData, setFormData] = useState({ email: "", password: "", role: "user" });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let res;
      if (formData.role === "admin") {
        res = await loginAdmin(formData);
      } else {
        res = await loginUser(formData);
      }
      setMessage(`Login successful! Welcome ${res.user?.name || formData.role}`);
    } catch (err) {
      setMessage(err.response?.data?.error || "Login failed");
    }
  };

  return (
    <div className="auth-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <select name="role" value={formData.role} onChange={handleChange}>
          <option value="user">User</option>
          <option value="ngo">NGO</option>
          <option value="delivery">Delivery</option>
          <option value="admin">Admin</option>
        </select>
        <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
        <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required />
        <button type="submit">Login</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}
